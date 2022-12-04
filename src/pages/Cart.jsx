import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ItemBox from "../components/cart/ItemBox";
import CartTotal from "../components/cart/CartTotal";
import app from "../fb";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
  increment,
  updateDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { getFirestore, onAuthStateChanged } from "firebase/firestore";

const CartSection = styled.section`
  width: 1060px;
  margin: 60px auto;

  .cart_owner {
    margin-bottom: 10px;
  }
`;
const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
`;
const CartWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 30px;
`;
const ItemsContainer = styled.div`
  flex: 1;
`;

const BtnSection = styled.section`
  width: 1060px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
`;

const LinkBtn = styled.button`
  font-size: 16px;
  padding: 8px 25px;
  border: 1px solid #222;
  background: transparent;
  cursor: pointer;

  &:nth-child(2) {
    margin-left: 10px;
  }

  &:active {
    background: #f3f3f3;
  }
`;

function Cart() {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [cartItem, setCartItem] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const getDocByQuery = useCallback(
    async (param) => {
      const q = query(
        collection(db, "cart", userInfo.uid, "items"),
        where("param", "==", param)
      );
      let targetRef = {};
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        targetRef = doc.ref;
      });

      return targetRef;
    },
    [db, userInfo.uid]
  );

  const increaseAmount = useCallback(
    async (param) => {
      //문서 조회 -> 그 문서 업데이트
      try {
        if (userInfo && userInfo.uid) {
          const ref = await getDocByQuery(param);
          await updateDoc(ref, {
            count: increment(1),
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [getDocByQuery, userInfo]
  );
  const decreaseAmount = useCallback(
    async (param) => {
      try {
        if (userInfo && userInfo.uid) {
          const q = query(
            collection(db, "cart", userInfo.uid, "items"),
            where("param", "==", param)
          );
          let targetRef = {};
          let currentCount;
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            targetRef = doc.ref;
            currentCount = doc.data().count;
          });

          if (currentCount <= 1) return;
          await updateDoc(targetRef, {
            count: increment(-1),
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    [db, userInfo]
  );
  async function deleteAll() {
    const docs = await getDocs(collection(db, "cart", userInfo.uid, "items"));
    docs.forEach((doc) => deleteDoc(doc.ref));
    //완료, ref 속성 기억할것
  }

  const deleteItem = useCallback(
    async (param) => {
      //정보 받아서 해당하는 아이템 삭제
      try {
        if (userInfo && userInfo.uid) {
          const ref = await getDocByQuery(param);
          deleteDoc(ref);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [getDocByQuery, userInfo]
  );

  const getCart = useCallback(async () => {
    const cartRef = collection(db, "cart", userInfo.uid, "items");

    onSnapshot(cartRef, (snapshot) => {
      const newCart = snapshot.docs.map((doc) => ({ ...doc.data() }));
      setCartItem(newCart);
    });
  }, [db, userInfo.uid]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          uid: user.uid,
          displayName: user.displayName,
        });
      } else {
        setCartItem([]);
      }
    });

    if (userInfo && userInfo.uid) getCart();
  }, [userInfo.uid, userInfo.displayName]);

  return (
    <div>
      <CartSection>
        <Title>장바구니</Title>
        {userInfo && userInfo.displayName && (
          <p className="cart_owner">
            {userInfo.displayName}님의 장바구니 목록입니다.
          </p>
        )}
        <hr />
        <CartWrapper>
          <ItemsContainer>
            {cartItem.map((item, i) => (
              <ItemBox
                key={item.param}
                item={item}
                i={i}
                increaseAmount={increaseAmount}
                cartData={cartItem}
                decreaseAmount={decreaseAmount}
                deleteItem={deleteItem}
              />
            ))}
          </ItemsContainer>
          <CartTotal cartData={cartItem} />
        </CartWrapper>
      </CartSection>
      <BtnSection>
        <div>
          <LinkBtn onClick={deleteAll}>장바구니 비우기</LinkBtn>
        </div>
        <Link to="/">
          <LinkBtn>쇼핑 계속하기</LinkBtn>
        </Link>
      </BtnSection>
    </div>
  );
}

export default Cart;
