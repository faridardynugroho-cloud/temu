const SESSION_KEY = "active_session_id"
const ADMIN_FLAG = "admin_active"

export function createSession() {
  const id = crypto.randomUUID()
  sessionStorage.setItem(SESSION_KEY, id)
  sessionStorage.setItem(ADMIN_FLAG, "1")
  return id
}

export function getSessionId() {
  return sessionStorage.getItem(SESSION_KEY)
}

export function isAdminActive() {
  return sessionStorage.getItem(ADMIN_FLAG) === "1"
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(ADMIN_FLAG)
}
