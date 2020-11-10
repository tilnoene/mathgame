import React from 'react';

import "./styles.css";

const Input = ( {styles} ) => {
    return (
      <input type="text" inputMode="numeric" id="user-answer" className={styles} /> 
    );
};

export default Input;