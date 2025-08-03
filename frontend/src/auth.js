export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
};
