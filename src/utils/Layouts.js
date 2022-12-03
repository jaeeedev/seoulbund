import styled from "styled-components";

const ProductBox = styled.div`
  width: 1260px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const ProductItem = styled.div`
  position: relative;
  width: 300px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const ProductTitle = styled.h3`
  padding: 0 0 10px 0;
  border-bottom: 1px solid #ccc;
  margin: 10px 0 5px 0px;
  height: 46px;
`;
const ProductPrice = styled.span`
  font-weight: 500;
  &::after {
    content: "원";
    margin-left: 5px;
    font-size: 15px;
  }
`;

const ResultBox = styled.div`
  width: 1260px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const SortBox = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;
const SortItem = styled.span`
  cursor: pointer;
  color: ${(props) => (props.bold ? "black" : "#999")};
  font-size: 14px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;
const ItemCount = styled.p``;
const ItemCountBold = styled.span`
  font-weight: 500;
  color: var(--green);
`;

const Tag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-block;
  padding: 5px 10px;
  background: ${(props) => props.bg};
  color: white;
  border-radius: 1rem;
  font-size: 14px;
`;

const ImgBox = styled.div``;

export {
  ProductBox,
  ProductItem,
  ProductTitle,
  ProductPrice,
  Tag,
  ItemCount,
  ItemCountBold,
  SortBox,
  SortItem,
  ResultBox,
};
