// ─── User Request ────────────────────────────────────────────────
export interface UserRequest {
  id: number
  firstName: string
  lastName: string
  userName: string
  mobileNo: string
  emailId: string
  role: string
  dateCreated: string
  status: 'Active' | 'Inactive'
}

// ─── User (full, for User List Report) ───────────────────────────
export interface User {
  id: number
  userName: string
  userType: string
  firstName: string
  lastName: string
  dateCreated: string
  createdBy: string
  updatedDate: string
  updatedBy: string
  mobileNo: string
  emailId: string
  parentUsername: string
  cbcName: string
  mdsName: string
  dsName: string
  address: string
  role: string
  status: 'Active' | 'Inactive'
  updatePhone: string
  updateEmail: string
}

// ─── Audit Trail ─────────────────────────────────────────────────
export interface AuditEntry {
  id: number
  fieldName: string
  userName: string
  userId: string
  adminName: string
  adminId: string
  createdDate: string
  updatedDate: string
  operationPerformed: string
}

// ─── Profile ──────────────────────────────────────────────────────
export interface ProfileDetails {
  name: string
  userName: string
  email: string
  phone: string
  status: string
  pan: string
  aadhaar: string
  createdDate: string
  submissionDate: string
  address: string
  basicDetails: BasicDetails
  panDetails: PanDetails
  aadhaarDetails: AadhaarDetails
  matchingDetails: MatchingDetails
  geoTagging: GeoTagging
  browserData: BrowserData
}

export interface BasicDetails {
  name: string
  gstin: string
  pin: string
  city: string
  state: string
  address: string
}

export interface PanDetails {
  name: string
  panNumber: string
  doi: string
}

export interface AadhaarDetails {
  name: string
  fatherName: string
  aadhaarNumber: string
  dob: string
  doi: string
}

export interface MatchingDetails {
  panName: string
  aadhaarName: string
  matchScore: string
}

export interface GeoTagging {
  ip: string
  latitude: string
  longitude: string
  pin: string
  city: string
  state: string
  address: string
}

export interface BrowserData {
  browser: string
  userOS: string
  platform: string
  browserLanguage: string
  cookieEnable: string
}

// ─── API response wrapper ─────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  rowsPerPage: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// ─── Filter params ────────────────────────────────────────────────
export interface UserRequestParams {
  searchType: 'date' | 'name'
  searchValue?: string
  startDate?: string
  endDate?: string
  userType?: string
  status?: string
  page: number
  rowsPerPage: number
}

export interface UserListParams {
  searchType: 'date' | 'name'
  searchValue?: string
  startDate?: string
  endDate?: string
  userType?: string
  status?: string
  page: number
  rowsPerPage: number
}

export interface AuditTrailParams {
  searchValue?: string
  startDate?: string
  endDate?: string
  page: number
  rowsPerPage: number
}
