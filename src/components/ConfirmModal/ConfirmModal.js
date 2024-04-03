import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import classNames from "classnames";
import styles from './ConfirmModal.module.scss'

const ConfirmModal = ({isOpen, isPortal = false, question, handleAddLocation, handleClosePopup, confirmText = "Yes", rejectText = "No", className}) => {
    if (!isOpen) return null;

    const modalContent = (
        <div className={classNames({[styles.overlay]: isPortal})}
             onClick={(e) => {
                 e.stopPropagation();
                 handleClosePopup()
             }}>
            <div className={className}>
                <p>{question}</p>
                <div className={styles.buttons}>
                    <Button onClick={handleAddLocation} text={confirmText}/>
                    <Button onClick={handleClosePopup} version="secondary" text={rejectText}/>
                </div>
            </div>
        </div>

    );

    if (isPortal) {
        return ReactDOM.createPortal(modalContent, document.body);
    } else {
        return modalContent;
    }
};

export default ConfirmModal;