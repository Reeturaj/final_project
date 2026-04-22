/**
 * Auth Service
 * Calls the Authentik API (or any OIDC/OAuth2 provider).
 * Replace VITE_AUTH_BASE_URL with your Authentik instance URL.
 *
 * Authentik endpoint reference:
 *   POST /api/v3/core/tokens/         – token exchange
 *   POST /application/o/token/        – OAuth2 password grant
 *   POST /application/o/revoke-token/ – logout
 */

import axios from 'axios'
import type { LoginRequest, LoginResponse, AuthUser } from '@/types/auth'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'https://your-authentik.example.com'
const CLIENT_ID     = import.meta.env.VITE_AUTH_CLIENT_ID || 'nsdl-admin'
const CLIENT_SECRET = import.meta.env.VITE_AUTH_CLIENT_SECRET || ''

// Separate axios instance for auth — no JWT interceptor to avoid circular deps
const authClient = axios.create({ baseURL: AUTH_BASE_URL })

// ─── Login ─────────────────────────────────────────────────────────
export const authService = {
  /**
   * Exchange username + password for tokens via Authentik OAuth2 password grant.
   *
   * Authentik URL: POST /application/o/token/
   * Body (x-www-form-urlencoded):
   *   grant_type=password
   *   client_id=<CLIENT_ID>
   *   client_secret=<CLIENT_SECRET>
   *   username=<username>
   *   password=<password>
   *   scope=openid profile email
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // ── TODO: uncomment when Authentik is ready ──────────────────
    // const params = new URLSearchParams({
    //   grant_type:    'password',
    //   client_id:     CLIENT_ID,
    //   client_secret: CLIENT_SECRET,
    //   username:      credentials.username,
    //   password:      credentials.password,
    //   scope:         'openid profile email',
    // })
    // const res = await authClient.post('/application/o/token/', params, {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // })
    // const { access_token, refresh_token } = res.data
    //
    // Fetch user info
    // const userRes = await authClient.get('/application/o/userinfo/', {
    //   headers: { Authorization: `Bearer ${access_token}` },
    // })
    // return {
    //   token:        access_token,
    //   refreshToken: refresh_token,
    //   user: {
    //     id:       userRes.data.sub,
    //     name:     userRes.data.name,
    //     username: userRes.data.preferred_username,
    //     role:     userRes.data.groups?.[0] ?? 'viewer',
    //     email:    userRes.data.email,
    //   },
    // }
    // ── END TODO ─────────────────────────────────────────────────

    // Mock login — remove once Authentik is connected
    await new Promise(r => setTimeout(r, 800))
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      return {
        token: 'mock-jwt-token-xyz',
        refreshToken: 'mock-refresh-token',
        user: {
          id: 1,
          name: 'Stebin Ben',
          username: credentials.username,
          role: 'admin',
          email: 'stebin@nsdl.co.in',
        },
      }
    }
    throw new Error('Invalid username or password')
  },

  /**
   * Revoke tokens on logout.
   * Authentik URL: POST /application/o/revoke-token/
   */
  logout: async (): Promise<void> => {
    // ── TODO: uncomment when Authentik is ready ──────────────────
    // const token = localStorage.getItem('auth_token')
    // if (token) {
    //   await authClient.post('/application/o/revoke-token/', new URLSearchParams({
    //     token,
    //     client_id:     CLIENT_ID,
    //     client_secret: CLIENT_SECRET,
    //   }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    // }
    // ── END TODO ─────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 300))
  },

  /**
   * Refresh access token.
   * Authentik URL: POST /application/o/token/  (grant_type=refresh_token)
   */
  refresh: async (refreshToken: string): Promise<string> => {
    // ── TODO: uncomment when Authentik is ready ──────────────────
    // const params = new URLSearchParams({
    //   grant_type:    'refresh_token',
    //   client_id:     CLIENT_ID,
    //   client_secret: CLIENT_SECRET,
    //   refresh_token: refreshToken,
    // })
    // const res = await authClient.post('/application/o/token/', params, {
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // })
    // return res.data.access_token
    // ── END TODO ─────────────────────────────────────────────────
    return 'mock-refreshed-token'
  },
}

// Suppress unused variable warnings until real API is wired
void CLIENT_ID
void CLIENT_SECRET
