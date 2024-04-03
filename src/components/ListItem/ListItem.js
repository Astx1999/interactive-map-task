import React, {useState, useContext} from "react"
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../stores/RootStore";
import classnames from "classnames";
import CrossIcon from "../CrossIcon/CrossIcon";
import styles from './ListItem.module.scss';
import ConfirmModal from "../ConfirmModal/ConfirmModal";


const ListItem = observer(({item, index}) => {

    const [IsModalOpen, setIsModalOpen] = useState(false)

    const {
        listStore: {
            setActiveItem,
            activeItem,
            deleteItem,
        }
    } = useContext(RootStoreContext)

    const isActive = activeItem && activeItem.lat === item.lat && activeItem.lng === item.lng;

    const handleDeleteModal = (event) => {
        setIsModalOpen(true)
        event.stopPropagation();
    }

    const handleDelete = (event) => {
        if (isActive) {
            setActiveItem(null);
        }
        deleteItem(index);
        handleCloseModal()
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className={classnames(styles.root, {[styles.active]: isActive})} onClick={() => {
            setActiveItem(item)
        }}>
            <div>
                <p className={styles.lat}>Lat: {item.lat}</p>
                <p className={styles.lng}>Lng: {item.lng}</p>
            </div>
            <CrossIcon type="secondary" onClick={handleDeleteModal}/>

            <ConfirmModal
                isOpen={IsModalOpen}
                isPortal
                className={styles.modal}
                question="Do you want to delete the location?"
                handleAddLocation={handleDelete}
                handleClosePopup={handleCloseModal}
            />

        </div>
    );
});

export default ListItem;
