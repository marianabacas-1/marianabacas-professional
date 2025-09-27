import axios from "axios";


axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if(error.response && (error.response.status === 401)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      if(window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  const webToken = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if(webToken) {
    config.headers['Authorization'] = `Bearer ${webToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;