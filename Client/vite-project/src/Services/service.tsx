import axios from 'axios';
import { getCookie } from './cookies';
import { del, location, search, update } from './location';


// export const getAll = (url: string) => axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
export const getAll = (url: string) => axios.get(url);
export const getItem = async (url: string) => await axios.get(url, { headers: { "Authorization": `Bearer ${getCookie("token")}` } });
export const getToHome = (param: string, url: string) => axios.get(`${url}/${param}`, { params: { param } });
export const getBySearch = (search: search, url: string) => axios.get(`${url}/${search.freeSearch}/${search.select}`, { params: search });
export const addItem = (item: any, url: string) => axios.post(url, item, config);
export const editItem = (item: any, url: string) => axios.put(`${url}/${item}`,config, { params: { item }} );
export const updateItem = (update: update, url: string) => axios.patch(`${url}/${update.item.id}`, update);
export const deleteItem = (del: del, url: string) => axios.delete(`${url}/${del.id}/${del.isTemp}`, config);
//   @Delete('delete/:id/:isTemp')

// new
export const response = (query: string, url: string) => axios.post(url, {query}); // Send the user's query in the request body

const token = getCookie("token");
const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };