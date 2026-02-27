export type AuthUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

const USER_KEY = "authUser";
const SESSION_KEY = "authSession";

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "true";
}

export function login(email: string, password: string): boolean {
  const user = getStoredUser();
  if (user && user.email === email && user.password === password) {
    localStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function register(name: string, email: string, password: string): void {
  const avatar = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  localStorage.setItem(USER_KEY, JSON.stringify({ name, email, password, avatar }));
  localStorage.setItem(SESSION_KEY, "true");
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}
