import styled from "styled-components";

const Btn = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  color: white;
  background: #222;
  position: fixed;
  right: 10px;
  bottom: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

function TopBtn() {
  function onClickHandler() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return <Btn onClick={onClickHandler}>TOP</Btn>;
}

export default TopBtn;
