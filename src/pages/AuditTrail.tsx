import React, { useState } from 'react'
import useAuditTrail from '../hooks/useAuditTrail'
import Pagination from '../components/ui/Pagination'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import '../styles/tables.css'
import '../styles/components.css'
import '../styles/layout.css'

const AuditTrail: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate]     = useState('')
  const [endDate, setEndDate]         = useState('')
  const [page, setPage]               = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const [selected, setSelected]       = useState<Set<number>>(new Set())

  const { data, total, loading, error } = useAuditTrail({
    searchValue,
    startDate,
    endDate,
    page,
    rowsPerPage,
  })

  const toggleRow = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (error) return <div style={{ color: 'red', padding: 24 }}>{error}</div>

  return (
    <div>
      <div className="page-title">Audit Trail</div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-wrap">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input className="input" placeholder="Search by User Name"
              value={searchValue}
              onChange={e => { setSearchValue(e.target.value); setPage(1) }}
              style={{ width: 240 }} />
          </div>

          <div className="date-range">
            <input className="input input--date" type="text" placeholder="Start date"
              value={startDate} onChange={e => setStartDate(e.target.value)} />
            <span className="date-sep">→</span>
            <input className="input input--date" type="text" placeholder="End date"
              value={endDate} onChange={e => setEndDate(e.target.value)} />
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" style={{ color: 'var(--gray-400)', cursor: 'pointer' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>

          <div className="filter-bar__right">
            <button className="btn btn--primary">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Sample File
            </button>
          </div>
        </div>

        {loading ? <LoadingSkeleton rows={4} /> : (
          <>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th className="cell--check">
                      <input type="checkbox"
                        checked={data.length > 0 && selected.size === data.length}
                        onChange={e => setSelected(
                          e.target.checked ? new Set(data.map(d => d.id)) : new Set()
                        )} />
                    </th>
                    <th className="sortable">Field Name</th>
                    <th className="sortable">User Name</th>
                    <th className="sortable">User ID</th>
                    <th className="sortable">Admin Name</th>
                    <th className="sortable">Admin ID</th>
                    <th className="sortable">Created Date</th>
                    <th className="sortable">Updated Date</th>
                    <th className="sortable">Operation Performed</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(a => (
                    <tr key={a.id} className={selected.has(a.id) ? 'row--selected' : ''}>
                      <td className="cell--check">
                        <input type="checkbox" checked={selected.has(a.id)}
                          onChange={() => toggleRow(a.id)} />
                      </td>
                      <td><span className="badge badge--audit">{a.fieldName}</span></td>
                      <td>{a.userName}</td>
                      <td>{a.userId}</td>
                      <td>
                        <div className="cell--user">
                          <div className="cell--user-avatar">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                          {a.adminName}
                        </div>
                      </td>
                      <td>{a.adminId}</td>
                      <td>{a.createdDate}</td>
                      <td>{a.updatedDate}</td>
                      <td>{a.operationPerformed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={page} totalItems={total} rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={n => { setRowsPerPage(n); setPage(1) }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AuditTrail
