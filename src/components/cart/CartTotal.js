import styled from "styled-components";

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

const CartTotal = ({ cartData }) => {
  return (
    <TotalContainer>
      <TotalDevide>
        <TotalContent split={true}>
          <h3>총 상품금액</h3>
          <span>
            {cartData
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
            {(
              cartData.reduce((acc, cur) => {
                return acc + cur.price * cur.count;
              }, 0) + 4000
            ).toLocaleString("kr")}
          </h3>
        </TotalResultBox>
      </TotalDevide>
      <BuyBtn>바로 구매</BuyBtn>
    </TotalContainer>
  );
};

export default CartTotal;
