import type { UserRequest, User, AuditEntry, ProfileDetails } from '@/types'

export const mockUserRequests: UserRequest[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  firstName: ['Krishna', 'Ramesh', 'Sunita', 'Priya', 'Mohan'][i % 5],
  lastName: ['Das', 'Kumar', 'Sharma', 'Nair', 'Roy'][i % 5],
  userName: `SP0${28 + i}`,
  mobileNo: `80982991${i % 10}`,
  emailId: `user${i}@gmail.com`,
  role: ['Maker', 'Checker'][i % 2],
  dateCreated: '19/06/2024',
  status: i % 4 === 0 ? 'Inactive' : 'Active',
}))

export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  userName: ['Carson Darrin', 'Ashy Handgun', 'Krishna Kumar', 'Ravi Sharma', 'Priya Nair'][i % 5],
  userType: ['Maker', 'Checker', 'Viewer'][i % 3],
  firstName: ['Krishna', 'Ramesh', 'Sunita', 'Priya', 'Mohan'][i % 5],
  lastName: ['Das', 'Kumar', 'Sharma', 'Nair', 'Roy'][i % 5],
  dateCreated: '19/06/2024',
  createdBy: ['Carson', 'Ashy', 'Ravi', 'Priya'][i % 4],
  updatedDate: '19/06/2024',
  updatedBy: ['Carson', 'Ashy', 'Ravi', 'Priya'][i % 4],
  mobileNo: '809829919',
  emailId: 'Krishna@gmail.com',
  parentUsername: 'Krishna Das',
  cbcName: 'Krishna Das',
  mdsName: 'Krishna Das',
  dsName: 'Krishna Das',
  address: 'Plot No. E-12, SRB Tower, Bhubaneswar',
  role: ['Maker', 'Checker', 'Viewer'][i % 3],
  status: i % 5 === 0 ? 'Inactive' : 'Active',
  updatePhone: '+91 9383764393',
  updateEmail: 'johndoe@gmail.com',
}))

export const mockAuditTrail: AuditEntry[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  fieldName: ['Maker', 'Checker', 'Admin'][i % 3],
  userName: ['Krishna', 'Ramesh', 'Sunita'][i % 3],
  userId: ['CBC', 'MDS', 'DS'][i % 3],
  adminName: ['Carson Darrin', 'Ashy Handgun', 'Ravi Kumar'][i % 3],
  adminId: ['Das', 'Kumar', 'Sharma'][i % 3],
  createdDate: '19/06/2024',
  updatedDate: '19/06/2024',
  operationPerformed: '809829919',
}))

export const mockProfile: ProfileDetails = {
  name: 'Adeline Ballard',
  userName: 'Adeline',
  email: 'Adeline@gmail.com',
  phone: '+91-9999888800',
  status: 'Active',
  pan: 'XXXXXX67F',
  aadhaar: 'XXXX XXXX XXXX 7463',
  createdDate: '12/09/2025',
  submissionDate: '15/09/2025',
  address: 'Plot No. E-12, SRB Tower, 11th Floor Infocity, Chandaka Industrial Estate, I E, Area, Bhubaneswar, Odisha 751024',
  basicDetails: { name: 'Adeline Ballard', gstin: 'NA', pin: '645683', city: 'Bhubaneswar', state: 'Odisha', address: 'Plot No. E-12, SRB Tower, 11th Floor Infocity, Chandaka Industrial Estate, I E, Area, Bhubaneswar, Odisha 751024' },
  panDetails: { name: 'Adeline Ballard', panNumber: 'XXXXXX023X', doi: '22-02-2025' },
  aadhaarDetails: { name: 'Adeline Ballard', fatherName: 'Alex Doe', aadhaarNumber: 'XXXX XXXX XXXX 7685', dob: '21-02-2000', doi: '22-02-2025' },
  matchingDetails: { panName: 'Adeline Ballard', aadhaarName: 'Adeline Ballard', matchScore: '100%' },
  geoTagging: { ip: 'NA', latitude: '26.938474', longitude: '32.938474', pin: '763427', city: 'Bhubaneswar', state: 'Odisha', address: 'Plot No. E-12, SRB Tower, 11th Floor Infocity, Chandaka Industrial Estate, I E, Area, Bhubaneswar, Odisha 751024' },
  browserData: { browser: 'NA', userOS: 'NA', platform: 'NA', browserLanguage: 'NA', cookieEnable: 'NA' },
}
