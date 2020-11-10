import React from 'react';

import "./styles.css";

const PrintQuestion = ( {question} ) => {
    return (
        <div className="expression">
            <p>{question.a} {question.operation} {question.b} = </p>
        </div>
    );
};

export default PrintQuestion;