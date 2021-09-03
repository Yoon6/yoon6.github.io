---
id: 4
title: "Garbage Collector가 뭐야"
subtitle: "무엇인지만 햝아보기"
date: "2021.09.03"
tags: "java, jvm, gc, garbage collector"
---

## 가비지 컬렉터

### 뭐지?

C나 C++같은 언매니지드 언어는 OS 레벨의 메모리의 직접 접근해서 메모리를 관리한다.

자바는 OS위의 JVM위에서 돌아간다. 이 JVM이 알아서 메모리 상에 필요하지 않은 데이터를 해제하여 공간을 확보해준다.

- JVM의 메모리 구조
    - 스택
        - 힙 영역에 생성된 객체를 참조하기 위한 값들이 할당된다.
        - 메서드 작업에 필요한 메모리 공간
            - 지역변수, 파라미터 등
    - 힙
        - 인스턴스가 생성된다.

### 예시

지역변수로 String 변수를 만들고 값을 넣으면, 참조변수는 스택에 할당되고 String 리터럴 값은 힙 영역에 할당되게 된다.

`String str = "heap";`

자바에서는 문자열에 어떤 다른 문자열을 더하면 원래 주소에 더해지는게 아니라, 새로운 인스턴스를 만들어 다른 주소를 참조하게 된다.

`str += "123";`

이처럼 더하게 되면 힙 영역에는 2개의 String 리터럴이 존재하는 것이다.

이때, 더 이상 참조하지 않는 `"heap"` 리터럴을 Garbage Collector가 삭제해주는 것이다.

이렇게 더 이상 참조하지 않는 객체를 Unreachable Object라고 한다.

### 동작

Mark → Sweep

- Mark
    - GC가 스택의 모든 변수를 스캔하면서 참조하는 오브젝트를 찾는다. 참조한 오브젝트가 참조하는 오브젝트까지 다 마킹한다.
- Sweep
    - Mark 되어있지 않은 힙의 오브젝트들을 지운다.

## 자바의 정석 예제 13-20

다중 쓰레드를 사용하여 가비지 컬렉터를 간단히 흉내내본 예제이다.

메모리 공간을 나누지 않았고, Unreachable Object 를 삭제하는게 아니라 시간에 따라 공간을 확보하는 식이다.

```java
public class GarbageCollector extends Thread {
    final static int MAX_MEMORY = 1000;
    int usedMemory = 0;

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(10 * 1000);
            } catch (InterruptedException ie) {
                System.out.println("Awaken by interrupt()");
            }

            gc();
            System.out.println("Garbage Collected. Free Memory :"+freeMemory());
        }
    }

    public void gc() {
        usedMemory -= 300;
        if (usedMemory < 0) usedMemory = 0;
    }

    public int totalMemory() { return MAX_MEMORY; }
    public int freeMemory() { return MAX_MEMORY - usedMemory; }
}
```

- 최대 메모리는 1000이라고 한다.
- 10초를 sleep하고, `gc()`를 실행한다.
    - 사용중인 메모리를 300감소한다.

```java
public class GarbageCollectorTest {
    public static void main(String[] args) {
        GarbageCollector gc = new GarbageCollector();
        gc.setDaemon(true);
        gc.start();

        int requiredMemory = 0;

        for (int i = 0; i < 20; i++) {
            requiredMemory = (int) (Math.random() * 10) * 20;

            if (gc.freeMemory() < requiredMemory || gc.freeMemory() < gc.totalMemory() * 0.4) {
                gc.interrupt();
                try {
                    gc.join(100);
                } catch (InterruptedException ie) { }
            }

            gc.usedMemory += requiredMemory;
            System.out.println("gc.usedMemory = " + gc.usedMemory);
        }
    }
}
```

- gc 객체를 데몬 쓰레드로 만들었다.
    - 데몬 쓰레드는 일반 쓰레드가 모두 종료되면 자동으로 종료되는 쓰레드이다.
        - 데몬 쓰레드로 지정하지 않으면, for문을 다 돌고 메인 쓰레드가 종료되어도 gc는 다른 쓰레드에서 계속 실행되게 될 것이다.
- 랜덤 값을 메모리 사용량으로 계속 넣는다.
- 여유공간이 필요공간보다 적거나, 여유공간이 40% 미만이면 잠자고 있는 가비지 컬렉터를 깨운다.
    - 깨우지 않더라도 10초마다 작동한다.
- 깨우는 부분을 보면 `interrupt()` 외에도 `join()` 메소드가 있다.
    - gc를 깨우고 가비지 컬렉션이 시작되기 전에 메인 메소드에서 또 추가를 할 수 있으므로 기다릴 시간을 주는 것이다.
    - `join()`에 지정된 시간동안 작업을 수행하고 호출장소로 돌아온다.
        - 지정된 시간동안은 메인 쓰레드가 수행되지 않는 것이다.

```bash
gc.usedMemory = 20
gc.usedMemory = 20
gc.usedMemory = 20
gc.usedMemory = 60
gc.usedMemory = 100
gc.usedMemory = 120
gc.usedMemory = 160
gc.usedMemory = 200
gc.usedMemory = 380
gc.usedMemory = 520
gc.usedMemory = 520
gc.usedMemory = 640
Awaken by interrupt()
Garbage Collected. Free Memory :660
gc.usedMemory = 340
gc.usedMemory = 360
gc.usedMemory = 460
gc.usedMemory = 520
gc.usedMemory = 640
Awaken by interrupt()
Garbage Collected. Free Memory :660
gc.usedMemory = 420
gc.usedMemory = 580
gc.usedMemory = 580

Process finished with exit code 0
```

- 실행 결과는 이런식으로 나온다.

## 참고

[https://yaboong.github.io/java/2018/06/09/java-garbage-collection/](https://yaboong.github.io/java/2018/06/09/java-garbage-collection/)
