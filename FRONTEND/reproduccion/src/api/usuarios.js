import axios from 'axios';

const api_personas = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/usuario/personas/',
});

export const getPersonas = () => api_personas.get('/');
export const getPersona = (id) => api_personas.get(`/${id}/`);
export const postPersona = (data) => api_personas.post('/', data);
export const putPersona = (id, data) => api_personas.put(`/${id}/`, data);
export const patchPersona = (id, data) => api_personas.patch(`/${id}/`, data);
export const deletePersona = (id) => api_personas.delete(`/${id}/`);

const api_usuarios = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/usuario/usuarios/',
});

export const getUsuarios = () => api_usuarios.get('/');
export const getUsuario = (id) => api_usuarios.get(`/${id}/`);
export const postUsuario = (data) => api_usuarios.post('/', data);
export const putUsuario = (id, data) => api_usuarios.put(`/${id}/`, data);
export const patchUsuario = (id, data) => api_usuarios.patch(`/${id}/`, data);
export const deleteUsuario = (id) => api_usuarios.delete(`/${id}/`);
