import React from 'react';
import { combineReducers } from "@reduxjs/toolkit";
import detailReducer from './slice/detail';
import mylistReducer from './slice/mylist';

export const rootReducer = combineReducers({        
    detail: detailReducer,
    mylist: mylistReducer
});