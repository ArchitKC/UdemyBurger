import axios from 'axios';

const axiosInstance = axios.create(
  {
      baseURL : 'https://react-my-burger-7bf63.firebaseio.com/'
  }  
);

export default axiosInstance;
