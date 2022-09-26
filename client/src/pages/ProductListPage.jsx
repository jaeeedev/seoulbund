import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Filters from "../components/Filters";
import TopBtn from "../components/TopBtn";
import tData from "../tData";
import cupData from "../cupData";

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
  padding: 5px 0 10px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
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

function ProductListPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("new");
  const location = useLocation();
  const pathname = location.pathname.replace("/", "");
  const [currentData, setCurrentData] = useState(tData);

  const newArr =
    currentFilter === "all"
      ? currentData
      : currentData.filter((item) => item.category === currentFilter);

  const sortedArr =
    currentSort === "new"
      ? [...newArr]
      : [...newArr].sort((a, b) => a.price - b.price);
  //sort는 원본배열 변경함 조심 ~~~~

  useEffect(() => {
    if (pathname === "tableware") {
      setCurrentData(tData);
      setCurrentFilter("all");
      setCurrentSort("new");
    } else if (pathname === "cups") {
      setCurrentData(cupData);
      setCurrentFilter("all");
      setCurrentSort("new");
    }
  }, [pathname]);

  function arrayFilter(val) {
    setCurrentFilter(val);
  }

  return (
    <div>
      <Filters
        onClick={arrayFilter}
        current={currentFilter}
        pathname={pathname}
      />
      <ResultBox>
        <ItemCount>
          총 <ItemCountBold>{newArr.length}</ItemCountBold> 개의 제품이
          있습니다.
        </ItemCount>
        <SortBox>
          <SortItem
            onClick={() => {
              setCurrentSort("new");
            }}
            bold={currentSort === "new"}
          >
            최신 등록순
          </SortItem>
          <SortItem
            onClick={() => {
              setCurrentSort("low");
            }}
            bold={currentSort === "low"}
          >
            낮은 가격순
          </SortItem>
        </SortBox>
      </ResultBox>

      <ProductBox>
        {sortedArr.map((el, i) => (
          <ProductItem key={i}>
            <Link to={`/${pathname}/${el.param}`}>
              <div>
                <img src={el.imgSrc} alt={el.title} />
                <ProductTitle>{el.title}</ProductTitle>
                <ProductPrice>{el.price.toLocaleString("kr")}</ProductPrice>
                {el.status === "new" && <Tag bg={"#549391"}>NEW</Tag>}
                {el.status === "best" && <Tag bg={"#c14545"}>BEST</Tag>}
              </div>
            </Link>
          </ProductItem>
        ))}
      </ProductBox>

      <hr style={{ marginTop: "20px" }} />
      <TopBtn />
    </div>
  );
}

export default ProductListPage;
