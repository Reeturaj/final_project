import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserList from '../hooks/useUserList'
import { userListService } from '../api/services'
import Pagination from '../components/ui/Pagination'
import StatusBadge from '../components/ui/StatusBadge'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import './styles/tables.css'
import './styles/components.css'
import './styles/layout.css'

const USER_TYPES = ['Bank User', 'CBC', 'CBC Maker', 'MDS', 'DS', 'Agent']

const UserListReport: React.FC = () => {
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
  const [editingPhone, setEditingPhone] = useState<number | null>(null)
  const [editingEmail, setEditingEmail] = useState<number | null>(null)

  const { data, total, loading, error, refetch } = useUserList({
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

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    await userListService.updateStatus(id, newStatus)
    refetch()
  }

  if (error) return <div style={{ color: 'red', padding: 24 }}>{error}</div>

  return (
    <div>
      <div className="breadcrumb">
        <span className="breadcrumb__link">User Management</span>
        <span>›</span>
        <span>User List Report</span>
      </div>

      <div className="page-title">User List Report</div>

      <div className="card">
        {/* Search type toggle */}
        <div className="filter-bar">
          <div className="radio-group">
            <label className={`radio-label ${searchType === 'date' ? 'radio-label--selected' : ''}`}>
              <input type="radio" name="ul-type" checked={searchType === 'date'}
                onChange={() => { setSearchType('date'); setSearchValue(''); setPage(1) }} />
              Search by Date Range
            </label>
            <label className={`radio-label ${searchType === 'name' ? 'radio-label--selected' : ''}`}>
              <input type="radio" name="ul-type" checked={searchType === 'name'}
                onChange={() => { setSearchType('name'); setPage(1) }} />
              Search by User Name
            </label>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          {searchType === 'name' ? (
            <div className="search-wrap">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input className="input" placeholder="Search by User Name" value={searchValue}
                onChange={e => { setSearchValue(e.target.value); setPage(1) }} style={{ width: 240 }} />
            </div>
          ) : (
            <div className="date-range">
              <input className="input input--date" type="text" placeholder="Start date"
                value={startDate} onChange={e => setStartDate(e.target.value)} />
              <span className="date-sep">→</span>
              <input className="input input--date" type="text" placeholder="End date"
                value={endDate} onChange={e => setEndDate(e.target.value)} />
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

        {/* Wide table */}
        {loading ? <LoadingSkeleton rows={4} /> : (
          <>
            <div className="table-wrap">
              <table className="table" style={{ fontSize: 12 }}>
                <thead>
                  <tr>
                    <th className="cell--check">
                      <input type="checkbox"
                        checked={data.length > 0 && selected.size === data.length}
                        onChange={e => setSelected(e.target.checked ? new Set(data.map(d => d.id)) : new Set())} />
                    </th>
                    <th>User Name</th><th>User Type</th><th>first Name</th><th>Last Name</th>
                    <th>Date Created</th><th>Created By</th><th>Updated Date</th><th>Updated By</th>
                    <th>Mobile No.</th><th>Email ID</th><th>Parent Username</th><th>CBC Name</th>
                    <th>MDS Name</th><th>DS Name</th><th>Address</th><th>Role</th><th>Status</th>
                    <th>Updated Status</th><th>Update Phone</th><th>Update Email</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(u => (
                    <tr key={u.id} className={selected.has(u.id) ? 'row--selected' : ''}>
                      <td className="cell--check">
                        <input type="checkbox" checked={selected.has(u.id)}
                          onChange={() => toggleRow(u.id)} />
                      </td>
                      <td>
                        <div className="cell--user">
                          <div className="cell--user-avatar">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                          {u.userName}
                        </div>
                      </td>
                      <td>{u.userType}</td>
                      <td>{u.firstName}</td>
                      <td>{u.lastName}</td>
                      <td>{u.dateCreated}</td>
                      <td>{u.createdBy}</td>
                      <td>{u.updatedDate}</td>
                      <td>{u.updatedBy}</td>
                      <td>{u.mobileNo}</td>
                      <td>{u.emailId}</td>
                      <td>{u.parentUsername}</td>
                      <td>{u.cbcName}</td>
                      <td>{u.mdsName}</td>
                      <td>{u.dsName}</td>
                      <td className="cell--truncate" title={u.address}>{u.address}</td>
                      <td>{u.role}</td>
                      <td><StatusBadge status={u.status} /></td>
                      <td>
                        <div className="select-wrap">
                          <select className="select--sm"
                            onChange={e => handleUpdateStatus(u.id, e.target.value)}>
                            <option value="">Select</option>
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {editingPhone === u.id ? (
                          <input className="input" defaultValue={u.updatePhone} style={{ width: 130 }}
                            onBlur={async e => {
                              await userListService.updatePhone(u.id, e.target.value)
                              setEditingPhone(null); refetch()
                            }} autoFocus />
                        ) : (
                          <span style={{ cursor: 'pointer' }} onClick={() => setEditingPhone(u.id)}>
                            {u.updatePhone}
                          </span>
                        )}
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {editingEmail === u.id ? (
                          <input className="input" defaultValue={u.updateEmail} style={{ width: 160 }}
                            onBlur={async e => {
                              await userListService.updateEmail(u.id, e.target.value)
                              setEditingEmail(null); refetch()
                            }} autoFocus />
                        ) : (
                          <>
                            <span style={{ marginRight: 6 }}>{u.updateEmail}</span>
                            <button className="btn btn--link" onClick={() => setEditingEmail(u.id)}>Update</button>
                          </>
                        )}
                      </td>
                      <td>
                        <button className="btn btn--link"
                          onClick={() => navigate(`/user-management/user-list/${u.id}/profile`)}>
                          View Details
                        </button>
                      </td>
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

export default UserListReport
