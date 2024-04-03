import React from 'react';
import Button from '../Button/Button';
import styles from './ConfirmModal.module.scss'

const ConfirmModal = ({question, handleAddLocation, handleClosePopup}) => {
    return (
        <div>
            <p>{question}</p>
            <div className={styles.buttons}>
                <Button onClick={handleAddLocation} text={"Add"}/>
                <Button onClick={handleClosePopup} type="secondary" text={"Cancel"}/>
            </div>
        </div>
    );
};

export default ConfirmModal;