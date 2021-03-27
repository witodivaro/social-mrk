export interface HandledNetworkError {
  network: string[];
}

export interface HandledSignUpErrors extends HandledNetworkError {
  username: string[];
  email: string[];
}

export interface HandledSignInErrors extends HandledNetworkError {
  credentials: string[];
}

export interface HandledGetUserErrors extends HandledNetworkError {
  isPageNotFound: boolean;
}

export interface HandledChangeUserErrors extends HandledNetworkError {}
