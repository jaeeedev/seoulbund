import { HiPlus, HiMinus } from "react-icons/hi";
import { MdOutlineClear } from "react-icons/md";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .delete_btn {
    font-size: 21px;
  }
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

const ItemBox = ({ item, increaseAmount, decreaseAmount, deleteItem }) => {
  return (
    <ItemContainer>
      <div>
        <button onClick={() => deleteItem(item.param)}>
          <MdOutlineClear className="delete_btn" />
        </button>
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
              decreaseAmount(item.param);
            }}
          >
            <HiMinus />
          </ItemAmountBtn>
          <ItemAmount value={item.count} readOnly />
          <ItemAmountBtn
            onClick={() => {
              increaseAmount(item.param);
            }}
          >
            <HiPlus />
          </ItemAmountBtn>
        </ItemAmountBox>
        <ItemPrice>{(item.count * item.price).toLocaleString("kr")}</ItemPrice>
      </ItemBoxInfoBox>
    </ItemContainer>
  );
};

export default ItemBox;
