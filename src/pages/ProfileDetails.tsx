import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useProfile from '../hooks/useProfile'
import { userRequestService } from '../api/services'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import StatusBadge from '../components/ui/StatusBadge'
import type { ProfileDetails } from '@/types'
import './styles/profile.css'
import './styles/components.css'
import './styles/layout.css'

type TabKey = 'basic' | 'pan' | 'aadhaar' | 'matching' | 'geo' | 'browser'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'basic',    label: 'Basic Details' },
  { key: 'pan',      label: 'PAN Details' },
  { key: 'aadhaar',  label: 'Aadhar Details' },
  { key: 'matching', label: 'Matching Details' },
  { key: 'geo',      label: 'Geo-Tagging Analysis' },
  { key: 'browser',  label: 'Browser Data' },
]

// ─── KV Row helper ────────────────────────────────────────────────
const KVRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="kv-row">
    <span className="kv-key">{label}</span>
    <span className="kv-val">{value}</span>
  </div>
)

// ─── Doc Image placeholder ────────────────────────────────────────
const DocImg: React.FC<{ label: string; bg: string; color: string }> = ({ label, bg, color }) => (
  <div className="doc-img-placeholder" style={{ background: bg, color }}>{label}</div>
)

// ─── Tab content ──────────────────────────────────────────────────
const TabContent: React.FC<{ tab: TabKey; profile: ProfileDetails }> = ({ tab, profile }) => {
  if (tab === 'basic') {
    const d = profile.basicDetails
    return (
      <div className="tab-content">
        <div className="kv-list">
          <KVRow label="Name :" value={d.name} />
          <KVRow label="GSTIN :" value={d.gstin} />
          <KVRow label="PIN :" value={d.pin} />
        </div>
        <div className="kv-list">
          <KVRow label="City :" value={d.city} />
          <KVRow label="State :" value={d.state} />
          <KVRow label="Address :" value={d.address} />
        </div>
      </div>
    )
  }

  if (tab === 'pan') {
    const d = profile.panDetails
    return (
      <div className="tab-content">
        <div className="kv-list">
          <KVRow label="Name :" value={d.name} />
          <KVRow label="PAN Number :" value={d.panNumber} />
          <KVRow label="DOI :" value={d.doi} />
        </div>
        <div className="doc-images">
          <DocImg label="PAN Card Front" bg="#EFF6FF" color="#2563EB" />
          <DocImg label="PAN Card Back"  bg="#F5F3FF" color="#7C3AED" />
        </div>
      </div>
    )
  }

  if (tab === 'aadhaar') {
    const d = profile.aadhaarDetails
    return (
      <div className="tab-content">
        <div className="kv-list">
          <KVRow label="Name :" value={d.name} />
          <KVRow label="Father Name :" value={d.fatherName} />
          <KVRow label="Aadhaar Number :" value={d.aadhaarNumber} />
          <KVRow label="DOB :" value={d.dob} />
          <KVRow label="DOI :" value={d.doi} />
        </div>
        <div className="doc-images">
          <DocImg label="Aadhaar Front" bg="#F0FDF4" color="#15803D" />
          <DocImg label="Aadhaar Back"  bg="#FFF7ED" color="#C2410C" />
        </div>
      </div>
    )
  }

  if (tab === 'matching') {
    const d = profile.matchingDetails
    return (
      <div className="tab-content">
        <div className="kv-list">
          <KVRow label="PAN Name :" value={d.panName} />
          <KVRow label="Aadhaar Name :" value={d.aadhaarName} />
          <KVRow label="Match Score :"
            value={<span className="kv-val--success">{d.matchScore}</span>} />
        </div>
        <div className="doc-images">
          <DocImg label="PAN Card"  bg="#EFF6FF" color="#2563EB" />
          <DocImg label="Aadhaar"   bg="#F0FDF4" color="#15803D" />
        </div>
      </div>
    )
  }

  if (tab === 'geo') {
    const d = profile.geoTagging
    return (
      <div className="tab-content">
        <div className="kv-list">
          <KVRow label="IP :" value={d.ip} />
          <KVRow label="Latitude :" value={d.latitude} />
          <KVRow label="Longitude :" value={d.longitude} />
          <KVRow label="PIN :" value={d.pin} />
          <KVRow label="City :" value={d.city} />
          <KVRow label="State :" value={d.state} />
          <KVRow label="Address :" value={d.address} />
        </div>
        <div className="map-placeholder">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Map Preview ({d.city}, {d.state})
        </div>
      </div>
    )
  }

  if (tab === 'browser') {
    const d = profile.browserData
    return (
      <div className="tab-content">
        <div className="kv-list">
          <KVRow label="Browser :" value={d.browser} />
          <KVRow label="User OS :" value={d.userOS} />
          <KVRow label="Platform :" value={d.platform} />
          <KVRow label="Browser Language :" value={d.browserLanguage} />
          <KVRow label="Cookie Enable :" value={d.cookieEnable} />
        </div>
        {/* Chrome icon SVG */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="#EEF2FF" />
            <path d="M40 4 A36 36 0 0 1 76 40" stroke="#EA4335" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M76 40 A36 36 0 0 1 22 69" stroke="#FBBC04" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M22 69 A36 36 0 0 1 40 4"  stroke="#34A853" strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="40" r="14" fill="#4285F4" />
            <circle cx="40" cy="40" r="8"  fill="white" />
          </svg>
        </div>
      </div>
    )
  }

  return null
}

// ─── Main Page ────────────────────────────────────────────────────
const ProfileDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabKey>('basic')
  const [actionLoading, setActionLoading] = useState(false)

  const { profile, loading, error } = useProfile(id ? Number(id) : null)

  const handleApprove = async () => {
    if (!id) return
    setActionLoading(true)
    await userRequestService.approve(Number(id))
    setActionLoading(false)
    navigate(-1)
  }

  const handleReject = async () => {
    if (!id) return
    setActionLoading(true)
    await userRequestService.reject(Number(id))
    setActionLoading(false)
    navigate(-1)
  }

  if (error) return <div style={{ color: 'red', padding: 24 }}>{error}</div>
  if (loading || !profile) return <LoadingSkeleton rows={6} />

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb__link" onClick={() => navigate(-2)}>User Management</span>
        <span>›</span>
        <span className="breadcrumb__link" onClick={() => navigate(-1)}>User Request</span>
      </div>

      <div className="page-title">
        <button className="page-title__back" onClick={() => navigate(-1)} aria-label="Back">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        Profile Details
      </div>

      {/* Top cards */}
      <div className="profile-grid">
        {/* Left: avatar + contact */}
        <div className="profile-card-left">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="36" fill="#E5E7EB" />
                <circle cx="36" cy="28" r="12" fill="#9CA3AF" />
                <ellipse cx="36" cy="60" rx="18" ry="12" fill="#9CA3AF" />
              </svg>
            </div>
            <div className="profile-avatar__badge">
              <StatusBadge status={profile.status} />
            </div>
          </div>

          <div className="profile-name">{profile.name}</div>
          <div className="profile-username">User Name : {profile.userName}</div>

          <div className="profile-contacts">
            <div className="profile-contact-row">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {profile.email}
            </div>
            <div className="profile-contact-row">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.07-1.07a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {profile.phone}
            </div>
          </div>
        </div>

        {/* Right: personal details */}
        <div className="profile-card-right">
          <div className="profile-card-right__title">Personal Details</div>
          <div className="detail-grid">
            <div>
              <div className="detail-item__label">PAN</div>
              <div className="detail-item__value">{profile.pan}</div>
            </div>
            <div>
              <div className="detail-item__label">Aadhaar</div>
              <div className="detail-item__value">{profile.aadhaar}</div>
            </div>
            <div>
              <div className="detail-item__label">Created Date</div>
              <div className="detail-item__value">{profile.createdDate}</div>
            </div>
            <div>
              <div className="detail-item__label">Submission Date</div>
              <div className="detail-item__value">{profile.submissionDate}</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="detail-item__label">Address</div>
            <div style={{ marginTop: 4, fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6 }}>
              {profile.address}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="tabs">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`tab ${activeTab === t.key ? 'tab--active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <TabContent tab={activeTab} profile={profile} />

        <div className="profile-actions">
          <button className="btn btn--danger" onClick={handleReject} disabled={actionLoading}>
            Reject
          </button>
          <button className="btn btn--success" onClick={handleApprove} disabled={actionLoading}>
            {actionLoading ? 'Processing…' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetailsPage
