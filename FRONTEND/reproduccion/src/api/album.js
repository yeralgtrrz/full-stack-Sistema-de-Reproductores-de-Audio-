import axios from 'axios';

// API para albums
const api_albums = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/album/albums/', // eliminé el espacio al inicio
});

export const getAlbums = () => api_albums.get('/');
export const getAlbum = (id) => api_albums.get(`/${id}/`);
export const postAlbum = (data) => api_albums.post('/', data);
export const putAlbum = (id, data) => api_albums.put(`/${id}/`, data);
export const patchAlbum = (id, data) => api_albums.patch(`/${id}/`, data);
export const deleteAlbum = (id) => api_albums.delete(`/${id}/`);

// API para componentes
const api_componen = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/album/componen/',
});

export const getComponenAll = () => api_componen.get('/');
export const getComponen = (id) => api_componen.get(`/${id}/`);
export const postComponen = (data) => api_componen.post('/', data);
export const putComponen = (id, data) => api_componen.put(`/${id}/`, data);
export const patchComponen = (id, data) => api_componen.patch(`/${id}/`, data);
export const deleteComponen = (id) => api_componen.delete(`/${id}/`);
