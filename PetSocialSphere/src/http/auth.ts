export interface SignupFormData {
  fname: string;
  sname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ApiResponse {
  status: string;
  data: {
    user: {
      fname: string;
      sname: string;
      email: string;
      photo: string;
      role: string;
      _id: string;
      __v: number;
    };
  };
}

export interface LoginFormData{
  email: string;
  password: string;
}

export async function signup(signupData: SignupFormData): Promise<ApiResponse> {
  const response = await fetch(`http://localhost:8000/api/v1/users/signup`, {
    method: "POST",
    body: JSON.stringify(signupData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred signing up");
  }

  const data: ApiResponse = await response.json();

  return data;
}


export async function login(loginData: LoginFormData): Promise<ApiResponse> {
  const response = await fetch(`http://localhost:8000/api/v1/users/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred signing in");
  }

  const data: ApiResponse = await response.json();

  return data;
}

export async function checkAuth(): Promise<ApiResponse> {
  const response = await fetch(`http://localhost:8000/api/v1/users/checkAuth`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("An error occurred checking authentication status");
  }

  const data: ApiResponse = await response.json();

  return data;
}