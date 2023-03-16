import axios from "axios"


export const TOKE = 'Bearer 1/1203990323388467:ace329c9baef3ca8e189a72ac09f4f42'

export const instanceAxios = axios.create({
  baseURL:'https://app.asana.com/api/1.0',
  timeout:1000,
  headers:{
    accept:'application/json',
    Authorization: TOKE
  }
});