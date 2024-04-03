import GoogleMapComponent from "./components/GoogleMap/GoogleMap";
import ListContainer from "./components/ListContainer/ListContainer";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {RootStoreContext} from "./stores/RootStore";

import styles from "./App.module.scss"


const App = observer(() => {
    const {
        listStore: {list}
    } = useContext(RootStoreContext)

    return (
        <div className={styles.root}>
            <GoogleMapComponent/>
            <div className={styles.list}>
                <ListContainer list={list}/>
            </div>
        </div>
    );
})

export default App;
