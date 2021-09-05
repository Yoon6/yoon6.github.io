---
id: 5
title: "Java 코드가 컴파일되고 실행되기 까지"
subtitle: "JVM 위에서 실행되는 과정"
date: "2021.09.05"
tags: "java, jvm, jdk"
---

# 프로그램 동작 원리

- 기본적으로 소프트웨어가 작성되어 CPU에서 실행되기까지의 과정은 다음과 같다.
    - 소스파일 작성 → 컴파일러나 인터프리터가 어셈블리어로 번역 → 어셈블러가 기계어로 번역 → 목적 파일 생성 → Linking → loader module 생성 → loader → CPU execute
        1. 우리가 C나 C++ 등의 고급언어로 소스코드를 작성한다.
        2. 언어에 맞는 컴파일러(혹은 인터프리터)가 어셈블리어로 번역해준다.
        3. 어셈블리어로 번역된 파일을 어셈블러가 기계어 코드(0,1)인 목적 파일로 번역한다.
        4. 규모가 어느정도 있는 프로그램이면 한 파일에 모든 소스코드가 있지 않다. 여러 파일로 나눠져 컴파일이 된 목적 파일들을 연결해야한다. 이 과정을 Linking이라고 한다.
        5. Linker에 의해 연결한 파일을 loader module이라고 한다.
        6. loader는 loader module을 메모리에 올린다.
        7. 메모리에 올라간 loader module을 CPU가 실행한다.

그럼 JVM은 어떻게 동작하는 것일까?

# JVM의 동작 원리

- Java 언어의 특징은 어떤 플랫폼, 운영체제에서도 동작하는 것이다. 앞에서 본 것처럼 목적 파일로 만들어져 바로 CPU에서 수행되는 것이 아니다.
    - 중간에 JVM을 한 번 거치게 된다.
    - 간단하게만 한번 보면 다음과 같다.
        1. 자바 소스코드를 작성한다.
        2. 자바 컴파일러가 byte code라고 불리는 .class 파일로 번역한다.
        3. JVM이 기계어 코드로 번역한다.
       ![image](https://user-images.githubusercontent.com/49135657/132129857-a6f89184-c66d-4fc9-9d12-5836d6308d89.png)

           [https://ahea.wordpress.com/2017/05/25/자바개발자가-알아야-할-jvm과-garbage-collection/](https://ahea.wordpress.com/2017/05/25/%EC%9E%90%EB%B0%94%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-jvm%EA%B3%BC-garbage-collection/)

## JDK 구조

- 우선 JDK의 구조부터 보자.

  ![image](https://user-images.githubusercontent.com/49135657/132129866-97417b55-8a90-4f7c-872d-05b947e664ed.png)

  [https://medium.com/@mannverma/the-secret-of-java-jdk-jre-jvm-difference-fa35201650ca](https://medium.com/@mannverma/the-secret-of-java-jdk-jre-jvm-difference-fa35201650ca)

  - JDK > JRE > JVM

  - 이런 포함관계를 갖는다.
    - JDK(java development kit)
      - 컴파일러, 디버거, JRE가 있다.
          - JRE(java runtime environment)
              - JVM과 라이브러리가 있다.
          - JVM(java virtual machine)

            ![image](https://user-images.githubusercontent.com/49135657/132129872-a2ad6e4f-f991-4ead-b525-50be254d9b3b.png)

            [https://ahea.wordpress.com/2017/05/25/자바개발자가-알아야-할-jvm과-garbage-collection/](https://ahea.wordpress.com/2017/05/25/%EC%9E%90%EB%B0%94%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-jvm%EA%B3%BC-garbage-collection/)

            - JVM 내부에는 Class Loader, Runtime Data Areas, Execution Engine 등이 있다.


## Class Loader

- 클래스 로더는 바이트 코드(.class)를 받아서 필요한 클래스를 가져와 JVM의 메모리에 로드하고, 링킹하고 초기화 하는 과정을 수행한다.
- 자바는 컴파일 타임에 모든 클래스를 로드하는 방식이 아닌, 런타임에 클래스가 필요하면(참조할 때) 클래스를 로드하고 링킹하는 동적로드를 한다.
      - JVM에서 동적로드를 담당한다.

### Class Loader 특징
이제 JVM이 어떻게 class 파일을 기계어 코드로 변환하는지 알아보자.

- 계층 구조
      - JVM의 클래스 로더는 여러개가 있는데 이 클래스 로더끼리 부모-자식관계의 계층 구조를 이루고 있다.
- 위임모델
      - 게층 구조를 바탕으로 클래스 로더끼리 호출을 위임한다. 클래스를 로딩할 때, 최상위 클래스로더인 부트스트랩 클래스 로더를 확인하고 이 클래스 로더에 로딩하려는 클래스가 없다면 자식 클래스 로더로 책임을 넘긴다.
      - 위임 모델 다이어그램

  ![image](https://user-images.githubusercontent.com/49135657/132129882-070930fb-c4cd-4626-bb6c-d4a683cbf332.png)

  [https://d2.naver.com/helloworld/1230](https://d2.naver.com/helloworld/1230)

  - 부트스트랩 클래스 로더
    - JVM이 처음 실행될 때 생성된다. 최상위 Object클래스와 Java api들을 로드한
          - 익스텐션 클래스 로더(Extension Class Loader)
      - 기본 자바 API를 제외한 확장 클래스들을 로드한다.
          - 시스템 클래스 로더(System Class Loader)
              - 사용자가 작성한 클래스들(?), $CLASSPATH 내의 클래스들을 로드한다.
          - 사용자 정의 클래스 로더(User-Defined Class Loader)
              - 애플리케이션 사용자가 직접 코드 상에서 생성해서 사용하는 클래스 로더이다.
- 가시성 제한
      - 하위 클래스 로더에서는 상위 클래스로더의 클래스를 찾을 수 있다.
      - 반대는 안된다.
- 언로드 불가
      - 클래스 로더는 클래스를 로딩만 할 수 있다.
      - 이미 로드된 클래스를 언로드 할 수는 없다.

### 클래스 로딩 과정

- 클래스 로더가 아직 로드되지 않은 클래스를 찾을 때, 로딩 → 링킹 → 초기화 과정을 거친다.

  ![image](https://user-images.githubusercontent.com/49135657/132129886-61f0cad8-db1c-4598-95a0-3111298617e6.png)

  [https://d2.naver.com/helloworld/1230](https://d2.naver.com/helloworld/1230)

1. 로딩
      - 클래스 파일을 가져와서 JVM 메모리에 로드
2. 링킹
     - 검증
          - 자바, JVM의 명세에 맞게 작성 되어 있는지 확인
     - 준비
        - 클래스가 필요로하는 메모리를 할당 (필드, 메소드 등)
     - 분석
        - 클래스의 상수 풀 내의 심볼릭 레퍼런스를 다이렉트 레퍼런스로 변경
            - 클래스 파일은 JVM이 프로그램을 실행할 때 필요한 API를 Link할 수 있도록 심볼릭 레퍼런스를 가진다. 심볼릭 레퍼런스를 런타임 시점에 메모리 상에서 실제로 존재하는 물리적인 주소로 대체하는 Linking 작업이 일어난다.
            - 심볼릭 레퍼런스는 참조하는 대상의 이름을 지칭하고, 클래스 파일이 JVM에 올라가게 되면 심볼릭 레펀선스는 실제 메모리 주소가 아닌 이름에 맞는 객체의 주소를 찾아서 연결하는 작업을 수행한다.
3. 초기화
    - 클래스 변수들을 초기화한다. → static 필드들을 설정된 값으로 초기화 한다.

## Runtime Data Areas

- JVM이 OS위에서 실행되면서 할당받아 사용하는 메모리 영역이다.
      - 6개 영역으로 구분된다.

  ![image](https://user-images.githubusercontent.com/49135657/132129889-74e8f387-769c-4fc8-b817-d42deb60143f.png)

  [https://d2.naver.com/helloworld/1230](https://d2.naver.com/helloworld/1230)

- **쓰레드 마다 생성**
    - PC Register
        - 현재 수행 중인 JVM의 명령어 주소
    - JVM Stack
        - 쓰레드가 시작될 때 생성
        - 스택 프레임을 저장하는 스택이다.
            - 메소드 스택
                - 지역변수, 매개변수, 반환 주소 등
    - Native Method Stack
        - 자바 외의 언어로 작성된 네이티브 코드를 위한 스택
- **모든 쓰레드가 공유**
    - Heap
        - 인스턴스를 저장하는 공간
        - 가비지 컬렉션 대상
    - Method Area
        - JVM이 시작될 때 생성된다.
        - JVM이 읽어 들인 각각의 클래스와 인터페이스에 대한 런타임 상수 풀, 필드와 메소드 정보, static 변수, 메소드의 바이트 코드 등이 포함된다.
    - Runtime Constant Pool
        - Method Area에 포함되는 영역이다.
        - JVM에서 가장 핵심적인 역할 수행
        - 클래스와 인터페이스의 상수, 메소드, 필드에 대한 모든 레퍼런스를 담고 있는 테이블
        - 메소드나 필드를 참조할 때, 이 테이블을 통해 실제 메모리상의 주소를 찾는다.

## Execution Engine

- JVM의 메모리에 올라온 바이트 코드들을 명령어 단위로 하나씩 실행한다.
- 바이트 코드(.class)를 JVM 내부에서 실행할 수 있는 형태(기계어?)로 바꾼다.
- 바꾸는 방법이 2가지가 있다
    - **인터프리터**
        - 바이트 코드 명령어를 하나씩 읽고 해석해서 실행한다.
        - 하나하나의 해석은 빠르지만 전체 실행 결과는 느리다.
        - 바이트 코드는 기본적으로 인터프리터 방식으로 동작한다.
    - **JIT(Just In Time)**
        - 인터프리터의 단점을 보완하기 위해 도입된 JIT 컴파일러 이다.
        - 바이트 코드 전체를 컴파일하여 네이티브 코드로 변경한다.
            - 전체를 컴파일하는 과정이 인터프리터 보다 느리다.
            - 따라서 한 번만 실행되는 코드라면 컴파일 하지 않는다.
            - JIT 컴파일러를 사용하는 JVM들은 내부적으로 컴파일하려는 메소드가 얼마나 자주 실행되는지 체크하고 일정 수준 이상일 때 컴파일을 한다.

## 정리

1. 자바 소스코드를 작성한다.
2. JDK의 자바 컴파일러가 자바 파일을 바이트 코드로 변환한다.
3. JRE 안의 JVM의 클래스 로더가 바이트 코드를 받아서 JVM의 메모리에 올리고, 필요한 클래스들을 로딩한다.
4. 실행 엔진이 메모리 상에 있는 바이트 코드를 JVM 내부에서 실행할 수 있는 기계어 형태로 바꿔서 실행한다.

# 참고자료

[https://yeon-kr.tistory.com/112](https://yeon-kr.tistory.com/112)

[https://steady-snail.tistory.com/67](https://steady-snail.tistory.com/67)

[https://ahea.wordpress.com/2017/05/25/자바개발자가-알아야-할-jvm과-garbage-collection/](https://ahea.wordpress.com/2017/05/25/%EC%9E%90%EB%B0%94%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-jvm%EA%B3%BC-garbage-collection/)

[https://medium.com/@mannverma/the-secret-of-java-jdk-jre-jvm-difference-fa35201650ca](https://medium.com/@mannverma/the-secret-of-java-jdk-jre-jvm-difference-fa35201650ca)

[https://d2.naver.com/helloworld/1230](https://d2.naver.com/helloworld/1230)

[https://lkhlkh23.tistory.com/100](https://lkhlkh23.tistory.com/100)
