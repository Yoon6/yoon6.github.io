#import "@preview/basic-resume:0.2.9": *

// #let lang = "ko";
#let lang = "en";

#let name = if lang == "ko" {
  "최대윤"
} else {
  "Dean Daeyoon Choi"
}
#let location = if lang == "ko" {
  "서울, 대한민국"
} else {
  "Seoul, Korea"
}
#let email = "yoonda5898@gmail.com"
#let github = "github.com/yoon6"
#let linkedin = "linkedin.com/in/yoon6"
#let phone = "+82 010-5837-5987"
// #let personal-site = "yoonda.tistory.com"

#show: resume.with(
  author: name,
  // All the lines below are optional.
  // For example, if you want to to hide your phone number:
  // feel free to comment those lines out and they will not show.
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  // personal-site: personal-site,
  accent-color: "#26428b",
  font: ("Noto Serif CJK KR", "Noto Sans CJK KR"),
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

/*
 * Lines that start with == are formatted into section headings
 * You can use the specific formatting functions if needed
 * The following formatting functions are listed below
 * #edu(dates: "", degree: "", gpa: "", institution: "", location: "")
 * #work(company: "", dates: "", location: "", title: "")
 * #project(dates: "", name: "", role: "", url: "")
 * #extracurriculars(activity: "", dates: "")
 * There are also the following generic functions that don't apply any formatting
 * #generic-two-by-two(top-left: "", top-right: "", bottom-left: "", bottom-right: "")
 * #generic-one-by-two(left: "", right: "")
 */

#let calculate-duration(start-year, start-month, end-year, end-month) = {
  let total-months = (end-year - start-year) * 12 + (end-month - start-month)
  let years = calc.quo(total-months, 12)
  let months = calc.rem(total-months, 12)
  
    
  if months == 0 {
    if lang == "ko" {
      [#years 년]
    } else {
      [#years years]
    }

  } else if years == 0 {
    if lang == "ko" {
      [#months 개월]
    } else {
      [#months months]
    }
  } else {
    if lang == "ko" {
      [#years 년 #months 개월]
    } else {
      [#years years #months months]
    }
  }
}

#let month-full(month) = {
  let months = ("January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December")
  months.at(month - 1)
}
#let current-date = datetime.today();
#let polarisStartDate = (year: 2023, month: 11)
#let phoenixStartDate = (year: 2023, month: 2)
#let phoenixEndDate = (year: 2023, month: 11)
#let pknuStartDate = (year: 2019, month: 3)
#let pknuEndDate = (year: 2023, month: 2)

== Education

#let pukyongUniv = if lang == "ko" {
  "부경대학교"
} else {
  "Pukyong National University"
}

#let univLocation = if lang == "ko" {
  "부산, 대한민국"
} else {
  "Busan, Korea"
}

#let univStartDate = if lang == "ko" {
  [#pknuStartDate.year]+"년 "+[#pknuStartDate.month]+"월"
} else {
  month-full(pknuStartDate.month)+" "+[#pknuStartDate.year]
}
#let univEndDate = if lang == "ko" {
  [#pknuEndDate.year]+"년 "+[#pknuEndDate.month]+"월"
} else {
  month-full(pknuEndDate.month)+" "+[#pknuEndDate.year]
}

#let pukyongUnivDegree = if lang == "ko" {
  "공학사, 컴퓨터공학부 컴퓨터공학전공"
} else {
  "Bachelor's of Engineering, Computer Engineering"
}

#edu(
  institution: pukyongUniv,
  location: univLocation,
  dates: dates-helper(start-date: univStartDate, end-date: univEndDate),
  degree: pukyongUnivDegree,
  gpa: "3.96/4.5",
)
- GPA: 3.96/4.5

== Work Experience

#let workPolarisTitle = if lang == "ko" {
  "C++ 렌더링 엔진 개발자"
} else {
  "C++ Rendering Engine Developer"
}
#let workPolarisCompany = if lang == "ko" {
  "폴라리스오피스"
} else {
  "PolarisOffice"
}
#let workPolarisLocation = if lang == "ko" {
  "서울, 대한민국"
} else {
  "Seoul, Korea"
}
#let workPolarisStartDate = if lang == "ko" {
  [#polarisStartDate.year]+"년 "+[#polarisStartDate.month]+"월" 
} else {
  "November 2023"
}
#let workPolarisEndDate = if lang == "ko" {
  "재직 중"
} else {
  "Present"
}


#work(
  title: workPolarisTitle,
  location: workPolarisLocation,
  company: workPolarisCompany,
  dates: dates-helper(start-date: workPolarisStartDate, end-date: workPolarisEndDate+"("+calculate-duration(polarisStartDate.year, polarisStartDate.month, current-date.year(), current-date.month())+")"), 
  )

#if lang == "ko" {
  [
    - C++14 기반 멀티플랫폼 스프레드시트 엔진 개발 및 유지보수
    - 차트 및 인쇄 렌더링 오류 수정 및 기능 개발
    - Reflection과 SFINAE를 활용한 자동 JSON Serialization 시스템 구현
    - Copilot 코드 리뷰 및 정적 분석 도입
    - Github 브랜치 룰 확립 및 Jenkins PR build 자동화 구축
  ]
} else {
  [
    - Developed and maintained C++14-based multi-platform spreadsheet engine
    - Fixed chart and print rendering bugs and developed new features
    - Implemented automatic JSON Serialization system using Reflection and SFINAE
    - Improved code quality by introducing Copilot code reviews and static analysis
    - Established GitHub branch rules and built Jenkins PR build automation to enhance development productivity
  ]
}


// Phoenixdarts Experience
#let workPhoenixTitle = if lang == "ko" {
  "안드로이드 개발자"
} else {
  "Android Developer"
}

#let workPhoenixCompany = if lang == "ko" {
  "피닉스다트"
} else {
  "Phoenixdarts"
}

#let workPhoenixLocation = if lang == "ko" {
  "서울, 대한민국"
} else {
  "Seoul, Korea"
}
#let workPhoenixStartDate = if lang == "ko" {
  [#phoenixStartDate.year]+"년 "+[#phoenixStartDate.month]+"월" 
} else {
  month-full(phoenixStartDate.month)+" "+[#phoenixStartDate.year]
}
#let workPhoenixEndDate = if lang == "ko" {
  [#phoenixEndDate.year]+"년 "+[#phoenixEndDate.month]+"월"
} else {
  month-full(phoenixEndDate.month)+" "+[#phoenixEndDate.year]
}

#work(
  title: workPhoenixTitle,
  location: workPhoenixLocation,
  company: workPhoenixCompany,
  dates: dates-helper(start-date: workPhoenixStartDate, end-date: workPhoenixEndDate+"("+calculate-duration(phoenixStartDate.year, phoenixStartDate.month, phoenixEndDate.year, phoenixEndDate.month)+")"),
)


#if lang == "ko" {
  [
    - 글로벌 다트 애플리케이션 개발 및 유지보수 (17개 언어 서비스)
    - Crash 비율 12% → 1%로 개선하여 앱 안정성 향상
    - Java → Kotlin 마이그레이션, Clean Architecture 및 MVVM 패턴 적용
    - Jetpack Compose, Coroutine/Flow, Hilt를 활용한 모던 Android 개발
  ]
} else {
  [
    - Developed and maintained global darts application (17 languages)
    - Reduced crash rate from 12% to 1%, significantly improving app stability
    - Migrated Java to Kotlin, applied Clean Architecture and MVVM patterns
    - Built modern Android features using Jetpack Compose, Coroutine/Flow, and Hilt
  ]
}


== Projects
#let polarisProjectName = if lang == "ko" {
  "Polaris DataInsight"
} else {
  "Polaris DataInsight"
}
#let polarisProjectRole = if lang == "ko" {
  "사내 프로젝트"
} else {
  "In-house Project"
}
#project(name: polarisProjectRole, role: polarisProjectName, url: "datainsight.polarisoffice.com")

#if lang == "ko" {
  [
    - xlsx/docx/pptx to json 변환 도구 개발
    - chart 추출 스키마 설계
    - 클래스/구조체 추출을 자동화할 수있는 Reflection기반 JSON Serialization 시스템 구현
    - C++ SFINAE 기법을 활용한 범용 직렬화/역직렬화 모듈 개발
  ]
} else {
  [
    - Developed a tool for converting xlsx/docx/pptx files to JSON
    - Designed chart extraction schemas
    - Implemented a Reflection-based JSON Serialization system to automate class/structure extraction
    - Developed a generic serialization/deserialization module using C++ SFINAE techniques
  ]
}

#let compilerProjectName = if lang == "ko" {
  "Korlang Compiler"
} else {
  "Korlang Compiler"
}
#let compilerProjectRole = if lang == "ko" {
  "개인 프로젝트"
} else {
  "Solo Project"
}
#project(name: compilerProjectRole, role: compilerProjectName, url: "github.com/yoon6/korlang")

#if lang == "ko" {
  [
    - 한글 기반 컴파일 언어 korlang 컴파일러 구현
    - C++를 이용해 compiler의 frontend(scanner, parser)와 backend(generator) 구현
  ]
} else {
  [
    - Implemented a compiler for korlang, a Korean-based programming language
    - Built both the frontend (scanner, parser) and backend (generator) of the compiler using C++
  ]
}

#let chargeNoteProjectName = if lang == "ko" {
  "ChargeNote"
} else {
  "ChargeNote"
}
#let chargeNoteProjectRole = if lang == "ko" {
  "개인 프로젝트"
} else {
  "Solo Project"
}
#project(name: chargeNoteProjectRole, role: chargeNoteProjectName, url: "github.com/yoon6/ChargeNote")

#if lang == "ko" {
  [
    - 전기차 전비 기록, 차계부 앱 개발 및 PlayStore 배포
    - Room 기반 로컬 DB 설계 및 구현
  ]
} else {
  [
    - Developed and published an electric vehicle energy consumption tracking app on PlayStore
    - Designed and implemented local database using Room
  ]
}

== Skills
- *Programming:* C/C++, Java, Kotlin, Android
- *Tools:* Git, Jenkins


== Leadership & Activities

#let gdscDuration = if lang == "ko" {
  [2020년 8월 - 2022년 8월]
} else {
  [August 2020 - August 2022]
}
#extracurriculars(activity: "Google Developer Student Clubs PKNU", dates: gdscDuration)


#if lang == "ko" {
  [
    - 개발자 커뮤니티 Lead, 테크톡 및 학습 스프린트 문화 정착
    - 아이디어톤(80명), 해커톤(50명) 등 대규모 기술 이벤트 기획 및 운영
  ]
} else {
  [
    - Lead of developer community, established tech talk and learning sprint culture
    - Organized large-scale technical events: Ideathon (80 participants), Hackathon (50 participants)
  ]
}
