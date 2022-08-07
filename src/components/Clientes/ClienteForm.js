import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as apiCalls from '../../api/apiCalls';
import useInput from '../../hooks/use-input';
import { isEmail, isNotEmpty, minimumLength } from '../../utils/utils';
import Errores from '../Errores/Errores';

const ClienteForm = (props) => {
  const {
    valor: enteredNombre,
    establecerValor: establecerValorNombre,
    valorChangeHandler: onChangeNombreHandler,
    inputBlurHandler: onBlurNombreHandler,
    reset: resetNombre,
  } = useInput(minimumLength, 4);

  const {
    valor: enteredApellido,
    establecerValor: establecerValorApellido,
    valorChangeHandler: onChangeApellidoHandler,
    inputBlurHandler: onBlurApellidoHandler,
    reset: resetApellido,
  } = useInput(isNotEmpty);

  const {
    valor: enteredMail,
    establecerValor: establecerValorMail,
    valorChangeHandler: onChangeMailHandler,
    inputBlurHandler: onBlurMailHandler,
    reset: resetMail,
  } = useInput(isEmail);

  const [errores, setErrores] = useState('');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      apiCalls
        .getCliente(id)
        .then((response) => {
          establecerValorNombre(response.data.nombre);
          establecerValorApellido(response.data.apellido);
          establecerValorMail(response.data.email);
        })
        .catch((e) => {
          console.error(e.response.data.mensaje);
          Swal.fire('Error al editar', e.response.data.mensaje, 'error');
          history.push('/clientes');
        });
    }
  }, [id, history, establecerValorNombre, establecerValorApellido, establecerValorMail]);

  const onSubmitFormHandler = (event) => {
    event.preventDefault();

    const body = {
      id,
      nombre: enteredNombre.trim().length > 0 ? enteredNombre.trim() : null,
      apellido: enteredApellido.trim().length > 0 ? enteredApellido.trim() : null,
      email: enteredMail.trim().length > 0 ? enteredMail.trim() : null,
    };

    if (!id) {
      apiCalls
        .create(body)
        .then((response) => {
          resetValores();
          history.push('/clientes');
          Swal.fire('Nuevo cliente', `${response.data.mensaje}: ${response.data.cliente.nombre}`, 'success');
        })
        .catch((e) => {
          if (e.response.status === 400) {
            console.log('Código de error desde el backend: ' + e.response.status);
            console.log(e.response.data.errors);
            setErrores(e.response.data.errors);
            return;
          }
          console.error(e);
          Swal.fire(e.response.data.mensaje, e.response.data.error, 'error');
        });
    } else {
      apiCalls
        .update(body)
        .then((response) => {
          resetValores();
          history.push('/clientes');
          Swal.fire('Actualizado cliente', `${response.data.mensaje}: ${response.data.cliente.nombre}`, 'success');
        })
        .catch((e) => {
          if (e.response.status === 400) {
            console.log('Código de error desde el backend: ' + e.response.status);
            console.log(e.response.data.errors);
            setErrores(e.response.data.errors);
            return;
          }
          console.error(e.response.data.mensaje);
          Swal.fire(e.response.data.mensaje, e.response.data.error, 'error');
        });
    }
  };

  const resetValores = () => {
    resetNombre();
    resetApellido();
    resetMail();

    setErrores('');
  };

  return (
    <>
      {errores && <Errores errores={errores} />}

      <div className="card bg-dark text-white">
        <div className="card-header">{props.titulo}</div>
        <div className="card-body">
          <form onSubmit={onSubmitFormHandler}>
            <div className="form-group row">
              <label htmlFor="nombre" className="col-form-label col-sm-2">
                Nombre
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={enteredNombre}
                  onChange={onChangeNombreHandler}
                  onBlur={onBlurNombreHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="apellido" className="col-form-label col-sm-2">
                Apellido
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  value={enteredApellido}
                  onChange={onChangeApellidoHandler}
                  onBlur={onBlurApellidoHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="mail" className="col-form-label col-sm-2">
                Mail
              </label>
              <div className="col-sm-6">
                <input
                  type="mail"
                  className="form-control"
                  id="mail"
                  value={enteredMail}
                  onChange={onChangeMailHandler}
                  onBlur={onBlurMailHandler}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-6">
                <button className="btn btn-primary">{id ? 'Editar' : 'Crear'}</button>
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => {
                    resetValores();
                    history.push('/clientes');
                  }}
                >
                  Volver
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClienteForm;
