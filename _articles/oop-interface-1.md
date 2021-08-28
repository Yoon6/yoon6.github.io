---
id: 1
title: "객체지향에서의 인터페이스란?"
subtitle: "다형성"
date: "2021.08.28"
tags: "interface, java, oop, 다형성"
---

자바를 기준으로 설명합니다. 하지만 객체지향언어에선 대부분 비슷할 것이라고 생각됩니다.

본인이 웹 개발을 공부하며 느끼고 이해한 내용에 대해 말합니다.

---

문법적으로 먼저 보면, 인터페이스는 상수와 추상메소드만 존재하는 추상클래스이다.

추상메소드라는 것은 메소드의 선언부만 있고, 몸통 부분은 없는 메소드이다.

(java8부터? 유지보수의 편의를 위해 default, static메소드 등도 포함되었다)

```java
public abstract class MyInterface {
		public abstract void run();
}

// 실제로 인터페이스는 인터페이스 키워드를 사용한다.
public interface MyInterface {
		public void run(); // 컴파일러가 추상메소드로 바꿔준다.
}
```

이렇게 얘기해서는 감이 잘 안올 것이다.

먼저 추상화와 다형성에 대해 생각해보자.

## 추상화
- 예를들어 일반적인 컴퓨터를 사용할 때는 윈도우와 Mac같은 GUI OS를 사용한다. 
  - 이 OS를 뜯어보면 실제 로직은 커널을 조작하는 명령어가 있을 것이다. 
  - 또 이 명령어는 전기 신호로 변환되어 cpu에서 동작할 것이다.
  
- 이렇게 전기 신호를 명령어로 추상화하고, 명령어를 다시 GUI 환경으로 추상화했다.

- 이런 과정을 추상화라고 한다. 추상화 단계의 최상단에 있는 사용자는 내부 로직이 바뀌더라도 이전과 동일하게 사용할 수 있다.

- 애플의 인텔 맥과 ARM 맥은 사용자 입장에서 큰 변화 없이 동일하게 사용할 수 있다.

## 다형성

> 한 가지 타입으로 여러가지 구현체를 사용할 수 있는 것이다.

- 예를들어 닌텐도 스위치를 쓴다고 하자. 
  - 마리오 게임용 닌텐도 스위치, 젤다 게임용 닌텐도 스위치를 따로 사지 않아도 닌텐도 스위치 하나에서 모든 게임을 동작시킬 수 있다.
  
- 브라우저도 마찬가지이다. 
  - 네이버용 브라우저, 구글용 브라우저, 유튜브용 브라우저 따로 만들지 않는다. 한가지 브라우저로 모든 웹사이트를 이용할 수 있다.
  
- 자동차 운전면허도 현대 운전면허, 포드 운전면허, 벤츠 운전면허가 존재하지 않는다.

- 사용자는 각 상황에 맞는 스위치, 브라우저, 운전면허를 알 필요가 없다. 대표적인 하나만 알고 있으면 되는거다.

## 결론 
- 그래서 인터페이스를 왜 쓰느냐?

많은 이유가 있겠지만 본인이 쓰면서 가장 몸소 느낀바는 다형성이다.

- 그럼 다형성은 왜 쓰느냐?

유지보수의 편의를 위해서다. 기존의 코드의 로직이 변경될 때 변경되는 부분을 최소화 시키기 위해 한단계 추상화 하는 것이다.

---


## 인터페이스 사용 예시
인터페이스를 사용했을 때, 어떤 식으로 유지보수가 편해지는지를 알아보자.
### 인터페이스를 사용하지 않을 때
- 사용자와, TV가 있다고 하자.
    - tv는 samsung tv와 lg tv가 있고 전원 on/off, 채널 up/down 기능이 있다.

```java
class SamsungTv {
    private boolean power;
    private int channel;

    public void power() {
        power = !power;
    }

    public void channelUp() {
        channel++;
    }

    public void channelDown() {
        channel--;
    }
}
```

```java
class Client{
    public static void main(String[] args){
        SamsungTv tv = new SamsungTv();
        
        //power on
        tv.power();

        tv.channelUp();
        tv.channelUp();
    }
}
```
- 이렇게 클라이언트가 SamsungTv를 잘 사용하고 있었는데, 새로운 LG TV가 나와서 바꾸기로 하자.

```java
class LgTv {
  private boolean power;
  private int channel;

  public void switchPower() {
      power = !power;
  }
    
  public void increseChannel() {
      channel++;
  }

  public void decreaseChannel() {
      channel--;
  }
}
```

- 새로나온 LG TV를 보니, 기존 삼성 TV와 하는 역할은 같지만 작동 방식(메소드)가 완전히 달라졌다.
- 따라서 클라이언트의 메소드를 사용하는 부분과 클래스를 선언하고 인스턴스를 생성한 부분을 모두 바꿔줘야한다.

```java
class Client{
  public static void main(String[] args){
      LgTv tv = new LgTv();
    
      //power on
      tv.switchPower();

      tv.increaseChannel();
      tv.decreaseChannel();
  }
}
```

- TV가 한번 바뀔 때마다. 선언부, 메소드 사용하는 코드를 전부 바꿔야 했다.

- 여러사람이 작업하다보면 기존의 규칙을 무시하고 작업하는 경우도 있고, 코드가 몇천줄이 넘어가는 경우가 생길 수도 있다.

- 최악의 상황에는 일일히 다 바꿔야한다.


### 인터페이스를 사용할 때
- 인터페이스를 사용하게되면 위에서 겪었던 대부분의 문제를 해결할 수 있다.
- 우선 TV라는 인터페이스를 만든다.

```java
public interface Tv {
    public void power();
    public void channelUp();
    public void channelDown();
}
```

- 이 인터페이스를 구현하는 삼성 TV 클래스를 만들자.

```java
public class SamsungTv implements Tv {
    private boolean power;
    private int channel;
    
    public void power() {
        power = !power;
    }

    public void channelUp() {
        channel++;
    }

    public void channelDown() {
        channel--;
    }
}
```

- 이제 클라이언트에서 TV를 사용할 때에는 Tv 인터페이스형(참조변수 타입)을 사용하면 된다.

```java
public class Client {
    public static void main(String[] args) {
        Tv tv = new SamsungTv();
        
        tv.power();
        tv.channelUp();
        tv.channelDown();
    }
}
```

- 새로운 TV를 만들어야한다면 이제 Tv 인터페이스를 구현하면 된다.

```java
public class LgTv implements Tv {
  private boolean lgPower;
  private int lgChannel;

  public void power() {
      lgPower = !lgPower;
  }

  public void channelUp() {
      lgChannel++;
  }

  public void channelDown() {
      lgChannel--;
  }
}
```

- 인터페이스를 쓰면 메소드 명이 변경될 일이 없기 때문에 사용자는 변경된 사용방법(메소드)를 새로 알아야 필요가 없어졌다.

```java
public class Client {
  public static void main(String[] args) {
      Tv tv = new LgTv();
        
      tv.power();
      tv.channelUp();
      tv.channelDown();
  }
}
```

- Tv 타입의 참조변수에 들어가는 인스턴스만 바꿔주면 다른 코드는 전혀 변경하지 않아도 된다.

- 여기서는 아주 작고, 단순한 문제를 다뤘지만, 여러가지 클래스의 포함관계가 복잡하게 얽혀있을 때 다형성은 힘을 발휘한다.

--- 
## Next step...

인터페이스를 사용하면, 구현체가 바뀌더라도 유연하게 대응할 수 있다.

또, 구현을 하는 클래스에 대해 어느정도의 가이드 라인을 제공해주는 역할도 한다.

하지만 여전히 코드를 바꿔야하는 부분이 존재한다.

제어의 역전(IoC)가 제대로 일어나지 않았고, SOLID원칙의 OCP, DIP 원칙에 위배된다.

이 문제를 해결하기 위해 의존성 주입(DI)을 사용할 수 있다.
