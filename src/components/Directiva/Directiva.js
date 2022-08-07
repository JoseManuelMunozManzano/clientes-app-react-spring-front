import React from 'react';
import Button from '../UI/Button';
import CursoItem from '../UI/CursoItem';

const Directiva = (props) => {
  return (
    <>
      <Button styles="btn btn-primary my-3" onClick={props.onClickHabilitar}>
        {props.habilitar ? 'Ocultar' : 'Mostrar'}
      </Button>
      <div className="card">
        <div className="card-header">{props.title}</div>

        {props.habilitar && (
          <ul className="list-group">
            {props.listaCurso.map((curso) => (
              <CursoItem key={curso} title={curso} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Directiva;
