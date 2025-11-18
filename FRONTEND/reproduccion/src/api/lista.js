import axios from 'axios';

// API para listas
const api_listas = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/lista/listas/',
});

export const getListas = () => api_listas.get('/');
export const getLista = (id) => api_listas.get(`/${id}/`);
export const postLista = (data) => api_listas.post('/', data);
export const putLista = (id, data) => api_listas.put(`/${id}/`, data);
export const patchLista = (id, data) => api_listas.patch(`/${id}/`, data);
export const deleteLista = (id) => api_listas.delete(`/${id}/`);

// API para agrega
const api_agrega = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/lista/agrega/',
});

export const getAgrega = () => api_agrega.get('/');
export const getAgregaItem = (id) => api_agrega.get(`/${id}/`);
export const postAgrega = (data) => api_agrega.post('/', data);
export const putAgrega = (id, data) => api_agrega.put(`/${id}/`, data);
export const patchAgrega = (id, data) => api_agrega.patch(`/${id}/`, data);
export const deleteAgrega = (id) => api_agrega.delete(`/${id}/`);

// API para favoritos
const api_favoritos = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/lista/favoritos/',
});

export const getFavoritos = () => api_favoritos.get('/');
export const getFavorito = (id) => api_favoritos.get(`/${id}/`);
export const postFavorito = (data) => api_favoritos.post('/', data);
export const putFavorito = (id, data) => api_favoritos.put(`/${id}/`, data);
export const patchFavorito = (id, data) => api_favoritos.patch(`/${id}/`, data);
export const deleteFavorito = (id) => api_favoritos.delete(`/${id}/`);

// API para historial
const api_historial = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/lista/historial/',
});

export const getHistorial = () => api_historial.get('/');
export const getHistorialItem = (id) => api_historial.get(`/${id}/`);
export const postHistorial = (data) => api_historial.post('/', data);
export const putHistorial = (id, data) => api_historial.put(`/${id}/`, data);
export const patchHistorial = (id, data) => api_historial.patch(`/${id}/`, data);
export const deleteHistorial = (id) => api_historial.delete(`/${id}/`);
