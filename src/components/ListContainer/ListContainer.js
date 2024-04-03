import {useState} from "react";
import {observer} from "mobx-react-lite";
import ListItem from "../ListItem/ListItem";
import BurgerIcon from "../BurgerIcon/BurgerIcon";
import classNames from "classnames";

import styles from './ListContainer.module.scss';
import CSVReaderButtons from "../CSVReaderButtons/CSVReaderButtons";


const ListContainer = observer(({list}) => {

    const [isListOpen, setIsListOpen] = useState(true)


    return (
        <div className={classNames(styles.root, {[styles.closedMenu]: !isListOpen})}>
            <div className={styles.icon} onClick={() => setIsListOpen(!isListOpen)}><BurgerIcon
                isMenuOpen={isListOpen}/>
            </div>

            {isListOpen && (
                <div className={styles.content}>
                    <div className={styles.buttons}>
                        <div className={styles.import}>
                            <CSVReaderButtons/>
                        </div>
                    </div>

                    {list.length ?
                        <div className={styles.items}>
                            {list.map((item, index) => (
                                <ListItem key={index} item={item} index={index}/>
                            ))}
                        </div> : <p className={styles.empty}>Empty</p>}
                </div>
            )}
        </div>
    )
});

export default ListContainer;
