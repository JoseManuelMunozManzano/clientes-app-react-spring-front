import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as apiCalls from '../../api/apiCalls';
import useInput from '../../hooks/use-input';
import { isEmail, isNotEmpty, minimumLength } from '../../utils/utils';

// Otra forma usando blur y errores más dinámicos
const ClienteForm = (props) => {
  const {
    valor: enteredNombre,
    establecerValor: establecerValorNombre,
    esValido: nombreEsValido,
    hayError: nombreTieneError,
    valorChangeHandler: onChangeNombreHandler,
    inputBlurHandler: onBlurNombreHandler,
    reset: resetNombre,
  } = useInput(minimumLength, 4);

  const {
    valor: enteredApellido,
    establecerValor: establecerValorApellido,
    esValido: apellidoEsValido,
    hayError: apellidoTieneError,
    valorChangeHandler: onChangeApellidoHandler,
    inputBlurHandler: onBlurApellidoHandler,
    reset: resetApellido,
  } = useInput(isNotEmpty);

  const {
    valor: enteredMail,
    establecerValor: establecerValorMail,
    esValido: mailEsValido,
    hayError: mailTieneError,
    valorChangeHandler: onChangeMailHandler,
    inputBlurHandler: onBlurMailHandler,
    reset: resetMail,
  } = useInput(isEmail);

  const history = useHistory();
  const { id } = useParams();

  let formEsValido = false;
  if (nombreEsValido && apellidoEsValido && mailEsValido) {
    formEsValido = true;
  }

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

    if (!formEsValido) {
      return;
    }

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
          console.error(e.response.data.mensaje);
          Swal.fire(e.response.data.mensaje, e.response.data.error, 'error');
        });
    }
  };

  const resetValores = () => {
    resetNombre();
    resetApellido();
    resetMail();
  };

  return (
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
              {nombreTieneError && (
                <div className="alert alert-danger">
                  <div>Nombre debe tener al menos 4 caracteres</div>
                </div>
              )}
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
              {apellidoTieneError && (
                <div className="alert alert-danger">
                  <div>Apellido es requerido</div>
                </div>
              )}
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
              {mailTieneError && (
                <div className="alert alert-danger">
                  <div>Email debe tener un formato válido</div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-6">
              <button disabled={!formEsValido} className="btn btn-primary">
                {id ? 'Editar' : 'Crear'}
              </button>
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
  );
};

export default ClienteForm;
