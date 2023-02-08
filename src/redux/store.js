import { createStore,combineReducers } from "redux";

import phonesReducer from "./reducers/phonesReducer";
import categoriesReducer from "./reducers/categoriesReducer";

const rootReducer=combineReducers({
    phonesState:phonesReducer,
    categoriesState:categoriesReducer
})

const store=createStore(rootReducer)

export default store