import React, { useState } from 'react';
import type { ResearchPaper } from '../types';
import { icons } from '../icons';
import { showToast } from '../interactions';
import Pagination from './Pagination';

interface ResearchPapersProps {
  papers: ResearchPaper[];
}

export const ResearchPapers: React.FC<ResearchPapersProps> = ({ papers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('ajineshpratapsingh_bookmarks');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  const papersPerPage = 10;
  const totalPages = Math.ceil(papers.length / papersPerPage);
  const startIndex = (currentPage - 1) * papersPerPage;
  const endIndex = startIndex + papersPerPage;
  const currentPapers = papers.slice(startIndex, endIndex);

  const handleDownload = (e: React.MouseEvent, paper: ResearchPaper) => {
    e.preventDefault();
    const filename = paper.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.pdf';
    if (paper.pdfUrl) {
      const anchor = document.createElement('a');
      anchor.href = paper.pdfUrl;
      anchor.download = filename;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      showToast('Download started!', 'success');
    } else if (paper.arxivUrl) {
      window.open(paper.arxivUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening paper in new tab…', 'info');
    } else {
      showToast('No download available for this paper.', 'error');
    }
  };

  const handleRead = (e: React.MouseEvent, url: string | undefined) => {
    e.preventDefault();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Link unavailable for this article.', 'error');
    }
  };

  const handleShare = async (e: React.MouseEvent, paper: ResearchPaper) => {
    e.preventDefault();
    const url = paper.arxivUrl || window.location.href;
    const title = paper.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard!', 'success');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Link copied!', 'success');
    }
  };

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const next = new Set(bookmarks);
    if (next.has(id)) {
      next.delete(id);
      showToast('Bookmark removed.', 'info');
    } else {
      next.add(id);
      showToast('Bookmarked!', 'success');
    }
    setBookmarks(next);
    try {
      localStorage.setItem('ajineshpratapsingh_bookmarks', JSON.stringify([...next]));
    } catch {}
  };

  return (
    <div className="container">
      <div className="section-header">
        <div className="section-tag" dangerouslySetInnerHTML={{ __html: icons.document }} />
        <h2 className="section-title">Important Research Papers</h2>
        <p className="section-subtitle">Foundational papers every AI/ML practitioner should know.</p>
      </div>
      <div className="papers-grid">
        {currentPapers.map((paper) => {
          const filename = paper.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.pdf';
          const isBookmarked = bookmarks.has(paper.id);

          return (
            <article
              className="paper-card reveal visible"
              key={paper.id}
              data-id={paper.id}
              style={{
                animation: 'fadeInUp 0.35s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
              }}
            >
              <div className="paper-header">
                <div className="paper-meta-row">
                  <span className="paper-year">{paper.year}</span>
                  <span className="paper-venue">{paper.venue}</span>
                </div>
                <div className="paper-citations">
                  <span dangerouslySetInnerHTML={{ __html: icons.star }} /> {paper.citations}
                </div>
              </div>
              <h3 className="paper-title">{paper.title}</h3>
              <p className="paper-authors">{paper.authors}</p>
              <p className="paper-abstract">{paper.abstract}</p>
              <div className="paper-actions">
                <button
                  className="btn-paper btn-download"
                  onClick={(e) => handleDownload(e, paper)}
                  data-pdf={paper.pdfUrl || '#'}
                  data-action="download"
                  data-filename={filename}
                >
                  <span dangerouslySetInnerHTML={{ __html: icons.download }} /> pdf
                </button>
                <button
                  className="btn-paper btn-read-more"
                  onClick={(e) => handleRead(e, paper.arxivUrl)}
                  data-url={paper.arxivUrl || '#'}
                  data-action="read"
                >
                  <span dangerouslySetInnerHTML={{ __html: icons.externalLink }} /> arxiv
                </button>
                <button
                  className="btn-paper btn-share"
                  onClick={(e) => handleShare(e, paper)}
                  data-url={paper.arxivUrl || '#'}
                  data-title={paper.title}
                  aria-label="Share"
                >
                  <span dangerouslySetInnerHTML={{ __html: icons.externalLink }} /> share
                </button>
                <button
                  className={`btn-paper btn-bookmark ${isBookmarked ? 'bookmarked' : ''}`}
                  onClick={(e) => toggleBookmark(e, paper.id)}
                  style={
                    isBookmarked
                      ? { color: 'var(--accent)', background: 'var(--accent-bg)' }
                      : undefined
                  }
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                >
                  <span dangerouslySetInnerHTML={{ __html: icons.bookmark }} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ResearchPapers;
