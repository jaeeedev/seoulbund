import styled from "styled-components";

import {
  ProductBox,
  ProductItem,
  ProductTitle,
  ProductPrice,
  Tag,
  ItemCount,
  ItemCountBold,
  SortBox,
  SortItem,
  ResultBox,
} from "../utils/Layouts";

const SkeletonBox = styled(ResultBox)``;

const SkeletonImgBox = styled.div`
  width: 300px;
  height: 376px;
  background: #f2f2f2;

  @keyframes bg-change {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  animation: bg-change 1.5s infinite ease;
`;

const SkeletonTitle = styled(ProductTitle)`
  margin-top: 10px;
  height: 46px;
  margin-bottom: 16px;
  padding: 0;
  background: #f2f2f2;
  border: none;

  @keyframes bg-change {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  animation: bg-change 1.5s infinite ease;
`;

const SkeletonPrice = styled(ProductPrice)`
  display: inline-block;
  width: 100px;

  background: #f2f2f2;

  @keyframes bg-change {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  animation: bg-change 1.5s infinite ease;
  &::after {
    content: "";
  }
`;

function Skeleton() {
  //불러올 개수만큼 넣어주기
  const amount = 4;
  return (
    <SkeletonBox>
      {new Array(amount).fill("").map((_, i) => {
        return (
          <ProductItem key={i}>
            <div>
              <SkeletonImgBox></SkeletonImgBox>
              <SkeletonTitle></SkeletonTitle>
              <SkeletonPrice></SkeletonPrice>
            </div>
          </ProductItem>
        );
      })}
    </SkeletonBox>
  );
}

export default Skeleton;
