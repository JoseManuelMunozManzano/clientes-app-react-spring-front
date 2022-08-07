import { useCallback, useState } from 'react';

const useInput = (validarValor, longitudMinima = 0) => {
  const [valorInformado, setValorInformado] = useState('');
  const [esTocado, setEsTocado] = useState(false);

  const valorEsValido = validarValor(valorInformado, longitudMinima);
  const hayError = !valorEsValido && esTocado;

  const establecerValor = useCallback((valor) => {
    setValorInformado(valor);
  }, []);

  const valorChangeHandler = (event) => {
    setValorInformado(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setEsTocado(true);
  };

  const reset = () => {
    setValorInformado('');
    setEsTocado('');
  };

  return {
    valor: valorInformado,
    establecerValor,
    esValido: valorEsValido,
    hayError,
    valorChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
