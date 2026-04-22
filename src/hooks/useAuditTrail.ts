import { useState, useEffect, useCallback } from 'react'
import { auditService } from '../api/services'
import type { AuditEntry, AuditTrailParams } from '@/types'

interface UseAuditTrailReturn {
  data: AuditEntry[]
  total: number
  loading: boolean
  error: string | null
  refetch: () => void
}

const useAuditTrail = (params: AuditTrailParams): UseAuditTrailReturn => {
  const [data, setData]       = useState<AuditEntry[]>([])
  const [total, setTotal]     = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await auditService.getAll(params)
      setData(result.data)
      setTotal(result.total)
    } catch (err) {
      setError('Failed to load audit trail. Please try again.')
      console.error('useAuditTrail error:', err)
    } finally {
      setLoading(false)
    }
  }, [params.searchValue, params.startDate, params.endDate, params.page, params.rowsPerPage])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, total, loading, error, refetch: fetchData }
}

export default useAuditTrail
