import React from "react";
import { rootReducer } from "./rootReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: `storage-pokedex`,
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);