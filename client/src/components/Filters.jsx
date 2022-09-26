import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FilterTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 60px auto;
  margin-bottom: 20px;
`;

const FilterBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const Filter = styled.span`
  cursor: pointer;
  padding: 5px 15px;

  padding-bottom: ${(props) => props.current && "3px"};
  border-bottom: ${(props) => props.current && "2px solid var(--green)"};
  font-weight: ${(props) => props.current && "500"};

  &:hover {
    font-weight: 500;
    color: var(--green);
    padding-bottom: 3px;
    border-bottom: 2px solid var(--green);
  }
`;

const tablewareFilter = [
  {
    link: "all",
    text: "모두보기",
  },
  {
    link: "bowl",
    text: "공기",
  },
  {
    link: "smallbowl",
    text: "종지",
  },
  {
    link: "plate",
    text: "플레이트",
  },
  {
    link: "mat",
    text: "테이블매트",
  },
];

const cupFilter = [
  {
    link: "all",
    text: "모두보기",
  },
  {
    link: "mug",
    text: "컵/머그",
  },
  {
    link: "glass",
    text: "유리컵",
  },
  {
    link: "tea",
    text: "도예용품",
  },
];

function Filters({ onClick, current, pathname }) {
  const filters = pathname === "tableware" ? tablewareFilter : cupFilter;

  return (
    <div>
      <Link to="/tableware">
        <FilterTitle>
          {pathname === "tableware" ? "테이블웨어" : "음료용품"}
        </FilterTitle>
      </Link>
      <FilterBox>
        {filters.map((filter) => (
          <Filter
            key={filter.link}
            onClick={() => {
              onClick(filter.link);
            }}
            current={current === filter.link ? true : false}
          >
            {filter.text}
          </Filter>
        ))}
      </FilterBox>
    </div>
  );
}

export default Filters;
