
import axios from 'axios';
// import NavigationService from '../routers/NavigationService';
import { AsyncStorage } from 'react-native';

class BaseService {
  constructor() {
    this.baseUrl = "http://gateway.marvel.com/v1/public/";
    axios.interceptors.request.use(
      async function(config) {
        config.headers.common['x-access-token'] = await AsyncStorage.getItem(
          'token',
        );
        
        return config;
      },
      function(error) {
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if(error.response){
          if (error.response.status === 401) {
            // NavigationService.navigate('loginScreen');
          }
        }
        return Promise.reject(error);
      },
    );
  }

  getData(path) {
    let url = `${this.baseUrl}${path}`;
    return axios.get(`${url}`, 
    {
        params: {
            ts: 1,
            apikey: "b79455a617be05e6cb74ae2eb48cee30",
            hash: "620c421ed9665d9f18408d997ef28919"
        }
    });
  }
}

export default new BaseService();
