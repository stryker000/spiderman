import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  validateStatus: status => status < 500          // treat 4xx as resolved promise
});
