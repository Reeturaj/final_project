import CryptoJS from "crypto-js";

const LOGIN_URL =
  "https://services-encr.iserveu.online/dev/nsdlab-internal/user-authorization/user/login";

const DASHBOARD_URL = "https://services-encr.iserveu.online/dev/nsdlab-internal/user-mgmt/user/dashboard";

const BASIC_AUTH =
  "Basic bnNkbGFiLWludGVybmFsLWNsaWVudDpuc2RsYWItaW50ZXJuYWwtcGFzc3dvcmQ=";

const GEO_LOCATION = btoa(
  JSON.stringify({
    device: "WEB",
    latitude: 20.3419933,
    longitude: 85.8062196,
    city: "Bhubaneswar",
    country: "India",
    continent: "Asia",
  })
);

const SECRET_KEY = CryptoJS.enc.Base64.parse("a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=");

// ─── Encrypt ────────────────────────────────────────────────────────────────
const encryptPayload = (payload: object): string => {
  const plainText = JSON.stringify(payload);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const ivAndCiphertext = iv.concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(ivAndCiphertext);
};

// ─── Decrypt ────────────────────────────────────────────────────────────────
const decryptResponse = (encryptedB64: string): unknown => {
  const rawData = CryptoJS.enc.Base64.parse(encryptedB64);
  const iv = CryptoJS.lib.WordArray.create(rawData.words.slice(0, 4), 16);
  const ciphertext = CryptoJS.lib.WordArray.create(
    rawData.words.slice(4),
    rawData.sigBytes - 16
  );
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext } as CryptoJS.lib.CipherParams,
    SECRET_KEY,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

// ─── Common headers ─────────────────────────────────────────────────────────
const commonHeaders = (token?: string): Record<string, string> => ({
  accept: "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9",
  authorization: token ? `Bearer ${token}` : BASIC_AUTH,
  "content-type": "application/json",
  "geo-location": GEO_LOCATION,
});

// ─── Types ───────────────────────────────────────────────────────────────────
export interface LoginResponse {
  ResponseData?: string;  // encrypted — decrypted shape below
  token?: string;
  accessToken?: string;
  sKey?: string;
  message?: string;
  status?: string;
}

export interface LoginResult {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  adminName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  bankCode: string;
  userType: string;
  roleName: string;
  privileges: string[];
  scope: string[];
  is2FA: boolean;
  is2FAVerified: boolean;
  isPasswordResetRequired: string;
  passwordResetRequiredReason: string;
}

export interface DashboardData {
  // update these fields once you see the actual decrypted response
  [key: string]: unknown;
}

// ─── Login API ───────────────────────────────────────────────────────────────
export const loginApi = async (
  username: string,
  password: string,
  grant_type: string = "password"
): Promise<LoginResult> => {
  const requestData = encryptPayload({ username, password, grant_type });

  const response = await fetch(
    `${LOGIN_URL}`,
    {
      method: "POST",
      headers: commonHeaders(),
      body: JSON.stringify({ RequestData: requestData }),
    }
  );

  if (!response.ok) throw new Error(`Login failed: ${response.status}`);

  const json: LoginResponse = await response.json();

  // If login response itself is encrypted, decrypt it
const decrypted = json.ResponseData
  ? (decryptResponse(json.ResponseData) as LoginResult)  // ← LoginResult not LoginResponse
  : (json as unknown as LoginResult);
 // console.log("Decrypted login response:", decrypted);
  const token = decrypted.access_token ?? "";
  
  // Persist for subsequent calls
  localStorage.setItem("token", token);
 
  return decrypted;
};

// ─── Dashboard API ───────────────────────────────────────────────────────────
export const getDashboardData = async (): Promise<DashboardData> => {
  const token = localStorage.getItem("token") ?? "";

  const response = await fetch(
    `${DASHBOARD_URL}`,
    {
      method: "GET",
      headers: commonHeaders(token),
    }
  );

  if (!response.ok) throw new Error(`Dashboard failed: ${response.status}`);

  const json = await response.json();

  // Decrypt the response using sKey if needed
  // If sKey differs per session, swap SECRET_KEY logic here
  const decrypted = json.ResponseData
    ? decryptResponse(json.ResponseData)
    : json;

  return decrypted as DashboardData;
};