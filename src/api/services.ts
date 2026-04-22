/**
 * API Services
 * Each function calls the real API via apiClient.
 * While APIs are not ready, mock data is returned with a simulated delay.
 * To switch to real API: remove the mock block and uncomment the apiClient call.
 */

import apiClient from './client'
import { mockUserRequests, mockUsers, mockAuditTrail, mockProfile } from './mockData'
import type {
  UserRequest,
  User,
  AuditEntry,
  ProfileDetails,
  PaginatedResponse,
  ApiResponse,
  UserRequestParams,
  UserListParams,
  AuditTrailParams,
} from '@/types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ─── User Request ──────────────────────────────────────────────────
export const userRequestService = {
  getAll: async (params: UserRequestParams): Promise<PaginatedResponse<UserRequest>> => {
    await delay(400)
    // TODO: replace with real API ↓
    // const res = await apiClient.get('/user-requests', { params })
    // return res.data

    let filtered = [...mockUserRequests]
    if (params.searchType === 'name' && params.searchValue) {
      filtered = filtered.filter((u) =>
        u.userName.toLowerCase().includes(params.searchValue!.toLowerCase())
      )
    }
    if (params.status) filtered = filtered.filter((u) => u.status === params.status)
    const start = (params.page - 1) * params.rowsPerPage
    return {
      data: filtered.slice(start, start + params.rowsPerPage),
      total: filtered.length,
      page: params.page,
      rowsPerPage: params.rowsPerPage,
    }
  },

  approve: async (id: number): Promise<ApiResponse<null>> => {
    await delay(600)
    // TODO: return await (await apiClient.post(`/user-requests/${id}/approve`)).data
    return { data: null, success: true, message: 'User approved successfully' }
  },

  reject: async (id: number): Promise<ApiResponse<null>> => {
    await delay(600)
    // TODO: return await (await apiClient.post(`/user-requests/${id}/reject`)).data
    return { data: null, success: true, message: 'User rejected' }
  },
}

// ─── User List ─────────────────────────────────────────────────────
export const userListService = {
  getAll: async (params: UserListParams): Promise<PaginatedResponse<User>> => {
    await delay(400)
    // TODO: const res = await apiClient.get('/users', { params }); return res.data

    let filtered = [...mockUsers]
    if (params.searchType === 'name' && params.searchValue) {
      filtered = filtered.filter((u) =>
        u.userName.toLowerCase().includes(params.searchValue!.toLowerCase())
      )
    }
    if (params.userType) filtered = filtered.filter((u) => u.userType === params.userType)
    if (params.status) filtered = filtered.filter((u) => u.status === params.status)
    const start = (params.page - 1) * params.rowsPerPage
    return {
      data: filtered.slice(start, start + params.rowsPerPage),
      total: filtered.length,
      page: params.page,
      rowsPerPage: params.rowsPerPage,
    }
  },

  updatePhone: async (id: number, phone: string): Promise<ApiResponse<null>> => {
    await delay(500)
    // TODO: return await (await apiClient.patch(`/users/${id}/phone`, { phone })).data
    console.log('Update phone for user', id, phone)
    return { data: null, success: true }
  },

  updateEmail: async (id: number, email: string): Promise<ApiResponse<null>> => {
    await delay(500)
    // TODO: return await (await apiClient.patch(`/users/${id}/email`, { email })).data
    console.log('Update email for user', id, email)
    return { data: null, success: true }
  },

  updateStatus: async (id: number, status: string): Promise<ApiResponse<null>> => {
    await delay(500)
    // TODO: return await (await apiClient.patch(`/users/${id}/status`, { status })).data
    console.log('Update status for user', id, status)
    return { data: null, success: true }
  },
}

// ─── Audit Trail ──────────────────────────────────────────────────
export const auditService = {
  getAll: async (params: AuditTrailParams): Promise<PaginatedResponse<AuditEntry>> => {
    await delay(400)
    // TODO: const res = await apiClient.get('/audit-trail', { params }); return res.data

    let filtered = [...mockAuditTrail]
    if (params.searchValue) {
      filtered = filtered.filter((a) =>
        a.userName.toLowerCase().includes(params.searchValue!.toLowerCase())
      )
    }
    const start = (params.page - 1) * params.rowsPerPage
    return {
      data: filtered.slice(start, start + params.rowsPerPage),
      total: filtered.length,
      page: params.page,
      rowsPerPage: params.rowsPerPage,
    }
  },
}

// ─── Profile ──────────────────────────────────────────────────────
export const profileService = {
  getById: async (_id: number): Promise<ApiResponse<ProfileDetails>> => {
    await delay(400)
    // TODO: const res = await apiClient.get(`/users/${id}/profile`); return res.data
    return { data: mockProfile, success: true }
  },
}

export { apiClient }
