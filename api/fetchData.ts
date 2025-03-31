import { redirect } from "next/navigation";

interface ApiOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  body?: any;
  headers?: Record<string, string>;
}

export async function apiCall({ method, url, body, headers = {} }: ApiOptions) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      // credentials: "include", // Includes cookies in the request
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    console.log(response.status, "check auth");

    // Handle unauthorized or forbidden responses
    if (response.status === 401 || response.status === 403) {
      window.location.href = "/auth/login";
    }

    // Handle successful responses
    if (response.status === 200) {
      return await response.json();
    }

    // Handle other error responses
    throw new Error(`Request failed with status: ${response.status}`);
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}
