import {observer} from "mobx-react-lite";
import ListItem from "../ListItem/ListItem";
import CrossIcon from "../CrossIcon/CrossIcon";
import styles from './ListContainer.module.scss';
import {useState} from "react";
import BurgerIcon from "../BurgerIcon/BurgerIcon";


const ListContainer = observer(({list}) => {

    const [isListOpen, setIsListOpen] = useState(true)


    return isListOpen ? (

        <div className={styles.root}>
            <div className={styles.icon} onClick={() => setIsListOpen(!isListOpen)}><BurgerIcon
                isMenuOpen={isListOpen}/>
            </div>
            {list.length ?
                <div className={styles.items}>
                    {list.map((item, index) => (
                        <ListItem key={index} item={item} index={index}/>
                    ))}
                </div> : <p className={styles.empty}>Empty</p>}
        </div>
    ) : (
        <div className={styles.closedMenu}>
            <div className={styles.icon} onClick={() => setIsListOpen(!isListOpen)}><BurgerIcon
                isMenuOpen={isListOpen}/>
            </div>
        </div>
    );
});

export default ListContainer;
