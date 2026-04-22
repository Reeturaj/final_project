import React from 'react'
import './styles/components.css'

interface StatusBadgeProps {
  status: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const cls = status === 'Active' ? 'badge--active' : 'badge--inactive'
  return <span className={`badge ${cls}`}>{status}</span>
}

export default StatusBadge
