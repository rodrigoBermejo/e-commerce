const getToken = () => localStorage.getItem("token");

export const getUserIdFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};