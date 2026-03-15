import {
  ApiErrorResponse,
  AuthenticationResponse,
  CalorieRequest,
  CalorieResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const authStorage = localStorage.getItem("auth");
  const token = authStorage ? JSON.parse(authStorage).state?.token : null;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data: T = await response.json();

  if (!response.ok) {
    if (response.status === 403) {
      localStorage.removeItem("auth");
      window.location.replace("/login");
    }

    const errorMessage = 
    response.status === 404 ? 'Dish not found. Try another name.' :
    response.status === 422 ? 'No calorie data available for this dish.' :
    response.status === 429 ? 'Too many requests. Please wait a moment.' :
    response.status === 500 ? 'Server error. Please try again later.' :
    (data as ApiErrorResponse).message || 'Something went wrong'

    // console.log("API Response:", data);

    throw new Error( errorMessage);
  }

  return data;
};

export const registerUser = (
  payload: RegisterPayload,
): Promise<AuthenticationResponse> => {
  return apiRequest<AuthenticationResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loginUser = (
  payload: LoginPayload,
): Promise<AuthenticationResponse> => {
  return apiRequest<AuthenticationResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getCalories = (
  payload: CalorieRequest,
): Promise<CalorieResponse> => {
  return apiRequest<CalorieResponse>("/get-calories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
