import {useState} from 'react';
import classNames from "classnames";
import styles from './BurgerIcon.module.scss';

const BurgerIcon = ({isMenuOpen}) => {

    return (
        <div className={classNames(styles.burgerMenu, {[styles.open]: isMenuOpen})}>
            <span/>
            <span/>
            <span/>
            <span/>
        </div>
    );
};

export default BurgerIcon;
