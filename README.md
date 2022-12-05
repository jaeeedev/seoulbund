![sbrmain](https://user-images.githubusercontent.com/72128840/196187236-864f119d-4653-4b46-888f-b6b655fd0ddc.png)

## 개요

동아시아 식기, 소품 편집숍 서울번드를 간소화 한 웹페이지를 제작하였습니다.

## 사용 기술

**main**:
<img src="https://img.shields.io/badge/React-333?style=flat-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/React Router-333?style=flat-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/Redux-333?style=flat-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/styled components-333?style=flat-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/Firebase-333?style=flat-badge&logo=Firebase&logoColor=white">

**library**:
<img src="https://img.shields.io/badge/redux toolkit-white?style=flat-badge">
<img src="https://img.shields.io/badge/formik-white?style=flat-badge">
<img src="https://img.shields.io/badge/yup-white?style=flat-badge">

## 배포 페이지

https://dapper-pudding-d0dfcf.netlify.app

## 구현 페이지

- 메인 페이지
- 제품 리스트 페이지  
  ![sbr_list](https://user-images.githubusercontent.com/72128840/205544072-46d74dec-e234-43c9-b465-fc62ec765ad3.png)

  제품들이 나타나 있으며 원하는 카테고리에 맞게 필터링해 볼 수 있습니다.

- 제품 상세 페이지
  ![sbrpd](https://user-images.githubusercontent.com/72128840/205543995-0565b30e-05f8-4f2a-ac60-ce8cc8a3ca94.gif)

  상품 상세 페이지입니다. 제품을 선택해 장바구니에 담을 수 있습니다. 수량을 선택하지 않았을 경우 모달창이 나타납니다. 기존에 장바구니에 담겨있는 상품을 다시 선택할 경우 수량이 합산됩니다.

- 로그인/회원가입 페이지
  ![valid](https://user-images.githubusercontent.com/72128840/205543513-7ac1a723-b3be-4fb0-bc7b-583b62b386f5.gif)

  회원가입과 로그인 폼의 유효성을 간편하게 검사하기 위해 formik과 yup 라이브러리를 사용했습니다. 이메일을 통해 가입하거나 구글 아이디를 이용해 바로 로그인 할 수 있습니다.

- 장바구니 페이지
  ![sbr_cart](https://user-images.githubusercontent.com/72128840/205543825-7679a99c-65df-420a-b52b-3f1ca27cf0b1.png)

  로그인 한 회원의 장바구니를 firestore에서 가져와 화면에 보여줍니다. 장바구니 페이지 내에서도 수량 변경이 가능합니다.

- 검색 결과 페이지
  ![sbr_search](https://user-images.githubusercontent.com/72128840/205543563-8868dc2e-fa47-4cda-b667-0768d888963c.png)

  검색한 키워드를 가진 제품 명을 필터링해 화면에 보여줍니다.

## 후기

쇼핑몰의 핵심적인 기능들을 구현해 보면서 리액트에 대해 더 익숙해질 수 있는 계기였습니다.
스타일링 방법으로는 스타일드 컴포넌트를 처음 도입해 보았는데 자바스크립트 파일 안에 css가 있다는 점이 어색하게 느껴지기도 했습니다. 하지만 prop에 따른 조건부 스타일링과 높은 재사용성은 익숙해지고 난 뒤에는 큰 만족감을 주었습니다.

기존에 서버나 데이터베이스를 아예 이용하지 않고 리덕스만으로 장바구니 기능을 구현했었습니다. 하지만 로그인 기능이나 사용자별로 다른 장바구니를 보여주는 기능이 없어 아쉬움을 느끼던 차에 파이어베이스를 사용해보기로 했습니다. 서버를 구축할 필요 없이 파이어베이스에서 제공하는 SDK를 이용해 간단하게 인증 기능이나 데이터베이스를 사용할 수 있는 점이 마음에 들었습니다.

처음에는 어떻게 사용해야 할 지 감을 잡기 위해 버전8을 사용하는 강의를 들었었는데, 저는 버전9를 사용하기로 했고 쇼핑몰 기능에 필요한 함수들을 더 찾아야 해서 초반에 헤매는 시간이 길었습니다. 공식 문서를 시작부터 차근차근 보면서 적용하니 원했던 기능들을 만들 수 있었고 공식 문서와 좀 더 친해지는 계기가 되었던 것 같습니다.

새로운 기술들을 잔뜩 적용하면서 많이 배워갈 수 있는 프로젝트였습니다. 리액트 라우터를 통해 접속할 수 있는 페이지가 무한히 늘어났고, 리덕스를 통해 모든 컴포넌트에서 쉽게 상태를 관리 할 수 있었습니다. 배운 만큼 구현할 수 있는 것들이 늘어난다는 것을 깨닫고 동기부여가 되는 시간이었습니다.
