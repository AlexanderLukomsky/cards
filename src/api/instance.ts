import axios from "axios";

export const _instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


//|| 'http://localhost:7542/2.0/'

//'https://neko-back.herokuapp.com/2.0/'


///process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/'