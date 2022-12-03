import styled from "styled-components";
import Skeleton from "../components/Skeleton";
import { useState, useEffect } from "react";
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

const Blank = styled.div`
  height: 100px;
`;

function Test() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/data");
      const data = await response.json();

      setData(data);
      setIsLoading(false);
    };

    setTimeout(() => {
      fetchData();
    }, 1500);
  });

  return (
    <div>
      <Blank />
      {isLoading && <Skeleton />}

      {data.length !== 0 && (
        <ProductBox>
          {data.map((el, i) => (
            <ProductItem key={i}>
              <div>
                <img src={el.imgSrc} alt={el.title} />
                <ProductTitle>{el.title}</ProductTitle>
                <ProductPrice>{el.price.toLocaleString("kr")}</ProductPrice>
                {el.status === "new" && <Tag bg={"#549391"}>NEW</Tag>}
                {el.status === "best" && <Tag bg={"#c14545"}>BEST</Tag>}
              </div>
            </ProductItem>
          ))}
        </ProductBox>
      )}
    </div>
  );
}

export default Test;
