const BASE_URL = "http://localhost:5000/api";

export const createReview = async (userId: number, code: string) => {
  const res = await fetch(`${BASE_URL}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, code }),
  });

  return await res.json();
};

export const getHistory = async (userId: number) => {
  const res = await fetch(`${BASE_URL}/review/history/${userId}`);
  return await res.json();
};