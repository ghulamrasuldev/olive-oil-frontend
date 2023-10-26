
import axios from 'axios';
import { local_Url, base_Url } from '../Components/constants/index'
import { ApiError } from '../Helper/ApiError';


const apiService = async (method, url, headers, data) => {
  try {
    console.log(`${local_Url}${base_Url}${url}`);
    const response = await axios({
      method,
      url:`${local_Url}${base_Url}${url}`,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    const errorMessage = ApiError(error);
    throw errorMessage;
  }
};

export default apiService;
