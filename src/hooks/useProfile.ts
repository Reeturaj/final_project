import { useState, useEffect } from 'react'
import { profileService } from '../api/services'
import type { ProfileDetails } from '@/types'

interface UseProfileReturn {
  profile: ProfileDetails | null
  loading: boolean
  error: string | null
  refetch: () => void
}

const useProfile = (userId: number | null): UseProfileReturn => {
  const [profile, setProfile] = useState<ProfileDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const fetchData = async () => {
    if (userId === null) return
    setLoading(true)
    setError(null)
    try {
      const result = await profileService.getById(userId)
      setProfile(result.data)
    } catch (err) {
      setError('Failed to load profile. Please try again.')
      console.error('useProfile error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [userId])

  return { profile, loading, error, refetch: fetchData }
}

export default useProfile
