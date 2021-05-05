// import {}
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})
export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;