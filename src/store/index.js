import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const initialState = {
  items: [],
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const index = state.items.findIndex(
        (item) => item.param === action.payload.param
      );
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items[index].count += action.payload.count;
      }
    },
    deleteItem(state) {
      state.items = state.items.filter((item) => item.checked === false);
    },

    setCart(state, action) {
      state.items = action.payload;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    //로그인 할 시 state.isLloggedIn을 true로 만들고 로그아웃때 그 반대로 하면됨
    nowLogin(state) {
      state.isLoggedIn = true;
    },

    nowLogout(state) {
      state.isLoggedIn = false;
    },
  },
});

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
});

const persistRed = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistRed,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export default store;
