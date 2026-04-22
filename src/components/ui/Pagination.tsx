import React from 'react'
import './styles/tables.css'

interface PaginationProps {
  currentPage: number
  totalItems: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage)

  // Build visible pages: always show 1, ellipsis, current±1, ellipsis, last
  const getVisiblePages = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (currentPage > 3) pages.push('...')
    for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) {
      pages.push(p)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  return (
    <div className="pagination">
      <div className="pagination__meta">
        Row per page
        <div className="pagination__select-wrap">
          <select
            className="pagination__select"
            value={rowsPerPage}
            onChange={e => onRowsPerPageChange(Number(e.target.value))}
          >
            {[3, 5, 10, 20].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pagination__goto">
        Go to
        <input
          type="number"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={e => {
            const p = Number(e.target.value)
            if (p >= 1 && p <= totalPages) onPageChange(p)
          }}
        />
      </div>

      <div className="pagination__pages">
        <button
          className="pagination__btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {getVisiblePages().map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="pagination__dots">•••</span>
          ) : (
            <button
              key={p}
              className={`pagination__btn ${currentPage === p ? 'pagination__btn--active' : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}

        <button
          className="pagination__btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default Pagination
