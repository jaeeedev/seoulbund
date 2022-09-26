import styled from "styled-components";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartSection = styled.section`
  width: 1060px;
  margin: 60px auto;
`;
const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
`;
const SelectAllLabel = styled.label`
  display: inline-block;
  font-weight: 500;
  margin-bottom: 10px;
`;
const SelectAllCb = styled.input`
  margin-left: 5px;
  transform: translateY(1px);
  accent-color: var(--green);
`;
const CartWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 30px;
`;
const ItemsContainer = styled.div`
  flex: 1;
`;
const TotalContainer = styled.div`
  position: relative;
  width: 300px;
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 40px;
`;
const TotalDevide = styled.div`
  padding: 20px;
`;
const TotalContent = styled.div`
  display: flex;
  justify-content: ${(props) => (props.split ? "space-between" : "flex-end")};
  padding: 5px 0;
`;
const TotalResultBox = styled(TotalContent)``;

const BuyBtn = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 20px;
  background: var(--green);
  color: white;
  cursor: pointer;
  border: none;
  font-size: 17px;

  &:active {
    background: #194238;
  }
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;
`;
const ItemCheckBox = styled.input`
  transform: translateY(1px);
  accent-color: var(--green);
`;
const ItemBoxInfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ItemImgTitleBox = styled.div`
  display: flex;
  gap: 20px;
`;

const ItemImg = styled.div`
  width: 120px;
  overflow: hidden;
`;
const ItemTitle = styled.h4`
  font-size: 17px;
  padding: 8px 0;
`;
const ItemAmountBox = styled.div`
  display: flex;
`;
const ItemPrice = styled.span`
  font-weight: 600;
  padding: 8px 0;
  min-width: 80px;
`;
const ItemAmount = styled.input`
  width: 40px;
  height: 34px;
  border: none;
  background: white;
  text-align: center;
  font-size: 18px;
`;
const ItemAmountBtn = styled.button`
  padding: 8px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 18px;
  background: white;
  color: #999;
  &:active {
    color: var(--green);
    cursor: pointer;
  }
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
  const [checkAll, setCheckAll] = useState(false);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items);

  function increaseAmount(index) {
    dispatch(cartActions.increaseAmount(index));
  }
  function decreaseAmount(index) {
    dispatch(cartActions.decreaseAmount(index));
  }

  function deleteAll() {
    dispatch(cartActions.deleteAll());
  }

  function toggleCheck(i) {
    dispatch(cartActions.toggleCheck(i));
  }

  function toggleAll() {
    dispatch(cartActions.toggleAll(checkAll));
  }

  function deleteItem() {
    dispatch(cartActions.deleteItem());
  }

  useEffect(() => {
    if (cartData.filter((data) => data.checked === false).length === 0) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkAll, cartData]);

  return (
    <div>
      <CartSection>
        <Title>장바구니</Title>
        <SelectAllLabel>
          전체선택
          <SelectAllCb
            type="checkbox"
            checked={checkAll}
            readOnly
            onChange={toggleAll}
          />
        </SelectAllLabel>
        <hr />
        <CartWrapper>
          <ItemsContainer>
            {cartData.map((item, i) => (
              <ItemBox key={item.param}>
                <div>
                  <ItemCheckBox
                    type="checkbox"
                    data-index={i}
                    onChange={() => {
                      toggleCheck(i);
                    }}
                    readOnly
                    checked={cartData[i].checked}
                  />
                </div>
                <ItemBoxInfoBox>
                  <ItemImgTitleBox>
                    <ItemImg>
                      <img src={item.imgSrc} alt={item.title} />
                    </ItemImg>
                    <ItemTitle>{item.title}</ItemTitle>
                  </ItemImgTitleBox>

                  <ItemAmountBox>
                    <ItemAmountBtn
                      onClick={() => {
                        decreaseAmount(i);
                      }}
                    >
                      <HiMinus />
                    </ItemAmountBtn>
                    <ItemAmount value={item.count} readOnly />
                    <ItemAmountBtn
                      onClick={() => {
                        increaseAmount(i);
                      }}
                    >
                      <HiPlus />
                    </ItemAmountBtn>
                  </ItemAmountBox>
                  <ItemPrice>
                    {(item.count * item.price).toLocaleString("kr")}
                  </ItemPrice>
                </ItemBoxInfoBox>
              </ItemBox>
            ))}
          </ItemsContainer>
          <TotalContainer>
            <TotalDevide>
              <TotalContent split={true}>
                <h3>총 상품금액</h3>
                <span>
                  {cartData
                    .filter((data) => data.checked)
                    .reduce((acc, cur) => {
                      return acc + cur.price * cur.count;
                    }, 0)
                    .toLocaleString("kr")}
                </span>
              </TotalContent>
              <TotalContent>
                <span>+ 4000</span>
              </TotalContent>
            </TotalDevide>
            <TotalDevide>
              <TotalResultBox split={true}>
                <h3>결제 예정 금액</h3>
                <h3>
                  {
                    //체크 된 요소 합계만 보여줘야함
                    (
                      cartData
                        .filter((data) => data.checked)
                        .reduce((acc, cur) => {
                          return acc + cur.price * cur.count;
                        }, 0) + 4000
                    ).toLocaleString("kr")
                  }
                </h3>
              </TotalResultBox>
            </TotalDevide>
            <BuyBtn>바로 구매</BuyBtn>
          </TotalContainer>
        </CartWrapper>
      </CartSection>
      <BtnSection>
        <div>
          <LinkBtn onClick={deleteAll}>장바구니 비우기</LinkBtn>
          <LinkBtn onClick={deleteItem}>선택제품 삭제</LinkBtn>
        </div>
        <Link to="/">
          <LinkBtn>쇼핑 계속하기</LinkBtn>
        </Link>
      </BtnSection>
    </div>
  );
}

export default Cart;
