## [Baekjoon Online Judge](http://www.acmicpc.net/) AC Code Download Tool

### 개발이유

- 수작업으로 코드 한 개씩 옮기기 싫었다. 

### 설명

- BOJ에 제출한 맞은 문제들 중 최상단에 있는 정답 코드를 가져온다.

### 결과물

- 설정한 경로 안으로 문제번호.cpp 파일이 생성됨 (ex : 1003.cpp)

### 종속성

- [Node.js](https://nodejs.org/)
- [puppeteer](https://github.com/puppeteer/puppeteer/)

#### bash

```
# puppeteer 설치
npm install -g puppeteer
```

### 사용법

```
node main.js
```

### 개선해야할 사항 

- 현재는 AC받은 문제에 제출한 코드 중 최상단에 위치한 코드를 가져오는 방식 

  (ie, 최상단에 위치한 제출 코드가 틀린 코드여도 가져옴.....,,,,,, 빠른 시일 내에 업데이트 예정)

### Update log

- 2020/05/18 : 
