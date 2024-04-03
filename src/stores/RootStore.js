import { createContext } from "react";

import ListStore from "./ListStore";

export class RootStore {
    listStore = new ListStore(this);
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);
