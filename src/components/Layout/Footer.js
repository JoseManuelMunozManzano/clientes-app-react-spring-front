import React from 'react';
import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer className={`bg-dark rounded-top text-center ${styles['footer']}`}>
      <div className="container py-2">
        <p className="text-white my-2">
          &copy; {props.autor.nombre} {props.autor.apellido}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
