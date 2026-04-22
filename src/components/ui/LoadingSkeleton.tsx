import React from 'react'
import "../../styles/layout.css"

interface LoadingSkeletonProps {
  rows?: number
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 5 }) => (
  <div className="card">
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="skeleton"
        style={{ height: 16, width: `${85 + (i % 3) * 5}%`, marginBottom: 14 }}
      />
    ))}
  </div>
)

export default LoadingSkeleton