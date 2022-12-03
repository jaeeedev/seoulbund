import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import ProductListPage from "./pages/ProductListPage";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import MyPage from "./pages/MyPage";
import { useDispatch } from "react-redux";
import app from "./fb";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth(app);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(userActions.nowLogin());
        const userUid = user.uid;
      } else {
        dispatch(userActions.nowLogout());
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cups" element={<ProductListPage />}></Route>
        <Route path="/cups/:title" element={<ProductPage loca={"cups"} />} />
        <Route path="/tableware" element={<ProductListPage />}></Route>
        <Route
          path="/tableware/:title"
          element={<ProductPage loca={"tableware"} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Result />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:user" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
