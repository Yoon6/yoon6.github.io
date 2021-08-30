---
id: 2
title: "HTTP의 Stateless"
subtitle: "장단점"
date: "2021.08.30"
tags: "http, stateless, tcp/ip"
---

## HTTP가 뭐냐?

- TCP/IP 네트워크 아키텍처에서 어플리케이션 계층에서 사용하는 프로토콜이다.
- 자신이 보내고자 하는 데이터에 시작라인과 헤더 등을 붙여 목적지에 전송한다.
- 예를들어 구글에 `http`를 검색하면 GET메소드, path= `/search?q=http` , version의 start-line과 헤더정보가 붙어 서버로 전송된다.
- GET메소드는 보통 조회를 위해 사용하고, 포함되는 데이터는 없이 요청만 한다.
- http프로토콜은 이런식이 된다.
  ![image](https://user-images.githubusercontent.com/49135657/131300993-e2a4bf3c-45c1-4249-bec9-193558cfeda2.png)


- HTTP의 특징 중 하나로는 Stateless라는 것이다.

## Stateless

- 서버가 클라이언트의 상태를 보존하지 않는다는 뜻이다. 클라이언트의 상태라는 것은 로그인 여부나 해당 클라이언트로부터 이전에 들어온 요청 등을 말한다.

  ![image](https://user-images.githubusercontent.com/49135657/131301001-d1b5ff48-8e14-45d3-bdd2-a5a521ce7a70.png)

- stateless 특징때문에 클라이언트는 한번에 요청에 모든 정보를 담아서 보내야 한다.

  ![image](https://user-images.githubusercontent.com/49135657/131301018-3e4ee01f-e9d5-4cc1-bc95-244ec140e814.png)

- 상태를 보존하지 않기 때문에 HTTP만으로는 로그인을 유지할 수 없다. 쿠키/세션 등을 이용해서 로그인을 유지하는 방법이 있다.
- 이렇게만 들으면 왜 stateless로 만든거지, 별로 아닌가 라고 생각할 수도 있다.

- 하지만 stateless 특성은 큰 이점을 가진다.
    - 상태를 유지한다면, 이전에 데이터를 보냈던 해당 서버하고만 통신을 할 수 있다.
      - 같은 서비스를 제공하더라도 물리적인 서버가 여러대 존재할 수 있다.

      ![image](https://user-images.githubusercontent.com/49135657/131301049-25ab40a6-a221-4148-aff4-6c8fcd9077b5.png)

      - 일련의 요청 중에 서버에 장애가 난다면 서버에 처음부터 다시 보내야한다.

    - 상태를 유지하지 않는다면, 특정 서버와 클라이언트에 의존하지 않고 통신할 수 있다.
        - 서버 부하에 따라 다른 서버로 요청을 보내 유동적으로 처리 할 수 있다.
        - 트래픽이 많아졌을 때, 응답 서버를 늘리기가 쉽다는 장점이 있다.

- 단점은 요청 데이터의 크기가 크다. 따라서 매 요청마다 요청과 응답에 많은 네트워크 자원을 사용하게 된다.
