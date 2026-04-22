import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import "../../styles/layout.css"

const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="app">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(prev => !prev)}
        notifCount={9}
      />
      <div className="layout">
        <Sidebar collapsed={sidebarCollapsed} />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
