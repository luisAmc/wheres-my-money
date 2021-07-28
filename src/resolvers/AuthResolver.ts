import axios from '../utils/axios';

export async function logout() {
  const response = await axios.post('/auth');
  return response.data;
}

export type LoginInput = {
  email: string;
  password: string;
};

export async function login(input: LoginInput) {
  return await axios.post('/auth/login', input);
}

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export async function signUp(input: SignUpInput) {
  return await axios.post('/auth/signup', input);
}
