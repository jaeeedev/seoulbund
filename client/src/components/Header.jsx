import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store";

const HeaderBox = styled.header`
  background-color: var(--green);
`;
const InnerHeader = styled.div`
  margin: 0 auto;
  width: 1320px;
  display: flex;
  align-items: center;
`;

const HeaderUl = styled.ul`
  display: flex;
  color: white;
`;

const ToolUl = styled.ul`
  display: flex;
  flex: 1;
  color: white;
  justify-content: flex-end;
  align-items: center;
`;

const Logo = styled.a`
  width: 150px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
`;

const Li = styled.li`
  padding: 0 15px;
`;

const LogoutBtn = styled.span`
  cursor: pointer;
`;

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const data = await (await fetch("/api/users/logout")).json();

    if (data.logoutSuccess) {
      dispatch(userActions.nowLogout());
    }
  };

  return (
    <HeaderBox>
      <InnerHeader>
        <h1>
          <Logo
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="/imgs/tight_logo_white.png" alt="헤더 로고" />
          </Logo>
        </h1>
        <HeaderUl>
          <Li>
            <Link to={"/best"}>베스트</Link>
          </Li>
          <Li>
            <Link to={"/tableware"}>테이블웨어</Link>
          </Li>
          <Li>
            <Link to={"/cups"}>음료용품</Link>
          </Li>
          <Li>
            <Link to={"/taste"}>번더의 취향</Link>
          </Li>
        </HeaderUl>
        <ToolUl>
          <Li>
            <Search />
          </Li>
          <Li>
            <Link to="/cart">장바구니</Link>
          </Li>
          <Li>
            {isLoggedIn ? (
              <LogoutBtn onClick={logoutHandler}>로그아웃</LogoutBtn>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </Li>
        </ToolUl>
      </InnerHeader>
    </HeaderBox>
  );
};

export default Header;
