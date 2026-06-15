import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      const papersSection = document.getElementById('papers');
      if (papersSection) {
        papersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const pages: (number | string)[] = [];
  const pageSet = new Set<number>();

  // Always show first 3 pages if they exist
  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pageSet.add(i);
  }

  // Always show last page if it exists
  if (totalPages > 0) {
    pageSet.add(totalPages);
  }

  // Show current page and its neighbors
  if (currentPage > 0 && currentPage <= totalPages) {
    pageSet.add(currentPage);
    if (currentPage - 1 > 0) pageSet.add(currentPage - 1);
    if (currentPage + 1 <= totalPages) pageSet.add(currentPage + 1);
  }

  const sortedPages = Array.from(pageSet).sort((a, b) => a - b);

  let prevPage = 0;
  for (const p of sortedPages) {
    if (prevPage > 0 && p - prevPage > 1) {
      pages.push('...');
    }
    pages.push(p);
    prevPage = p;
  }

  return (
    <div className="papers-pagination">
      <button
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &lt;
      </button>

      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
              ...
            </span>
          );
        }

        const pageNum = p as number;
        return (
          <button
            key={`page-${pageNum}`}
            className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
};
export default Pagination;
