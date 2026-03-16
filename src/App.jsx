import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, ArrowRight } from 'lucide-react';
import { docSections } from './data';
import './index.css';

const CodeWrapper = ({ node, inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="code-wrapper">
        <div className="code-header">
          <span>{lang}</span>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={lang}
          PreTag="div"
          customStyle={{
            margin: 0,
            background: 'transparent',
            padding: '16px',
            fontSize: '0.9rem'
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className={className} style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#111827', fontWeight: '500' }} {...props}>
      {children}
    </code>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState(docSections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = docSections.map((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          return { id: section.id, offsetTop: element.getBoundingClientRect().top };
        }
        return null;
      }).filter(Boolean);

      const current = offsets.find((o) => o.offsetTop >= 0 && o.offsetTop < 300);
      
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <nav className="top-navbar">
        <div className="logo-section">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', marginLeft: '4px' }}>UI Bakery</span>
        </div>
        <div className="nav-links">
          <a href="#">Product</a>
          <a href="#">Solutions</a>
          <a href="#">Resources</a>
          <a href="#">Clients</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </div>
        <div className="nav-actions">
          <a href="#" className="auth-btn btn-login">Log in</a>
          <a href="#" className="auth-btn btn-signup">Sign up <ArrowRight size={16} /></a>
        </div>
      </nav>

      <div className="layout-container animate-fade-in">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {docSections.map((section) => (
              <a
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
                href={`#${section.id}`}
              >
                <span style={{ 
                  fontSize: '1.1rem', 
                  filter: activeSection === section.id ? 'grayscale(0%)' : 'grayscale(100%)', 
                  opacity: activeSection === section.id ? 1 : 0.6 
                }}>
                  {section.emoji}
                </span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          {docSections.map((section) => (
            <div key={section.id} id={section.id} className="section-card">
              <h1 className="section-title">
                {/* 1. Create (POST) styling like image for "React CRUD" section */}
                {section.id === 'react-crud' ? '1. Create (POST)' : section.title}
              </h1>
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: CodeWrapper,
                    blockquote: ({node, ...props}) => {
                       const text = String(props.children[1]?.props?.children || '');
                       if (text.includes('Pro Tip') || text.includes('Pro Move')) {
                         return (
                           <div className="note-box pro-tip">
                             <div className="note-icon">💡</div>
                             <div className="note-content" {...props} />
                           </div>
                         )
                       }
                       return (
                          <div className="note-box">
                             <div className="note-icon">👉</div>
                             <div className="note-content" {...props} />
                          </div>
                       )
                    }
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
