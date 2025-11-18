import axios from 'axios';

const api_audios = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/produccion/audios/',
});

export const getAudios = () => api_audios.get('/');
export const getAudio = (id) => api_audios.get(`/${id}/`);
export const postAudio = (data) => api_audios.post('/', data);
export const putAudio = (id, data) => api_audios.put(`/${id}/`, data);
export const patchAudio = (id, data) => api_audios.patch(`/${id}/`, data);
export const deleteAudio = (id) => api_audios.delete(`/${id}/`);

const api_canciones = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/produccion/canciones/',
});

export const getCanciones = () => api_canciones.get('/');
export const getCancion = (id) => api_canciones.get(`/${id}/`);
export const postCancion = (data) => api_canciones.post('/', data);
export const putCancion = (id, data) => api_canciones.put(`/${id}/`, data);
export const patchCancion = (id, data) => api_canciones.patch(`/${id}/`, data);
export const deleteCancion = (id) => api_canciones.delete(`/${id}/`);

const api_podcast = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/produccion/podcasts/',
});

export const getPodcasts = () => api_podcast.get('/');
export const getPodcast = (id) => api_podcast.get(`/${id}/`);
export const postPodcast = (data) => api_podcast.post('/', data);
export const putPodcast = (id, data) => api_podcast.put(`/${id}/`, data);
export const patchPodcast = (id, data) => api_podcast.patch(`/${id}/`, data);
export const deletePodcast = (id) => api_podcast.delete(`/${id}/`);


const api_artistas = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/produccion/artistas/',
});

export const getArtistas = () => api_artistas.get('/');
export const getArtista = (id) => api_artistas.get(`/${id}/`);
export const postArtista = (data) => api_artistas.post('/', data);
export const putArtista = (id, data) => api_artistas.put(`/${id}/`, data);
export const patchArtista = (id, data) => api_artistas.patch(`/${id}/`, data);
export const deleteArtista = (id) => api_artistas.delete(`/${id}/`);

