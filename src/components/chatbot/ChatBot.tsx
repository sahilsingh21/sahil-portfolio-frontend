'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '@/lib/api';
import type { ChatMessage } from '@/types';

const QUICK_PROMPTS = [
  'Tell me about Sahil',
  'Best projects?',
  'Why should we hire him?',
  'System design experience?',
  'His strengths?',
];

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const isReturning = typeof window !== 'undefined' && localStorage.getItem('sahil_returning') === 'true';
      setMessages([{
        role: 'assistant',
        content: isReturning
          ? '👋 Welcome back! Ask me anything about Sahil\'s experience, projects, or why he\'d be a great fit for your team.'
          : '👋 Hi! I\'m Sahil\'s AI assistant. Ask me anything about his background, projects, or skills — or try a quick prompt below!',
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  async function sendMessage(text?: string) {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', content: msg };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setLoading(true);

    try {
      const reply = await sendChatMessage(updatedHistory);
      setMessages([...updatedHistory, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...updatedHistory, { role: 'assistant', content: "I'm having trouble connecting. Please try again shortly!" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200 }}
            onClick={onClose}
          />

          {/* Chat box */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            style={{
              position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 201,
              width: 400, maxWidth: 'calc(100vw - 2rem)', height: 580,
              background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 16,
              display: 'flex', flexDirection: 'column', boxShadow: '0 32px 100px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--border)', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '0.85rem' }}>AI</div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Sahil's Portfolio AI</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>✕</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    maxWidth: '85%', padding: '0.75rem 1rem', borderRadius: 12, fontSize: '0.83rem', lineHeight: 1.6,
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    background: m.role === 'user' ? 'var(--accent)' : 'var(--bg3)',
                    color: m.role === 'user' ? '#fff' : 'var(--text)',
                    border: m.role === 'ai' ? '1px solid var(--border)' : 'none',
                    borderBottomRightRadius: m.role === 'user' ? 4 : 12,
                    borderBottomLeftRadius: m.role === 'assistant' ? 4 : 12,
                  }}
                >
                  {m.content}
                </motion.div>
              ))}

              {loading && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, borderBottomLeftRadius: 4, padding: '0.75rem 1rem', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text3)', display: 'inline-block', animation: `typeDot 1.2s ${delay}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            <div style={{ padding: '0 1rem 0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  style={{
                    background: 'var(--bg4)', border: '1px solid var(--border)', color: 'var(--text2)',
                    padding: '0.3rem 0.75rem', borderRadius: '100px', fontSize: '0.72rem', cursor: 'pointer',
                    fontFamily: 'inherit', fontWeight: 500, transition: 'all 0.2s', whiteSpace: 'nowrap',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ borderTop: '1px solid var(--border)', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything..."
                style={{
                  flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8,
                  padding: '0.6rem 0.9rem', color: 'var(--text)', fontFamily: 'inherit', fontSize: '0.83rem',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                style={{
                  background: 'var(--accent)', border: 'none', color: '#fff', padding: '0.6rem 1rem',
                  borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', fontSize: '0.85rem',
                  transition: 'all 0.2s', opacity: loading ? 0.6 : 1,
                }}
              >
                →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
