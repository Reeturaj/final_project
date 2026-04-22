import { useState, useEffect, useCallback } from 'react'
import { userListService } from '../api/services'
import type { User, UserListParams } from '@/types'

interface UseUserListReturn {
  data: User[]
  total: number
  loading: boolean
  error: string | null
  refetch: () => void
}

const useUserList = (params: UserListParams): UseUserListReturn => {
  const [data, setData]       = useState<User[]>([])
  const [total, setTotal]     = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await userListService.getAll(params)
      setData(result.data)
      setTotal(result.total)
    } catch (err) {
      setError('Failed to load user list. Please try again.')
      console.error('useUserList error:', err)
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

export default useUserList
