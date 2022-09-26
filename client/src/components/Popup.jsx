import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const Zero = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  transition: all 0.4s;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
`;

const Confirm = styled(Zero)`
  text-align: center;
`;

const LinkBtn = styled.button`
  width: 150px;
  padding: 10px 15px;
  border: none;
  background: var(--green);
  color: white;
  margin-top: 30px;
  cursor: pointer;

  &:active {
    background: #295753;
  }
`;

function Popup({ openHanlder }) {
  const [showConfirm, setShowConfirm] = useState(true);

  function close() {
    setShowConfirm(false);
    openHanlder(false);
  }

  return (
    <div>
      {showConfirm && (
        <Confirm>
          <p>상품이 장바구니에 담겼습니다.</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/cart">
              <LinkBtn>장바구니로 이동하기</LinkBtn>
            </Link>

            <LinkBtn onClick={close}>쇼핑 계속하기</LinkBtn>
          </div>
        </Confirm>
      )}
    </div>
  );
}

export default Popup;
