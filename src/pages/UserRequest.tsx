import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserRequest from '../hooks/useUserRequest'
import Pagination from '../components/ui/Pagination'
import StatusBadge from '../components/ui/StatusBadge'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import './styles/tables.css'
import './styles/components.css'
import './styles/layout.css'

const USER_TYPES = ['Bank User', 'CBC', 'CBC Maker', 'MDS', 'DS', 'Agent']

const UserRequest: React.FC = () => {
  const navigate = useNavigate()

  const [searchType, setSearchType]   = useState<'date' | 'name'>('date')
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate]     = useState('')
  const [endDate, setEndDate]         = useState('')
  const [userType, setUserType]       = useState('')
  const [status, setStatus]           = useState('')
  const [page, setPage]               = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const [selected, setSelected]       = useState<Set<number>>(new Set())

  const { data, total, loading, error } = useUserRequest({
    searchType,
    searchValue: searchType === 'name' ? searchValue : undefined,
    startDate:   searchType === 'date' ? startDate : undefined,
    endDate:     searchType === 'date' ? endDate : undefined,
    userType,
    status,
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

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(data.map(d => d.id)) : new Set())
  }

  const handleSearchTypeChange = (type: 'date' | 'name') => {
    setSearchType(type)
    setSearchValue('')
    setStartDate('')
    setEndDate('')
    setPage(1)
  }

  if (error) return <div style={{ color: 'red', padding: 24 }}>{error}</div>

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb__link">User Management</span>
        <span>›</span>
        <span>User Request</span>
      </div>

      <div className="page-title">User Request</div>

      <div className="card">
        {/* Search type toggle */}
        <div className="filter-bar">
          <div className="radio-group">
            <label className={`radio-label ${searchType === 'date' ? 'radio-label--selected' : ''}`}>
              <input
                type="radio"
                name="ur-type"
                checked={searchType === 'date'}
                onChange={() => handleSearchTypeChange('date')}
              />
              Search by Date Range
            </label>
            <label className={`radio-label ${searchType === 'name' ? 'radio-label--selected' : ''}`}>
              <input
                type="radio"
                name="ur-type"
                checked={searchType === 'name'}
                onChange={() => handleSearchTypeChange('name')}
              />
              Search by User Name
            </label>
          </div>
        </div>

        {/* Filters row */}
        <div className="filter-bar">
          {searchType === 'name' ? (
            <div className="search-wrap">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="input"
                placeholder="Search User Name"
                value={searchValue}
                onChange={e => { setSearchValue(e.target.value); setPage(1) }}
                style={{ width: 240 }}
              />
            </div>
          ) : (
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
          )}

          <div className="filter-bar__right">
            {searchType === 'date' && (
              <>
                <div className="select-wrap">
                  <select className="select" value={userType}
                    onChange={e => { setUserType(e.target.value); setPage(1) }}>
                    <option value="">User Type</option>
                    {USER_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="select-wrap">
                  <select className="select" value={status}
                    onChange={e => { setStatus(e.target.value); setPage(1) }}>
                    <option value="">Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </>
            )}
            <button className="btn btn--primary">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Sample File
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? <LoadingSkeleton rows={4} /> : (
          <>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th className="cell--check">
                      <input type="checkbox"
                        checked={data.length > 0 && selected.size === data.length}
                        onChange={e => toggleAll(e.target.checked)} />
                    </th>
                    <th className="sortable">first Name</th>
                    <th className="sortable">Last Name</th>
                    <th className="sortable">User Name</th>
                    <th className="sortable">Mobile No.</th>
                    <th className="sortable">Email ID</th>
                    <th className="sortable">Role</th>
                    <th className="sortable">Date Created</th>
                    <th className="sortable">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(u => (
                    <tr key={u.id} className={selected.has(u.id) ? 'row--selected' : ''}>
                      <td className="cell--check">
                        <input type="checkbox" checked={selected.has(u.id)}
                          onChange={() => toggleRow(u.id)} />
                      </td>
                      <td>{u.firstName}</td>
                      <td>{u.lastName}</td>
                      <td>{u.userName}</td>
                      <td>{u.mobileNo}</td>
                      <td>{u.emailId}</td>
                      <td>{u.role}</td>
                      <td>{u.dateCreated}</td>
                      <td><StatusBadge status={u.status} /></td>
                      <td>
                        <button className="btn btn--link"
                          onClick={() => navigate(`/user-management/user-request/${u.id}/profile`)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={page}
              totalItems={total}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={n => { setRowsPerPage(n); setPage(1) }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default UserRequest
