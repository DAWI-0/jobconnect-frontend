const WS_BASE_URL = "ws://127.0.0.1:8000";

export function createChatSocket(conversationId, accessToken) {
  if (!conversationId) {
    throw new Error("conversationId est requis");
  }

  if (!accessToken) {
    throw new Error("Access token est requis");
  }

  const url = `${WS_BASE_URL}/ws/chat/${conversationId}/?token=${encodeURIComponent(
    accessToken
  )}`;

  const socket = new WebSocket(url);

  return socket;
}
