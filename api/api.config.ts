const BASE_URL = "https://tfare-user-api.onrender.com/api/v0";

const METHODS = {
  POST: "POST",
  GET: "GET",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

const HEADERS = {
  "Content-Type": "application/json",
};

const TOKEN_HEADER = (token: string) => {
  return {
    ...HEADERS,
    credentials: "include",
    Authorization: `Bearer ${token}`,
  };
};

const API_ERROR = (error: any) => {
  if ((error as any)?.name === "AbortError") {
    console.error("Fetch request timed out");
    return { code: 400, msg: "Fetch request timed out" };
  } else {
    console.error("Fetch request error:", error);
    return { code: 500, msg: "Fetch request errorout" };
  }
};

const ApiConfig = {
  base_url: BASE_URL,
  methods: METHODS,
  headers: HEADERS,
  token_header: TOKEN_HEADER,
  api_error: API_ERROR
};

export default ApiConfig;
