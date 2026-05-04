import axios from 'axios';
import type { Project, ChatMessage, JDAnalysisResult, GitHubStats } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(stack?: string): Promise<Project[]> {
  const params = stack && stack !== 'all' ? { stack } : {};
  const { data } = await api.get('/projects', { params });
  return data.data;
}

export async function getProject(slug: string): Promise<Project> {
  const { data } = await api.get(`/projects/${slug}`);
  return data.data;
}

// ── Chat ──────────────────────────────────────────────────────────────────────

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const { data } = await api.post('/chat', { messages });
  return data.reply;
}

// Streaming version — calls callback with each text chunk
export async function sendChatStream(
  messages: ChatMessage[],
  onChunk: (text: string) => void,
  onDone: () => void
): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.body) throw new Error('No stream body');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value).split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const raw = line.slice(6);
        if (raw === '[DONE]') { onDone(); return; }
        try {
          const parsed = JSON.parse(raw);
          if (parsed.text) onChunk(parsed.text);
        } catch {}
      }
    }
  }
  onDone();
}

// ── Analyze ───────────────────────────────────────────────────────────────────

export async function analyzeJD(jobDescription: string): Promise<JDAnalysisResult> {
  const { data } = await api.post('/analyze/jd', { jobDescription });
  return data.data;
}

export async function explainProject(
  projectName: string,
  projectDesc: string,
  projectArch: string,
  mode: 'simple' | 'technical'
): Promise<string> {
  const { data } = await api.post('/analyze/project', {
    projectName, projectDesc, projectArch, mode,
  });
  return data.explanation;
}

// ── GitHub ────────────────────────────────────────────────────────────────────

export async function getGitHubStats(): Promise<GitHubStats> {
  const { data } = await api.get('/github/stats');
  return data.data;
}

export async function getGitHubProjects() {
  const { data } = await api.get('/github/repos');
  return data.data;
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export function trackEvent(event: string, projectId?: string, meta?: Record<string, unknown>) {
  // Fire-and-forget — don't await
  api.post('/analytics/track', { event, projectId, meta }).catch(() => {});
}
