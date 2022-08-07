import axios from 'axios';
// import { CLIENTES } from '../data/clientes.json';
//import { Observable, of } from 'rxjs';

export const getClientes = () => {
  // return of(axios.get('/api/clientes'));
  return axios.get('/api/clientes');
};

export const create = (cliente) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  return axios.post('/api/clientes', cliente);
};

export const getCliente = (id) => {
  return axios.get(`/api/clientes/${id}`);
};

export const update = (cliente) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  return axios.put(`/api/clientes/${cliente.id}`, cliente);
};

export const deleteCliente = (id) => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  return axios.delete(`/api/clientes/${id}`);
};
