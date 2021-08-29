---
title: "MusicHub"
subtitle: "모두가 만들어가는 플레이 리스트"
thumbnail: "https://user-images.githubusercontent.com/49135657/131238197-bc37ec44-1867-4429-82e2-3d5ca3e67c74.png"
---

## Introduction
* 여러명의 사람들이 함께 플레이 리스트를 만들어가는 서비스입니다.
* 플레이 리스트에 Pull Request 를 할 수 있습니다.
* Youtube 링크를 요청할 수 있습니다.
* 플레이 리스트 관리자가 승인하면 플레이 리스트에 등록되어 재생할 수 있습니다.


### 기술 스택

* 프론트엔드

  -> 부트스트랩

* 백엔드

  -> Spring boot 2.4.5

  -> JDK 11

  -> Thymeleaf

  -> JPA

  -> MySQL 8

### 프로젝트 기간
* 2021년 4월 ~ 7월

---

## Structure

### DB구조
![image](https://user-images.githubusercontent.com/49135657/131238180-1db2f899-1199-48b7-911e-9ace830f58f6.png)
* Member : 회원가입한 유저를 저장하는 테이블. 비밀번호는 암호화되어 들어간다.
* Playlist : 단순한 플레이 리스트 목록.
* RequestList : 플레이 리스트에 들어온 요청 리스트. postId로 인식한다.
* DetailList : 플레이 리스트에 추가된 노래 리스트.

### 흐름도
![image](https://user-images.githubusercontent.com/49135657/131238373-b2bf348d-b3b2-4429-95cc-dbc14d66d34c.png)
### Diagram
![image](https://user-images.githubusercontent.com/49135657/131238511-16f015c4-e079-43bf-adbb-14ca9d8115c6.png)
![image](https://user-images.githubusercontent.com/49135657/131240597-5ae57541-b6d4-4006-abd5-ce68c8c57463.png)

---

## 후기
### 내가 한 일
* 교내 동아리 팀 프로젝트로 4명이서 진행하였다.
* 프론트엔트 쪽은 하지 않고, Thymeleaf 정도만 하였다.
* 스프링 부트
* 로그인/회원가입

  -> 스프링 시큐리티

  -> 유효성 검증

  -> 암호화

* 플레이리스트 생성

  -> CRUD 처리

  -> MVC 패턴으로 구현

* 노래 요청 수락/거절 처리

### 아쉬운 점
* 스프링을 공부해본 적 없이 프로젝트를 시작했기 때문에 구현에만 집중하였다.
* DB 테이블 간 관계를 짓지 않고, 하드코딩하였다.
* 이미지 업로드가 제대로 동작하지 않아 구현을 못하였다.
* MVC 패턴으로 Thymeleaf를 사용했기 때문에 프론트와 업무를 분리하기가 힘들었다.
* Controller - Service - Repository 로 레이어를 분리했지만, 각각의 역할이 지켜지지 않았다.
  


---

## UI

### 메인
![image](https://user-images.githubusercontent.com/49135657/131238197-bc37ec44-1867-4429-82e2-3d5ca3e67c74.png)
### 로그인/회원가입
![image](https://user-images.githubusercontent.com/49135657/131240669-173e0144-094f-4594-a179-d8ff25e21011.png)
![image](https://user-images.githubusercontent.com/49135657/131240673-0ff1872c-bf7c-40df-97ec-21e540e4a6c1.png)
### 재생페이지
![image](https://user-images.githubusercontent.com/49135657/131240748-796904ce-b410-4d4a-8c93-8dbceb4009a0.png)
### 마이페이지
![image](https://user-images.githubusercontent.com/49135657/131240749-04906d34-3f33-4e97-8d47-2282d775fd81.png)
### 관리페이지
![image](https://user-images.githubusercontent.com/49135657/131240751-d8ad68fa-c058-4b4c-8bb7-a9cb537091b5.png)

---
