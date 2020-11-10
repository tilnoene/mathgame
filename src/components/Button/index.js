import React from 'react'

import style from './styles.css'

const Button = ({ styles, onClick, title, disabled=false }) => {
    if(disabled) styles += ' disabled';
    else styles += ' activated';

    return (
      <button className={styles} onClick={onClick}>{title}</button>
    );
};

export default Button;