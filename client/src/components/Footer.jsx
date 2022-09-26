import styled, { css } from "styled-components";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";
import { useSelector } from "react-redux";

const option = css`
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  color: white;
`;

const Button = styled.button`
  padding: 10px 30px;
  color: white;
  background: #222;
  border: none;
  margin: 10px 0;
  margin-right: 10px;
  cursor: pointer;
`;

const FooterTop = styled.div`
  border-top: 1px solid #ddd;
  padding: 40px 0;
`;
const FooterBottom = styled.div`
  background: var(--green);
  padding: 40px 0;
`;
const InnerFooterTop = styled.div`
  ${option}
  color: #222;
`;
const InnerFooterBottom = styled.div`
  ${option}
  justify-content:flex-start;
  gap: 100px;
`;

const TextTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 13px;
  line-height: 1.5;
`;

const Logo = styled.a`
  height: 25px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const GuideBtn = styled.button`
  display: block;
  cursor: pointer;
  padding: 10px 30px;
  margin-bottom: 5px;
  font-size: 14px;
  border: none;

  &:active {
    background: var(--green);
    color: white;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  gap: 30px;
  font-size: 40px;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <footer>
      <FooterTop>
        <InnerFooterTop>
          <div>
            <TextTitle>고객지원센터</TextTitle>
            <Text>070-4409-0689</Text>
            <br />
            <Text>
              영업시간
              <br />
              월-금
              <br />
              오전 10:00 ~ 오후 17:00 / 주말,공휴일 쉼<br />
              점심시간 12:30 ~ 13:30
              <br />
            </Text>
          </div>
          <div>
            <TextTitle>쇼핑 가이드</TextTitle>
            <GuideBtn>공지사항</GuideBtn>
            <GuideBtn>상품문의</GuideBtn>
            <GuideBtn>구매후기</GuideBtn>
            <GuideBtn>주문조회</GuideBtn>
          </div>
          <div>
            <TextTitle>배송/반품지원센터</TextTitle>
            <Text>반품: 서울시 서초구 서리풀4길 준빌딩 1층</Text>
            <Text>
              택배: 롯데택배 1588-2121 (월-금 08:00 ~ 18:00 / 토 09:00 ~ 13:00)
            </Text>
            <Button>롯데택배</Button>
            <Button>상품문의</Button>
            <Button>고객센터</Button>
            <TextTitle>SNS</TextTitle>
            <IconsWrapper>
              <BsInstagram style={{ cursor: "pointer" }} />
              <BsFacebook style={{ cursor: "pointer" }} />
              <BsYoutube style={{ cursor: "pointer" }} />
            </IconsWrapper>
          </div>
        </InnerFooterTop>
      </FooterTop>
      <FooterBottom>
        <InnerFooterBottom>
          <Logo>
            <img src="/imgs/tight_logo_white.png" alt="푸터 로고" />
          </Logo>
          <div>
            <TextTitle>회사정보</TextTitle>
            <Text>회사: 주식회사 서울번드 대표: 박찬호</Text>
            <Text>사업자 등록번호: [472-87-00375]</Text>
            <br />
            <Text>통신판매업신고 2016-서울서초-1232</Text>
            <Text>주소 경기도 화성시 팔탄면 포승향남로 2988</Text>
            <br />
            <br />
            <Text>Copyright © 2016 서울번드. All rights reserved.</Text>
          </div>
        </InnerFooterBottom>
      </FooterBottom>
    </footer>
  );
};

export default Footer;
