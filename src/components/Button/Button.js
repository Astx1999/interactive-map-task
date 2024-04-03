import React from 'react';
import classnames from "classnames";
import styles from './Button.module.scss'

const Button = ({text, onClick, type = "primary"}) => {
    return (
        <div
            className={classnames(styles.root, {[styles[type]]: styles[type]})}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

export default Button;