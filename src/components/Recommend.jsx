import styled from "styled-components";
import { Link } from "react-router-dom";

const RecoWrapper = styled.section`
  width: 1160px;
  margin: 0 auto;
  margin-bottom: 160px;
`;

const RecoTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 30px;
`;

const RecoPdBox = styled.div`
  display: flex;
  gap: 20px;
`;

const RecoPd = styled.div``;

const RecoPdImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 10px;
`;

const RecoPdTitle = styled.h4`
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  text-align: start;
  margin-bottom: 5px;
  height: 40px;

  &:hover {
    color: #555;
  }
`;
const RecoPdSpan = styled.span`
  display: block;
  text-align: start;
  font-size: 15px;
  font-weight: 500;

  &::after {
    content: "원";
    margin-left: 5px;
    font-size: 14px;
  }
`;

//같은 카테고리 내에서 랜덤한 상품을 추천

function Recommend({ recommendData, loca }) {
  return (
    <RecoWrapper>
      <RecoTitle>이런 상품은 어떠세요?</RecoTitle>
      <RecoPdBox>
        {recommendData.map((data) => (
          <RecoPd key={data.title}>
            <Link to={`/${loca}/${data.param}`}>
              <RecoPdImg>
                <img src={data.imgSrc} alt={data.param} />
              </RecoPdImg>
            </Link>
            <Link to={`/${loca}/${data.param}`}>
              <RecoPdTitle>{data.title}</RecoPdTitle>
              <RecoPdSpan>{data.price}</RecoPdSpan>
            </Link>
          </RecoPd>
        ))}
      </RecoPdBox>
    </RecoWrapper>
  );
}

export default Recommend;
