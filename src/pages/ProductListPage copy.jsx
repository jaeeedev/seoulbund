import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Filters from "../components/Filters";
import TopBtn from "../components/TopBtn";
import tData from "../tData";
import cupData from "../cupData";
import {
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
} from "../utils/Layouts";

function ProductListPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("new");
  const location = useLocation();
  const pathname = location.pathname.replace("/", "");
  const [currentData, setCurrentData] = useState(tData);

  const [amount, setAmount] = useState(8);
  const ioRef = useRef(null);

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
      <p ref={ioRef}>관찰 지점</p>

      <TopBtn />
    </div>
  );
}

export default ProductListPage;
