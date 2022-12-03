import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { HiPlus, HiMinus } from "react-icons/hi";
import cupData from "../cupData";
import TopBtn from "../components/TopBtn";
import Popup from "../components/Popup";
import tData from "../tData";
import Recommend from "../components/Recommend";
import app from "../fb";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const OrderBox = styled.div`
  width: 1160px;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  gap: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 50px;
`;
const ItemImg = styled.div`
  width: 400px;
  overflow: hidden;
`;

const OrderTextBox = styled.div`
  flex: 1;
`;
const BtnBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  font-size: ${(props) => (props.fz ? props.fz : "20px")};
  font-weight: ${(props) => (props.fz ? "500" : "400")};
  flex: ${(props) => (props.fz ? 1.5 : "1")};
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background: var(--green);
    color: white;
  }
`;

const ItemTitle = styled.h2`
  margin-bottom: 15px;
`;

const SmallTitle = styled.span`
  display: inline-block;
  margin-right: 20px;
  font-weight: 700;
  padding: 10px;
  font-size: 17px;
  margin-bottom: 10px;
`;
const ItemPrice = styled.span`
  display: inline-block;
  padding: 10px;
`;

const ItemAmountBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemAmountBtn = styled.button`
  padding: 8px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &:active {
    color: white;
    background: var(--green);
    cursor: pointer;
  }
`;
const ItemAmountCount = styled.input`
  height: fit-content;
  padding: 5px;
  width: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 15px;
`;

const CommonSection = styled.section`
  padding: 20px 0;
  width: 1060px;
  margin: 0 auto;
  margin-bottom: 150px;
  height: ${(props) => (props.open ? "5300px" : "500px")};
  text-align: center;
  transition: all 1s;
`;

const TotalPrice = styled.span`
  font-weight: 500;
`;

const OrderDesc = styled.p`
  padding: 7px 10px;
  padding-top: 0px;
  font-size: 13px;
  color: #999;
`;
const ToggleBtn = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  border: none;
  background: var(--green);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  color: white;

  &:active {
    background: #194238;
  }
`;

const ZeroPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  transition: all 0.4s;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
`;

function ProductPage({ loca }) {
  const locaData = loca === "tableware" ? tData : cupData;
  const params = useParams();
  //현재 보고있는 상품정보
  const data = locaData.find((data) => data.param === params.title);
  const navigate = useNavigate();

  //같은 pathname && 카테고리의 상품을 무작위 추천 / 자기 자신은 제외해야함
  const recommendArr = locaData
    .filter((el) => el.category === data.category && el.param !== data.param)
    .sort(() => Math.random() - 0.5)
    .filter((el, i) => i < 4);

  const [count, setCount] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openZeroPopup, setOpenZeroPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore(app);

  function amountUp() {
    setCount((prev) => prev + 1);
  }

  function amountDown() {
    if (count <= 0) return;
    setCount((prev) => prev - 1);
  }

  function openDetail() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const addData = useCallback(async () => {
    //로그인이 안된 경우 로그인 페이지로 넘겨주기

    const itemObj = { ...data, count };
    //이미 데이터베이스에 있으면 수량만 업뎃해서 넘기기

    try {
      if (auth.currentUser) {
        const cartRef = doc(db, "cart", auth.currentUser.uid);

        //이미 데이터베이스에 있는가?
        const q = query(
          collection(db, "cart", auth.currentUser.uid, "items"),
          where("param", "==", data.param)
        );
        let targetRef = {};
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          targetRef = doc.ref;
        });

        const isExist = Object.keys(targetRef).length !== 0;

        if (isExist) {
          //팝업 띄우고 수량만 업데이트 해주기

          await updateDoc(targetRef, {
            count: increment(count),
          });
        } else {
          await addDoc(collection(cartRef, "items"), itemObj);
        }
      } else {
        //로그인이 아닌 경우 이동시켜주기
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }, [auth.currentUser, count, data, db, navigate]);

  const dispatchItem = useCallback(() => {
    if (count !== 0) {
      addData();
      setOpenPopup(true);
    } else {
      setOpenZeroPopup(true);
    }
  }, [addData, count]);

  //페이지 이동 시 스크롤 위로 올려주기
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setOpenZeroPopup(false);
    }, 1500);
  }, [openZeroPopup]);

  return (
    <div>
      <OrderBox>
        <ItemImg>
          <img src={data.imgSrc} alt={data.title} />
        </ItemImg>
        <OrderTextBox>
          <ItemTitle>{data.title}</ItemTitle>
          <hr />
          <SmallTitle>판매가</SmallTitle>
          <ItemPrice>{data.price.toLocaleString("kr")}</ItemPrice>

          <ItemAmountBox>
            <SmallTitle>구매수량</SmallTitle>
            <ItemAmountBtn onClick={amountDown}>
              <HiMinus />
            </ItemAmountBtn>
            <ItemAmountCount value={count} readOnly />
            <ItemAmountBtn onClick={amountUp}>
              <HiPlus />
            </ItemAmountBtn>
          </ItemAmountBox>
          <SmallTitle>총상품금액</SmallTitle>
          <TotalPrice>
            {(count * data.price).toLocaleString("kr")} 원
          </TotalPrice>
          <br />
          <OrderDesc>
            배송은 주문 일 기준 7일 이내로 이뤄지며 주문제작 상품의 경우 7일
            이상 소요 될 수 있습니다.
          </OrderDesc>
          <OrderDesc>제품 파손의 경우 1:1 문의를 이용해 주세요.</OrderDesc>
          <hr style={{ marginTop: "10px" }} />
          <BtnBox>
            <Button>
              <MdFavoriteBorder />
            </Button>
            <Button onClick={dispatchItem}>
              <MdOutlineShoppingCart />
            </Button>
            <Button fz="16px">구매하기</Button>
          </BtnBox>
        </OrderTextBox>
      </OrderBox>

      <CommonSection open={open}>
        <h2>{data.title}</h2>
        <img src="/imgs/common.jpg" alt="공통 사진" />
        <ToggleBtn onClick={openDetail}>{open ? "닫기" : "펼치기"}</ToggleBtn>
      </CommonSection>

      <Recommend recommendData={recommendArr} loca={loca} />

      {openPopup && <Popup openHanlder={setOpenPopup} />}
      {openZeroPopup && <ZeroPopup>수량을 한 개 이상 선택해주세요.</ZeroPopup>}
      <TopBtn />
    </div>
  );
}

export default ProductPage;
