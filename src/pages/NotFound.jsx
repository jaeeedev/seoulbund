import styled from "styled-components";
import { IoWarningOutline } from "react-icons/io5";

const NotBox = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
`;

const Desc = styled.p`
  color: #999;
  font-weight: 500;
`;

function NotFound() {
  return (
    <NotBox>
      <IoWarningOutline style={{ fontSize: "100px", color: "var(--green)" }} />
      <h2>준비되지 않은 페이지입니다</h2>
      <Desc>사용 가능한 카테고리: 테이블웨어, 음료용품, 장바구니, 로그인</Desc>
    </NotBox>
  );
}

export default NotFound;
