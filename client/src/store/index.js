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
    deleteAll(state) {
      state.items = [];
    },
    increaseAmount(state, action) {
      //페이로드 인덱스로 줘서 해당하는 부분에 카운트 변경, 카트 페이지에서만 동작
      state.items[action.payload].count++;
    },
    decreaseAmount(state, action) {
      if (state.items[action.payload].count <= 1) return;
      state.items[action.payload].count--;
    },
    toggleCheck(state, action) {
      state.items[action.payload].checked =
        !state.items[action.payload].checked;
    },
    toggleAll(state, action) {
      //체크올 상태가 페이로드, true일때 누르면 체크박스 전부 false 만들고 false면 반대로
      if (action.payload) {
        for (let i = 0; i < state.items.length; i++) {
          state.items[i].checked = false;
        }
      } else {
        for (let i = 0; i < state.items.length; i++) {
          state.items[i].checked = true;
        }
      }
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
