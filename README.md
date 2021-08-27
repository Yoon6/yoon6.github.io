<div align="center">
  <h1>

  🐬

  Blog

  </h1>

</div>

> 주도적으로 학습한 내용을 올립니다. 

---
## 템플릿 정보
[handmade-blog](https://github.com/parksb/handmade-blog)

## 사용법

### 문서 작성 및 발행

1. `_articles` 또는 `_works` 디렉토리에 문서를 작성하세요.

2. `npm run publish article` 또는 `npm run publish work` 스크립트를 실행해 마크다운 문서를 HTML로 변환하세요.

3. `npm start` 스크립트를 이용해 로컬 서버에서 변환된 문서를 확인하세요.

    ```shell script
    $ npm start
    ```

4. 변경사항을 저장소에 커밋, 푸시하고 `npm run deploy` 스크립트를 실행해 배포하세요.

   ```shell script
   $ git add ./services/config.json
   $ git commit -m "Set the blog title and subtitle"
   $ git push origin master
   ```
    ```shell script
    $ npm run deploy
    ```
