import { Platform } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://${
    Platform.OS === 'ios' ? 'localhost' : '192.168.1.105'
  }:3333`
});

export default api;
