// User Authentication (Login)
export const loginUser = async (credentials) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...credentials,
      // TODO remove this hardcoded token once firebase messeging is integrated
      fcmToken:
        "eshm0tDfShuCuGBTwgskPS:APA91bFDQAprn1on5jGZeezHVJJqDTi8hIXIvfRpjoxnpIEdV4w3eQ-rQC8VsCKc7eYK5plQ_MenIgLD-T61XsWEBiHMPxlyfabA4EPVskrk4-89o0uXlCJY0Ul5UNyS9v7tgw1VHqAw",
    }),
  });

  const { data, error } = await response.json();

  if (!response.ok) throw new Error(`API Error ${response.status}: ${error}`);

  return data;
};
