import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';

import Topbar from './components/Layout/Topbar';
import Inicio from './components/Layout/Inicio';
import Directiva from './components/Directiva/Directiva';
import Clientes from './components/Clientes/Clientes';
import Footer from './components/Layout/Footer';
import ClienteForm from './components/Clientes/ClienteForm';

const App = () => {
  const [habilitar, setHabilitar] = useState(true);

  const autor = { nombre: 'José Manuel', apellido: 'Muñoz Manzano' };
  const listaCurso = ['TypeScript', 'JavaScript', 'Java', 'C#', 'PHP'];

  const onClickHabilitarHandler = () => {
    setHabilitar((previousHabilitar) => !previousHabilitar);
  };

  return (
    <>
      <Topbar title="App React" />
      <div className={`container my-3 ${styles['wrap']}`}>
        {/* <Inicio title="Bienvenido a React" /> */}
        <Switch>
          <Route
            exact
            path="/directivas"
            component={(props) => (
              <Directiva
                title="Listado de cursos"
                listaCurso={listaCurso}
                onClickHabilitar={onClickHabilitarHandler}
                habilitar={habilitar}
              />
            )}
          />
          <Route exact path="/clientes" component={Clientes} />
          <Route exact path="/clientes/form" component={(props) => <ClienteForm titulo="Crear Cliente" />} />
          <Route exact path="/clientes/form/:id" component={(props) => <ClienteForm titulo="Crear Cliente" />} />

          <Redirect to="/clientes" />
        </Switch>
      </div>
      <Footer autor={autor} />
    </>
  );
};

export default App;
