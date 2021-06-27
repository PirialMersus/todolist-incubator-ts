// import {}
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todolists-reducer";
import thunk from "redux-thunk";
import { appReducer } from "./app-reducer";
import {authReducer} from "./auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer,
    authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
