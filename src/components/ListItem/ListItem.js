import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {RootStoreContext} from "../../stores/RootStore";
import classnames from "classnames";
import CrossIcon from "../CrossIcon/CrossIcon";
import styles from './ListItem.module.scss';


const ListItem = observer(({item, index}) => {

    const {
        listStore: {
            setActiveItem,
            activeItem,
            deleteItem,
            list
        }
    } = useContext(RootStoreContext)

    const isActive = activeItem && activeItem.lat === item.lat && activeItem.lng === item.lng;

    const handleDelete = (event) => {
        event.stopPropagation();
        if (isActive) {
            setActiveItem(null);
        }
        deleteItem(index);
    }

    return (
        <div className={classnames(styles.root, {[styles.active]: isActive})} onClick={() => {
            setActiveItem(item)
        }}>
            <div>
                <p className={styles.lat}>Lat: {item.lat}</p>
                <p className={styles.lng}>Lng: {item.lng}</p>
            </div>
            <CrossIcon type="secondary" onClick={handleDelete}/>
        </div>
    );
});

export default ListItem;
