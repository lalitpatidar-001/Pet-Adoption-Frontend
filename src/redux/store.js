import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist"
import petReducer from "./slices/petSlice";
import requestReducer from "./slices/requestSlice";
import applicantReducer from "./slices/applicantSlice";
import chatReducer from "./slices/chatSlice";
import messageReducer from "./slices/messageSlice";
import wishlistReducer from "./slices/wishlistSlice";


const rootReducer = combineReducers({
    pet: petReducer,
    request: requestReducer,
    applicant: applicantReducer,
    chat: chatReducer,
    message: messageReducer,
    wishlist:wishlistReducer
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    blacklist: ["pet"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlewate) => getDefaultMiddlewate({
        serializableCheck: false,
        immutableCheck: false
    }),
});

const persistor = persistStore(store);

export { store, persistor }