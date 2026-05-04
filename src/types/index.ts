export interface Project {
  _id: string;
  name: string;
  slug: string;
  desc: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  techStack: string[];
  impact: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  order: number;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface JDAnalysisResult {
  score: number;
  matched_skills: string[];
  missing_skills: string[];
  strengths: string[];
  suggestion: string;
}

export interface GitHubStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
  languages: { lang: string; count: number }[];
  pinnedRepos: {
    name: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: string;
    updatedAt: string;
  }[];
}

export type DemoStep = {
  section: string;
  label: string;
};
