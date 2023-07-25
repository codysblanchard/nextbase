export type PersonType = "MEDIA" | "BRAND";
export type RSVP = "YES" | "NO" | "MAYBE";
export type NextAuthTheme = "light" | "dark" | "auto";

export type Roles = "admin" | "brand" | "media";
export type SessionStatus = "loading" | "unauthenticated" | "authenticated";

export interface ExtendedSessionUser {
  name: string;
  email: string;
  role: Roles;
}
export interface XHRResponse {
  status: number;
  body: string;
}

export interface BackendSession {
  userId: string;
  role: Roles;
  email: string;
}
