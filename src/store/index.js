// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk'
import { configureStore } from "@reduxjs/toolkit";
import heroes from "./slices/HeroSlice";
import filters from "./slices/FiltersSlice";

const store = configureStore({
  reducer: { heroes, filters },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
})

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(stringMiddleware,thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;