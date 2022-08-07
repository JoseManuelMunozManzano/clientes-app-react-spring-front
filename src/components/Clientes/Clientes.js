import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cliente from './Cliente';
import { Link } from 'react-router-dom';
import * as apiCalls from '../../api/apiCalls';
// import { formatTheDate } from '../../utils/utils';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // apiCalls.getClientes().subscribe((clients) => setClientes(clients));
    apiCalls.getClientes().then((response) => {
      // const clientesMap = response.data.map((cli) => {
      //   cli.nombre = cli.nombre.toUpperCase();
      //   cli.createAt = formatTheDate(cli.createAt);
      //   return cli;
      // });
      // setClientes(clientesMap);
      setClientes(response.data);
    });
  }, []);

  const deleteHandler = (cliente) => {
    Swal.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        apiCalls
          .deleteCliente(cliente.id)
          .then((response) => {
            const clientesFiltrados = clientes.filter((cli) => cli.id !== cliente.id);
            setClientes(clientesFiltrados);
            Swal.fire('Cliente Eliminado!', `Cliente ${cliente.nombre} eliminado con éxito`, 'success');
          })
          .catch((e) => {
            console.error(e.response.data.mensaje);
            Swal.fire(e.response.data.mensaje, e.response.data.error, 'error');
          });
      }
    });
  };

  return (
    <div className="card border-primary mb-3">
      <div className="card-header">Clientes</div>
      <div className="card-body text-primary">
        <h5 className="card-title">Listado de clientes</h5>

        <div className="my-2 text-left">
          <Link to="/clientes/form">
            <button type="button" className="btn btn-rounded btn-primary">
              Crear Cliente
            </button>
          </Link>
        </div>

        {clientes.length > 0 ? (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>nombre</th>
                <th>apellido</th>
                <th>email</th>
                <th>fecha</th>
                <th>editar</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <Cliente key={cliente.id} cliente={cliente} onDelete={deleteHandler} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info">No hay registros en la base de datos!</div>
        )}
      </div>
    </div>
  );
};

export default Clientes;
