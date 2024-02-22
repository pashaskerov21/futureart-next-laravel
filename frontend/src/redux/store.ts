import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";
import { thunk } from "redux-thunk";

const store = createStore(RootReducer, applyMiddleware(thunk));

export default store;

