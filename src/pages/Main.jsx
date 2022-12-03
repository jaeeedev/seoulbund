/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import styled from "styled-components";
import MainSlide from "../components/MainSlide";
import cupData from "../cupData";
import tData from "../tData";
import { Link } from "react-router-dom";
import TopBtn from "../components/TopBtn";

const wellnessContents = [
  {
    img: "/imgs/wellness01.jpg",
    title: "미세먼지 안전구역, 우리집 지키는 반려식물",
    desc: "초보 식집사와 식물, 모두가 건강하게!",
  },
  {
    img: "/imgs/wellness02.jpg",
    title: "똑똑한 공간별 활용 솔루션",
    desc: "자투리 공간도 200% 알차게 활용하는 법",
  },
];
const kitchenContents = [
  {
    img: "/imgs/kitchen01.jpg",
    title: "캠핑 초보도 할 수 있는 '홈캠핑' 도전기",
    desc: "봄캠핑의 낭만, 집에서도 밖에서도 즐겨요!",
  },

  {
    img: "/imgs/kitchen02.jpg",
    title: "싱그러운 제철 식재료 어떻게 즐기세요?",
    desc: "더 맛있고 신선하게 보관해 보세요!",
  },
];

const NewPd = styled.div`
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;
`;

const NewPdTitle = styled.h4`
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  text-align: start;
  margin-bottom: 5px;
  height: 40px;

  &:hover {
    color: #555;
  }
`;
const NewPdSpan = styled.span`
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
const ToggleBtn = styled.button`
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-right: 5px;
  border-radius: 2rem;
  padding: 8px 25px;
  cursor: pointer;
  background: ${(props) => (props.active ? "var(--green)" : "#f3f3f3")};
  color: ${(props) => (props.active ? "white" : "#222")};
`;

const NewPdItemBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 120px;
`;

const NewPdItem = styled.div`
  width: 250px;
  height: 312.5px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const PdImg = styled.img`
  transition: all 0.4s;

  &:hover {
    transform: scale(1.05);
  }
`;

const SectionBox = styled.div`
  width: 1060px;
  margin: 0 auto;
  margin-bottom: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const TasteTextBox = styled.div`
  background: #534b3b;
  color: white;
  flex: 1;
  padding: 30px 20px;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: flex-start; */
`;
const TasteArticleBox = styled.div`
  flex: 2.5;
  display: flex;
  gap: 30px;
  padding: 30px;
  /* border: 1px solid #ddd1b9; */
  background: #f8f6f1;
`;

const TasteTitle = styled.span`
  font-size: 18px;
  padding: 5px;
  border-bottom: 1px solid white;
`;

const TasteSmallTitle = styled(TasteTitle)`
  margin-top: 10px;
  display: block;
  font-size: 23px;
  padding: 5px;
  border-bottom: none;
  font-weight: 700;
`;

const TasteToggleBtn = styled(ToggleBtn)`
  background: ${(props) => (props.active ? "#c5aa8c" : "#f3f3f3")};
  color: #222;
  font-weight: 600;
  display: block;
  width: 150px;
  margin: 0 auto;
  margin-top: 10px;
`;

const ArticleBox = styled.div`
  flex: 1;
`;
const ImgBox = styled.div`
  height: 200px;
  background: #ccc;
  overflow: hidden;
  margin-bottom: 10px;
`;
const ArticleTitle = styled.h4`
  text-align: start;
  font-size: 18px;
  margin-bottom: 8px;
`;
const ArticleDesc = styled.p`
  text-align: start;
  font-size: 15px;
`;
const TextWrapper = styled.div``;

const Main = () => {
  const [currentNew, setCurrentNew] = useState("tableware");
  const [newPd, setNewPd] = useState([tData[0], tData[1], tData[2], tData[3]]);

  const [taste, setTaste] = useState("wellness");
  const tasteArr = taste === "wellness" ? wellnessContents : kitchenContents;

  useEffect(() => {
    if (currentNew === "tableware") {
      setNewPd(tData.filter((el, i) => i < 4));
    } else if (currentNew === "cups") {
      setNewPd(cupData.filter((el, i) => i < 4));
    }
  }, [currentNew]);

  return (
    <div>
      <MainSlide />
      <section className="new">
        <NewPd>
          <SectionTitle>신제품</SectionTitle>
          <ToggleBtn
            active={currentNew === "tableware"}
            onClick={() => {
              setCurrentNew("tableware");
            }}
          >
            테이블웨어
          </ToggleBtn>
          <ToggleBtn
            active={currentNew === "cups"}
            onClick={() => {
              setCurrentNew("cups");
            }}
          >
            음료용품
          </ToggleBtn>

          <NewPdItemBox>
            {newPd.map((item) => (
              <Link
                to={`/${currentNew === "tableware" ? "tableware" : "cups"}/${
                  item.param
                }`}
                key={item.title}
              >
                <NewPdItem>
                  <PdImg src={item.imgSrc} alt={item.param} />
                </NewPdItem>
                <NewPdTitle>{item.title}</NewPdTitle>
                <NewPdSpan>{item.price.toLocaleString("kr")}</NewPdSpan>
              </Link>
            ))}
          </NewPdItemBox>
        </NewPd>
      </section>

      <section className="taste">
        <SectionBox>
          <TasteTextBox>
            <TextWrapper>
              <TasteTitle>번더의 취향</TasteTitle>
              <TasteSmallTitle>
                {taste === "wellness" ? "웰니스" : "키친 & 레시피"}
              </TasteSmallTitle>
            </TextWrapper>
            <TextWrapper>
              <TasteToggleBtn
                active={taste === "wellness"}
                onClick={() => {
                  setTaste("wellness");
                }}
              >
                웰니스
              </TasteToggleBtn>
              <TasteToggleBtn
                active={taste === "kitchen"}
                onClick={() => {
                  setTaste("kitchen");
                }}
              >
                키친 & 레시피
              </TasteToggleBtn>
            </TextWrapper>
          </TasteTextBox>
          <TasteArticleBox>
            {tasteArr.map((con, i) => (
              <ArticleBox key={i}>
                <Link to="/">
                  <ImgBox>
                    <img src={con.img} alt={con.title} />
                  </ImgBox>
                </Link>
                <Link to="/">
                  <ArticleTitle>{con.title}</ArticleTitle>
                </Link>
                <Link to="/">
                  <ArticleDesc>{con.desc}</ArticleDesc>
                </Link>
              </ArticleBox>
            ))}
          </TasteArticleBox>
        </SectionBox>
      </section>

      <section className="best">
        <SectionTitle>베스트 상품</SectionTitle>

        <SectionBox>
          <NewPdItemBox>
            {tData.map((item) => {
              if (item.status === "best") {
                return (
                  <Link to={`/tableware/${item.param}`} key={item.title}>
                    <NewPdItem>
                      <PdImg src={item.imgSrc} alt={item.param} />
                    </NewPdItem>
                    <NewPdTitle>{item.title}</NewPdTitle>
                    <NewPdSpan>{item.price.toLocaleString("kr")}</NewPdSpan>
                  </Link>
                );
              }
            })}
          </NewPdItemBox>
        </SectionBox>
      </section>

      <TopBtn />
    </div>
  );
};

export default Main;
