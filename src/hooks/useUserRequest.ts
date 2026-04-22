import { useState, useEffect, useCallback } from 'react'
import { userRequestService } from '../api/services'
import type { UserRequest, UserRequestParams } from '@/types'

interface UseUserRequestReturn {
  data: UserRequest[]
  total: number
  loading: boolean
  error: string | null
  refetch: () => void
}

const useUserRequest = (params: UserRequestParams): UseUserRequestReturn => {
  const [data, setData]     = useState<UserRequest[]>([])
  const [total, setTotal]   = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await userRequestService.getAll(params)
      setData(result.data)
      setTotal(result.total)
    } catch (err) {
      setError('Failed to load user requests. Please try again.')
      console.error('useUserRequest error:', err)
    } finally {
      setLoading(false)
    }
  }, [
    params.searchType,
    params.searchValue,
    params.startDate,
    params.endDate,
    params.userType,
    params.status,
    params.page,
    params.rowsPerPage,
  ])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, total, loading, error, refetch: fetchData }
}

export default useUserRequest
