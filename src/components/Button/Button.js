import React from 'react';
import classnames from "classnames";
import styles from './Button.module.scss'

const Button = ({type, text, onClick, version = "primary", className}) => {
    return (
        <button
            type={type}
            className={classnames(className, styles.root, {[styles[version]]: styles[version]})}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;