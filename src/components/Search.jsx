import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = styled.form`
  position: relative;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const SearchBar = styled.input`
  padding: 5px 20px;
  border: none;
  border-radius: 1rem;

  &:active {
    outline: none;
  }

  &::placeholder {
    font-size: 12px;
    color: #999;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 5px;
  color: black;
  border: none;
  background: transparent;
`;

function Search() {
  const inputRef = useRef("");
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    navigate(`/search?keyword=${inputRef.current.value}`);

    inputRef.current.value = "";
  }

  return (
    <SearchBox onSubmit={submitHandler}>
      <SearchBar ref={inputRef} placeholder={"제품을 검색해보세요"} />
      <SearchBtn>
        <BiSearch />
      </SearchBtn>
    </SearchBox>
  );
}

export default Search;
