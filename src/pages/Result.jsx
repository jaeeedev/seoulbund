import styled from "styled-components";
import cupData from "../cupData";
import tData from "../tData";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

const ItemCount = styled.p`
  width: 1260px;
  margin: 100px auto 20px auto;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

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

const tablewareCategory = ["bowl", "smallbowl", "plate", "mat"];

const dataForSearch = tData.concat(cupData);

function Result() {
  const [resultArr, setResultArr] = useState([]);
  const [loading, setLoading] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const qs = searchParams.get("keyword");
    const arr = dataForSearch.filter((data) => data.title.indexOf(qs) !== -1);

    setResultArr(arr);

    setLoading(false);
  }, [loading, searchParams]);

  return (
    <div>
      <ItemCount>
        총 <ItemCountBold>{resultArr.length}</ItemCountBold> 개의 제품이
        있습니다.
      </ItemCount>

      <ProductBox>
        {resultArr.length === 0 && <p>검색어와 해당하는 상품이 없습니다.</p>}
        {loading && <p>검색 중입니다...</p>}

        {resultArr.map((data, i) => (
          <ProductItem key={i}>
            <div>
              <Link
                to={
                  tablewareCategory.includes(data.category)
                    ? `/tableware/${data.param}`
                    : `/cups/${data.param}`
                }
              >
                <img src={data.imgSrc} alt={data.title} />
              </Link>
              <Link
                to={
                  tablewareCategory.includes(data.category)
                    ? `/tableware/${data.param}`
                    : `/cups/${data.param}`
                }
              >
                <ProductTitle>{data.title}</ProductTitle>
                <ProductPrice>{data.price.toLocaleString("kr")}</ProductPrice>
              </Link>
              {data.status === "new" && <Tag bg={"#549391"}>NEW</Tag>}
              {data.status === "best" && <Tag bg={"#c14545"}>BEST</Tag>}
            </div>
          </ProductItem>
        ))}
      </ProductBox>
    </div>
  );
}

export default Result;
