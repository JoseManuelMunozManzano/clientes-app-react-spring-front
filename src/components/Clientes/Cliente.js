import React from 'react';
import { Link } from 'react-router-dom';
import { formatTheDate } from '../../utils/utils';

const Cliente = (props) => {
  return (
    <tr>
      <td>{props.cliente.id}</td>
      <td>{props.cliente.nombre.toUpperCase()}</td>
      <td>{props.cliente.apellido.toUpperCase()}</td>
      <td>{props.cliente.email}</td>
      <td>{formatTheDate(props.cliente.createAt)}</td>
      <td>
        <Link to={`/clientes/form/${props.cliente.id}`}>
          <button type="button" name="editar" className="btn btn-primary">
            editar
          </button>
        </Link>
      </td>
      <td>
        <button type="button" name="eliminar" className="btn btn-danger" onClick={() => props.onDelete(props.cliente)}>
          eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
