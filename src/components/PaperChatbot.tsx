import React, { useState, useRef, useEffect } from 'react';
import type { ResearchPaper, ResearchItem } from '../types';
import { icons } from '../icons';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  papers?: ResearchPaper[];
  suggestions?: string[];
  timestamp: string;
}

interface PaperChatbotProps {
  papers: ResearchPaper[];
  researchItems?: ResearchItem[];
}

export const PaperChatbot: React.FC<PaperChatbotProps> = ({ papers, researchItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      {
        id: 'welcome-msg',
        sender: 'bot',
        text: `👋 Hi! I am **NeuralPulse AI Assistant**. I have instant access to all **${papers.length.toLocaleString()}+ uploaded research papers** and articles on this platform. \n\nHow can I help you today? Ask me about any topic, paper title, author, or research breakthrough!`,
        suggestions: [
          'What are the key papers on Transformers?',
          'Tell me about BERT & Language Models',
          'Show papers on Diffusion Models (DDPM)',
          'Find papers co-authored by Vaswani',
          'What is ResNet architecture?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `clear-${Date.now()}`,
        sender: 'bot',
        text: `Chat cleared! I'm ready to answer any questions about our database of **${papers.length.toLocaleString()}+ research papers**.`,
        suggestions: [
          'Top RLHF & Alignment papers',
          'Generative Adversarial Networks (GANs)',
          'Vision Transformer (ViT) papers',
          'Most cited papers in 2024'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const searchKnowledgeBase = (query: string): { responseText: string; matchedPapers: ResearchPaper[]; suggestions: string[] } => {
    const qLower = query.toLowerCase().trim();
    const words = qLower.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 1);

    if (words.length === 0) {
      return {
        responseText: "Please enter a specific question, paper title, topic, or author name.",
        matchedPapers: [],
        suggestions: ['Transformers', 'BERT', 'Diffusion Models', 'ResNet']
      };
    }

    // Include research items insights count
    const matchingResearchItems = researchItems.filter(item => {
      const itemTitle = item.title.toLowerCase();
      const itemExcerpt = item.excerpt.toLowerCase();
      return words.some(w => itemTitle.includes(w) || itemExcerpt.includes(w));
    });

    // Scoring papers
    const scored = papers.map(paper => {
      let score = 0;
      const titleLower = paper.title.toLowerCase();
      const authorsLower = paper.authors.toLowerCase();
      const abstractLower = paper.abstract.toLowerCase();
      const venueLower = paper.venue.toLowerCase();
      const yearStr = paper.year.toString();

      // Exact title match bonus
      if (titleLower.includes(qLower)) score += 50;

      // Check each term match
      words.forEach(word => {
        if (titleLower.includes(word)) score += 15;
        if (authorsLower.includes(word)) score += 12;
        if (venueLower.includes(word)) score += 8;
        if (yearStr === word) score += 10;
        if (abstractLower.includes(word)) score += 4;
      });

      // Special domain keyword boosts
      if ((qLower.includes('attention') || qLower.includes('transformer')) && (titleLower.includes('attention') || titleLower.includes('transformer'))) {
        score += 30;
      }
      if (qLower.includes('bert') && titleLower.includes('bert')) score += 30;
      if (qLower.includes('gan') && (titleLower.includes('gan') || titleLower.includes('generative adversarial'))) score += 30;
      if ((qLower.includes('diffusion') || qLower.includes('ddpm')) && (titleLower.includes('diffusion') || abstractLower.includes('diffusion'))) score += 30;
      if ((qLower.includes('resnet') || qLower.includes('residual')) && (titleLower.includes('resnet') || titleLower.includes('residual'))) score += 30;
      if (qLower.includes('rlhf') && (abstractLower.includes('human feedback') || abstractLower.includes('rlhf') || titleLower.includes('rlhf'))) score += 30;
      if (qLower.includes('lora') && (titleLower.includes('lora') || abstractLower.includes('low-rank'))) score += 30;
      if ((qLower.includes('vision') || qLower.includes('vit')) && (titleLower.includes('vision') || titleLower.includes('vit'))) score += 20;

      return { paper, score };
    });

    const matches = scored
      .filter(item => item.score > 5)
      .sort((a, b) => b.score - a.score)
      .map(item => item.paper);

    const topPapers = matches.slice(0, 4);

    let responseText = '';
    let suggestions: string[] = [];

    const itemNotes = matchingResearchItems.length > 0 ? ` (and cross-referenced ${matchingResearchItems.length} research articles)` : '';

    if (topPapers.length > 0) {
      const totalCount = matches.length;
      if (qLower.includes('transformer') || qLower.includes('attention')) {
        responseText = `Here are key papers on **Transformers & Attention Mechanisms** found in our database (total matches: ${totalCount})${itemNotes}:`;
        suggestions = ['Tell me about BERT', 'Explain Attention Is All You Need', 'Vision Transformers'];
      } else if (qLower.includes('diffusion') || qLower.includes('ddpm')) {
        responseText = `Here are seminal research papers on **Diffusion Models & Generative AI** (found ${totalCount} matches)${itemNotes}:`;
        suggestions = ['DDPM paper details', 'GANs vs Diffusion', 'Text-to-Image models'];
      } else if (qLower.includes('author') || qLower.includes('vaswani') || qLower.includes('goodfellow') || qLower.includes('he')) {
        responseText = `I found **${totalCount} papers** matching your author query${itemNotes}. Here are top results:`;
        suggestions = ['Show abstract', 'Filter by year', 'Other top citations'];
      } else if (qLower.includes('bert') || qLower.includes('llm') || qLower.includes('language model')) {
        responseText = `Here are prominent **Language Modeling & LLM** research papers (found ${totalCount} matches)${itemNotes}:`;
        suggestions = ['What is BERT architecture?', 'Fine-tuning & LoRA', 'Attention Is All You Need'];
      } else {
        responseText = `I found **${totalCount} relevant research paper${totalCount > 1 ? 's' : ''}** matching **"${query}"**${itemNotes}. Here are the most cited & closely related papers:`;
        suggestions = ['Summarize top result', 'Show citations', 'Explore more topics'];
      }
    } else {
      // Fallback response with top seminal papers
      topPapers.push(...papers.slice(0, 3));
      responseText = `I couldn't find an exact match for **"${query}"** in paper titles, but here are some of our most influential seminal AI research papers you might find helpful:`;
      suggestions = ['Attention Is All You Need', 'BERT', 'ResNet', 'GANs', 'Diffusion Models'];
    }

    return { responseText, matchedPapers: topPapers, suggestions };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate slight natural network latency
    setTimeout(() => {
      const { responseText, matchedPapers, suggestions } = searchKnowledgeBase(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        papers: matchedPapers,
        suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDownloadPaper = (e: React.MouseEvent, paper: ResearchPaper) => {
    e.preventDefault();
    const link = paper.pdfUrl || paper.arxivUrl;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="paper-chatbot-container">
      {/* Floating Trigger Button at Downside Right Corner */}
      {!isOpen && (
        <button
          className={`chatbot-trigger-btn ${hasUnread ? 'pulse' : ''}`}
          onClick={toggleChat}
          aria-label="Open AI Paper Chatbot Assistant"
          title="Chat with AI Paper Assistant"
        >
          <div className="chatbot-trigger-icon" dangerouslySetInnerHTML={{ __html: icons.maleBot }} />
          <span className="chatbot-trigger-badge">{papers.length.toLocaleString()}+ papers</span>
          {hasUnread && <span className="unread-dot"></span>}
        </button>
      )}

      {/* Floating Chat Drawer Window - Phone Frame */}
      {isOpen && (
        <div className="chatbot-window phone-frame">
          {/* Phone Screen Notch */}
          <div className="phone-notch">
            <span className="notch-speaker"></span>
            <span className="notch-camera"></span>
          </div>

          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <span dangerouslySetInnerHTML={{ __html: icons.maleBot }} />
                <span className="status-indicator"></span>
              </div>
              <div>
                <h3 className="chatbot-title">Paper AI Assistant</h3>
                <p className="chatbot-subtitle">online • {papers.length.toLocaleString()}+ papers indexed</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                className="chatbot-action-btn"
                onClick={handleClearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                🗑️
              </button>
              <button
                className="chatbot-action-btn chatbot-close-btn"
                onClick={toggleChat}
                title="Close chat"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="chatbot-msg-avatar" dangerouslySetInnerHTML={{ __html: icons.maleBot }} />
                )}
                <div className="chatbot-msg-content">
                  <div className="chatbot-bubble">
                    <p className="chatbot-text">{msg.text}</p>
                    <span className="chatbot-timestamp">{msg.timestamp}</span>
                  </div>

                  {/* Render Matched Research Paper Cards */}
                  {msg.papers && msg.papers.length > 0 && (
                    <div className="chatbot-papers-list">
                      {msg.papers.map((paper) => (
                        <div key={paper.id} className="chatbot-paper-card">
                          <div className="chatbot-paper-meta">
                            <span className="chatbot-paper-year">{paper.year}</span>
                            <span className="chatbot-paper-venue">{paper.venue}</span>
                            <span className="chatbot-paper-citations">★ {paper.citations}</span>
                          </div>
                          <h4 className="chatbot-paper-title">{paper.title}</h4>
                          <p className="chatbot-paper-authors">{paper.authors}</p>
                          <p className="chatbot-paper-abstract">{paper.abstract}</p>
                          <div className="chatbot-paper-actions">
                            {paper.pdfUrl && (
                              <a
                                href={paper.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chatbot-btn-link pdf"
                                onClick={(e) => handleDownloadPaper(e, paper)}
                              >
                                📄 PDF
                              </a>
                            )}
                            {paper.arxivUrl && (
                              <a
                                href={paper.arxivUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chatbot-btn-link arxiv"
                              >
                                🔗 arXiv
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Action Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="chatbot-suggestions">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="chatbot-chip"
                          onClick={() => handleSendMessage(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chatbot-msg-row bot">
                <div className="chatbot-msg-avatar" dangerouslySetInnerHTML={{ __html: icons.maleBot }} />
                <div className="chatbot-bubble typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <div className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Ask about papers, authors, topics..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim()}
              aria-label="Send query"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>

          {/* Phone Home Bar */}
          <div className="phone-home-bar">
            <span className="home-indicator"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperChatbot;
