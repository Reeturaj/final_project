import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import "../../styles/layout.css"


interface HeaderProps {
  onToggleSidebar: () => void
  notifCount?: number
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, notifCount = 9 }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    setDropdownOpen(false)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__hamburger" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="header__logo">
          <svg width="36" height="36" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#9B1C1C" />
            <text x="20" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#fff">N</text>
          </svg>
          <span className="header__logo-text">NSDL Payments Bank</span>
        </div>
      </div>

      <div className="header__right">
        <button className="header__notif" aria-label="Notifications">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifCount > 0 && <span className="header__notif-badge">{notifCount}</span>}
        </button>

        {/* User dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button className="header__user-btn" onClick={() => setDropdownOpen(v => !v)}>
            <div className="header__avatar">{initials}</div>
            <span>{user?.name ?? 'User'}</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: '#fff', border: '1px solid var(--gray-200)',
              borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: 200, zIndex: 200,
            }}>
              {/* User info */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--gray-800)' }}>
                  {user?.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>
                  {user?.email}
                </div>
                <div style={{
                  display: 'inline-block', marginTop: 6,
                  background: 'var(--color-primary-light)', color: 'var(--color-primary)',
                  fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999,
                }}>
                  {user?.role?.toUpperCase()}
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  width: '100%', padding: '10px 16px', background: 'none',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontSize: 13, color: 'var(--color-danger)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  borderRadius: '0 0 8px 8px',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
