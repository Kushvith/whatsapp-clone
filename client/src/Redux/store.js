import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk} from "redux-thunk"
import { authReducer } from "./Auth/Redux"
import { chatReducer } from "./Chat/redux"
import { messageReducer } from "./Message/redux"
const rootReducer = combineReducers({
    auth:authReducer,
    chat:chatReducer,
    message:messageReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))