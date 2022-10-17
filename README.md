

![sbrmain](https://user-images.githubusercontent.com/72128840/196187236-864f119d-4653-4b46-888f-b6b655fd0ddc.png)

## 개요
동아시아 식기, 소품 편집숍 서울번드를 간소화 한 웹페이지를 제작하였습니다.


## 사용 기술

**client**: 
<img src="https://img.shields.io/badge/React-333?style=flat-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/React Router-333?style=flat-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/Redux-333?style=flat-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/styled components-333?style=flat-badge&logo=styled-components&logoColor=white">

**server**: 
<img src="https://img.shields.io/badge/Express-333?style=flat-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-333?style=flat-badge&logo=MongoDB&logoColor=white">

**library**: 
<img src="https://img.shields.io/badge/redux toolkit-white?style=flat-badge">
<img src="https://img.shields.io/badge/redux persist-white?style=flat-badge">
<img src="https://img.shields.io/badge/http proxy middleware-white?style=flat-badge">
<img src="https://img.shields.io/badge/mongoose-white?style=flat-badge">
<img src="https://img.shields.io/badge/formik-white?style=flat-badge">
<img src="https://img.shields.io/badge/yup-white?style=flat-badge">



## 배포 페이지

https://reactsbr.herokuapp.com/  
(헤로쿠 배포로 10-20초 가량 로딩 시간이 소요될 수 있습니다.)

**회고 페이지**  
https://www.jaeeedev.com/seoulbundreact  
(간략한 기능 설명과 회고가 있습니다.)


## 구현 페이지

- 메인 페이지
- 제품 리스트 페이지
- 제품 상세 페이지
![sbrpd](https://user-images.githubusercontent.com/72128840/196198275-fd4264d2-1c25-4d85-a7b5-34fd188db8cc.gif)
URL파라미터를 받아서 해당하는 데이터를 화면에 띄웁니다. 수량이 0일 때 수량을 선택해 달라는 모달창이 나타납니다.
장바구니에 이미 있는 상품을 또 담을 경우 수량이 합산됩니다.
- 검색 결과 페이지
- 장바구니 페이지
![sbrcart](https://user-images.githubusercontent.com/72128840/196197459-5ed19e5a-8d09-4d19-bb68-26b0eab9a955.gif)
리덕스로 전역 상태를 기억한다고 하더라도 SPA 페이지는 새로고침을 하면 상태가 날아가기 때문에 redux-persist 라이브러리를 사용했습니다.
직접 로컬 스토리지에 상태를 저장시키는 코드를 추가해도 되지만 redux-persist를 설정하면 간편하게 세션 스토리지나 로컬 스토리지를 선택하고 상태를 저장해 놓을 수 있어 간편합니다.

- 로그인/회원가입 페이지
![login](https://user-images.githubusercontent.com/72128840/196196170-1eff3479-44e6-4bc3-8bb7-2342563a8ed3.gif)

회원가입과 로그인 폼의 유효성을 간편하게 검사하기 위해 formik과 yup 라이브러리를 사용했습니다.      
로그인 API에 요청을 하면서 CORS 문제가 있어 http-proxy-middleware 라이브러리를 사용했습니다.

