import { useState, useEffect } from "react";
import { apiCall } from "../api/fetchData";
import { API_ENDPOINTS, BASE_URL, TOKEN_KEY } from "@/lib/constants/constants";
import { getItem } from "@/lib/localStorage";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        // Fetch the current user info
        const response = await apiCall({
          method: "GET",
          url: `${BASE_URL}${API_ENDPOINTS.GET_USER_PROFILE}`,
          headers: {
            Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}
