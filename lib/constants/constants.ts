// constants/authConstants.ts

export const FIELD_OPTIONS = [
  "Tech",
  "Finance",
  "Health",
  "Education",
  "Environment",
  "Marketing",
  "Legal",
  "Design",
  "Logistics",
  "Customer Service",
  "Other",
];

export const PROFESSION_OPTIONS = [
  "Product Builder/Businessman",
  "Developer/Freelancer/Helper",
  "Student",
  "Problem Poster",
  "Just User",
];

export const AUTH_ROUTES = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  VERIFY_EMAIL: "/auth/verify-email",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
};
export const API_ENDPOINTS = {
  // Authentication Endpoints
  SIGNUP: "auth/signup",
  VERIFY_EMAIL: "auth/verify-otp",
  LOGIN: "auth/login",
  FORGOT_PASSWORD: "auth/forgot-password",
  VERIFY_FORGOT_PASSWORD_OTP: "auth/verify-forgot-password-otp", // Fixed typo: PASSOWRD -> PASSWORD
  CHANGE_PASSWORD: "auth/change-password",
  RESEND_OTP: "auth/resend-otp",
  GET_USER_PROFILE: "auth/profile",
  UPDATE_USER_PROFILE: "auth/profile",

  // Poetry Endpoints
  CREATE_POETRY: "add-poetry",
  GET_POETRIES: "all-poetries",
  GET_POETRIES_BY_TYPE: "type", // e.g., /type/Love
  SEARCH_POETRIES: "poetry/search",
  GET_TOP_POETRIES: "top-poetries",
  GET_POETRY_BY_ID: "poetry", // e.g., /poetry/:id
  GET_POETRIES_BY_USER: "poetry/user", // e.g., /poetry/user/:userId
  UPDATE_POETRY: "poetry", // e.g., /poetry/:id (PUT)
  DELETE_POETRY: "poetry", // e.g., /poetry/:id (DELETE)
  LIKE_POETRY: "poetry", // e.g., /poetry/:id/like
  DISLIKE_POETRY: "poetry", // e.g., /poetry/:id/dislike
  POST_COMMENT: "poetry", // e.g., /poetry/:id/comment
  GET_COMMENTS: "poetry", // e.g., /poetry/:id/comments
};

export const BASE_URL = "http://localhost:5000/api/";

// Token key for localStorage
export const TOKEN_KEY = "solution_token";
