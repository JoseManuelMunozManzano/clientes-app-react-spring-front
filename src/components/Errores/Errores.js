import React from 'react';

const Errores = (props) => {
  return (
    <ul className="alert alert-danger">
      {props.errores.map((err) => (
        <li key={err}>{err}</li>
      ))}
    </ul>
  );
};

export default Errores;
