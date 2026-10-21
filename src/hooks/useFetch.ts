const API_URL = "https://api.spotify.com/v1";

export const useFetch = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_SPOTIFY_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
