import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import "../../styles/layout.css"


interface NavItem {
  label: string
  path: string
}

interface NavGroup {
  label: string
  icon: React.ReactNode
  children: NavItem[]
}

const Sidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    userMgmt: location.pathname.startsWith('/user-management'),
  })

  const toggleGroup = (key: string) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const isActive = (path: string) => location.pathname === path

  const navGroups: Record<string, NavGroup> = {
    userMgmt: {
      label: 'User Management',
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      children: [
        { label: 'User Request', path: '/user-management/user-request' },
        { label: 'User List Report', path: '/user-management/user-list' },
      ],
    },
  }

  return (
    <nav className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div style={{ padding: '8px 0 4px' }}>

        {/* Dashboard */}
        <div
          className={`nav-item ${isActive('/') ? 'nav-item--active' : ''}`}
          onClick={() => navigate('/')}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </div>

        <div className="sidebar__section-label">Widgets</div>

        {/* User Management Group */}
        {Object.entries(navGroups).map(([key, group]) => (
          <div key={key}>
            <div
              className={`nav-group__header ${openGroups[key] ? 'nav-group__header--open' : ''}`}
              onClick={() => toggleGroup(key)}
            >
              <div className="nav-group__header-left">
                {group.icon}
                {group.label}
              </div>
              <svg
                width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24"
                className={`nav-group__chevron ${openGroups[key] ? 'nav-group__chevron--open' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {openGroups[key] && (
              <div className="nav-group__children">
                {group.children.map(child => (
                  <div
                    key={child.path}
                    className={`nav-child ${isActive(child.path) ? 'nav-child--active' : ''}`}
                    onClick={() => navigate(child.path)}
                  >
                    {child.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Audit Trail */}
        <div
          className={`nav-item ${isActive('/audit-trail') ? 'nav-item--active' : ''}`}
          onClick={() => navigate('/audit-trail')}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Audit Trail
        </div>

      </div>
    </nav>
  )
}

export default Sidebar
