import {makeAutoObservable} from "mobx";
import {makePersistable} from "mobx-persist-store";

class ListStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);

        makePersistable(this, {
            name: "mapItemList",
            properties: ["list"],
            storage: window.localStorage,
        });

    }

    list = []

    activeItem = null;

    addItem = (data) => {
        this.list = [...this.list, data];
        this.setActiveItem(this.list.length - 1)
    };

    deleteItem = (index) => {
        if (index >= 0 && index < this.list.length) {
            this.list.splice(index, 1);
        }
    };

    setActiveItem = (data) => {
        this.activeItem = data
    };
}

export default ListStore;
