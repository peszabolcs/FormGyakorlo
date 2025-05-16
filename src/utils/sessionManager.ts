import { UserData } from "../formConfig";

interface SessionData {
  token: string;
  user: {
    username: string;
    role: string;
  };
  expiresAt: number;
}

const SESSION_KEY = "auth_session";

export const createSession = (
  token: string,
  user: { username: string; role: string }
) => {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 perc
  const sessionData: SessionData = {
    token,
    user,
    expiresAt,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = (): SessionData | null => {
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;

  const session: SessionData = JSON.parse(sessionStr);

  // Ellenőrizzük, hogy lejárt-e a session
  if (Date.now() > session.expiresAt) {
    clearSession();
    return null;
  }

  return session;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const isSessionValid = (): boolean => {
  const session = getSession();
  return session !== null;
};

export const getAuthToken = (): string | null => {
  const session = getSession();
  return session?.token || null;
};

export const getUser = () => {
  const session = getSession();
  return session?.user || null;
};
