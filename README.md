# ๐ฅ SSAFY 4๊ธฐ ํนํํ๋ก์ ํธ 1๋ฑ ์์

![logo_ver2](README.assets/logo_ver2.png)

## DINORY Deploy Page
- https://www.dinory.shop/

## YOUTUBE LINK 
- https://www.youtube.com/watch?v=G4HGE65g3mg

## PlayStore APP LINK 
- https://play.google.com/store/apps/details?id=com.DINORY

## Table of Contents

- [โ **About Dinory**](#about-dinory)

- [๐ป **Getting start**](#getting-start)
- [๐งฉ **Main Functionalities**](#main-functionalities)

- [๐จ **Built With**](#built-with)
- [๐จโ๐ฉโ๐งโ๐ง **Our Team**](#our-team)

-------------------------

#### โ **About Dinory**

<img src="README.assets/egg.png" alt="egg" style="zoom: 33%;" />

**Dinory๋ AI๋ฅผ ํ์ฉํ์ฌ ์ผ์ ์ฌ์ง์ ์๋ก๋ํด ์์ด ๋จ์ด๋ฅผ ์ถ์ถํด์ฃผ๊ณ  ์ด๋ฅผ ํ์ฉํ์ฌ ์์ด๋ก ์ผ๊ธฐ๋ฅผ ์จ์ ํ์ตํ๋ ์ธ๊ณต์ง๋ฅ ์์ด ์ฌ์ง์ผ๊ธฐ ์ฑ์๋๋ค.**

**์์ ์ด ์ฌ๋ฆฐ ์ฌ์ง ์ด๋ฏธ์ง๋ฅผ ํ์ฉํด ์์ด ๋จ์ด๋ฅผ ํ์ตํ๊ณ , ๋จ์ด๋ฅผ ์ฌ๋ฐ๋ฅด๊ฒ ๋ฌธ์ฅ์์ ํ์ฉํ  ์ ์๋๋ก ํ๋ ๊ฒ์ด ๋ค์ด๋ธ๋ฆฌ์ ๋ชฉํ์๋๋ค.**

 

#### ๐ป **Getting start**

**Backend**

- **start with Docker**

  - django

  - nginx

    ```
    $ docker-compose up -d --buld
    ```

  - TTS server

    ```
    $ cd AI/
    $ docker run -it -p 5002:5002 synesthesiam/mozillatts:en
    ```

- **in Local**

  ```
  $ cd Backend/
  $ pip install -r requirements.txt
  ```

- **์ค์น์ ์ค๋ฅ๋ฐ์**

  - ./Backend/requirements.txt ํ์ผ๋ด uwsgi ๋ฅผ ์ฃผ์์ฒ๋ฆฌํ ํ ๋ค์ ์คํํด์ฃผ์ธ์.

- **์ค์น์๋ฃ ํ ntlk ์ค๋ฅ ๋ฐ์**

  - ntlk.download() ๋ฅผ ์งํํด์ฃผ์ธ์.

    

**Frontend**

- **Play store**

  https://play.google.com/store/apps/details?id=com.DINORY

- **Local**

  - ์๋๋ก์ด๋ ์ค์น ํ ๊ฐ์ ์๋ฎฌ๋ ์ดํฐ ์ค์  (https://developer.android.com/studio/install?hl=ko)

  ```
  $ cd Frontend/
  $ yarn install
  $ yarun run android (react-native run android)
  ```

  

#### ๐งฉ **Main Functionalities**

**SignIn**

- ์๋๋ก๊ทธ์ธ
- ์์ด๋ ์ ์ฅ

**SignUp**

- ์ด๋ฉ์ผ ์ธ์ฆ
- ์์ด๋ ์ค๋ณต ์ฒดํฌ
- ๋น๋ฐ๋ฒํธ ํ์ธ, ํ๋ฒํธ ์์ฑ

**Profile**

- ๋ค์ค ๊ณ์  ์์ฑ 
- ์ด๋ฆ/๋์ด/์บ๋ฆญํฐ ์ ํ ๋ฐ ๋ณ๊ฒฝ ๊ธฐ๋ฅ

**Main**

- bgm ์์๊ฑฐ
- navigation

**Diary**

- ์ฒซ ์ผ๊ธฐ ์์ฑ์ Tutorial ์คํ
- Tutorial ๋ค์๋ณด๊ธฐ
- ์ฌ์ง ์ดฌ์ ๋ฐ ๊ฐค๋ฌ๋ฆฌ์์ ๊ฐ์ง๊ณ  ์ค๊ธฐ
- ์ด๋ฏธ์ง ์บก์๋
- ๋จ์ด TTS,  ๋ป ์ ๊ณต
- ๋จ์ด์ฅ ์ถ๊ฐ ๊ธฐ๋ฅ
- ์ผ๊ธฐ ์์ฑ ์ ์๋ ์ ์ฅ(debounceํ์ฉ)
- ๋ฌธ๋ฒ ์ฒดํฌ ๋ฐ ์ค๋ฅ ์ ๊ณต

**Word**

- ์ํ๋ฒณ๋ณ ์ถ๊ฐํ ๋จ์ด ๋ณด๊ธฐ
- ๋จ์ด  TTS, ๋ป ๋ฐ ์๋ฌธ ๋ณด๊ธฐ

**DiaryList**

- ์์ฑํ ์ผ๊ธฐ ์กฐํ
- ๊ฒ์ฌ๋ ์ผ๊ธฐ ํ์ธ (๋์ฅ ์ ๋ฌด)

**Setting**

- ํ๋ฒํธ ์ธ์ฆ

- ๋ชฉ์๋ฆฌ ๋ณ๊ฒฝ(TTS)
- ํ๋ฒํธ, ๋น๋ฐ๋ฒํธ, profile ๋ณ๊ฒฝ
- ํต๊ณ ๋ณด๊ธฐ
- ์ผ๊ธฐ ๊ฒ์ฌ
- ๋ก๊ทธ์์





โญ **Front-end** : <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Font Awesome-339AF0?style=flat-square&logo=Font Awesome&logoColor=white"/>

โญ **Back-end** : <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=MariaDB&logoColor=white"/><img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=Django&logoColor=white"/><img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=black"/><img src="https://img.shields.io/badge/Python-3766AB?style=flat-square&logo=Python&logoColor=white"/> <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=PyTorch&logoColor=white"/> <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=TensorFlow&logoColor=white"/>

โญ **Common** : <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/GitLab-FCA121?style=flat-square&logo=GitLab&logoColor=black"/><img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=black"/> <img src="https://img.shields.io/badge/NGINX-269539?style=flat-square&logo=NGINX&logoColor=black"/><img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/><img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=flat-square&logo=JSON Web Tokens&logoColor=white"/>

![image-20210407223533848](README.assets/image-20210407223533848.png)

๐ **ERD**

<img src="README.assets/finalERD.png" alt="ํนํํ๋ก์ ํธERD" style="zoom:60%;" />



#### ๐จโ๐ฉโ๐งโ๐ง **Our Team**

|    ์ด๋ฆ    | ์ง์ฑ |                            ์ญํ                             |
| :--------: | :--: | :--------------------------------------------------------: |
| **๋ช๋๊ท ** | ํ์ฅ |       Frontend(์ฑ ๊ฐ๋ฐ), ๊ธฐํ ,UCC ์ ์, README ์์ฑ       |
| **์ ๋ฏผํธ** | ํ์ |               Frontend(์ฑ ๊ฐ๋ฐ), ํ์๋ก๊ด๋ฆฌ                |
| **์ ์ง์ฐ** | ํ์ |           Frontend(์ฑ ๊ฐ๋ฐ), Git master, Design            |
| **์ค์งํด** | ํ์ |              Frontend(์ฑ ๊ฐ๋ฐ), QA, JIRA ๊ด๋ฆฌ              |
| **์ฅ์๋ฏผ** | ํ์ |                    Backend(DB), AWS๊ด๋ฆฌ                    |
| **์ ์์** | ํ์ | Backend (AI), Frontend(์ฑ ์๊ฐ ํ์ด์ง), ํํฌ๋ฆฌ๋, UCC ์ ์ |



#### ๐ ๊ฐ๋ฐ ๊ท์น

๐ **Commit message**

```
์์ :

[feat/FE] : ์ ๋ชฉ
##### ์ ๋ชฉ์ ์ต๋ 50 ๊ธ์๊น์ง๋ง ์๋ ฅ ############## -> |
๋ด์ฉ
######## ๋ณธ๋ฌธ์ ํ ์ค์ ์ต๋ 72 ๊ธ์๊น์ง๋ง ์๋ ฅ ########################### -> |
```

```
feat       : ์๋ก์ด ๊ธฐ๋ฅ ์ถ๊ฐ
fix        : ๋ฒ๊ทธ ์์ 
refactor   : ์ฝ๋ ๋ฆฌํฉํ ๋ง
style      : ์ฝ๋ ํฌ๋งทํ, ์ธ๋ฏธ์ฝ๋ก  ๋๋ฝ, ์ฝ๋ ๋ณ๊ฒฝ์ด ์๋ ๊ฒฝ์ฐ
docs       : ๋ฌธ์ ์์ 
test       : ํ์คํธ ์ฝ๋, ๋ฆฌํฉํ ๋ง ํ์คํธ ์ฝ๋ ์ถ๊ฐ
chore      : ๋น๋ ์๋ฌด ์์ , ํจํค์ง ๋งค๋์  ์์ 
 ------------------
#     ์ ๋ชฉ ์ฒซ ๊ธ์๋ฅผ ๋๋ฌธ์๋ก
#     ์ ๋ชฉ์ ๋ช๋ น๋ฌธ์ผ๋ก
#     ์ ๋ชฉ ๋์ ๋ง์นจํ(.) ๊ธ์ง
#     ์ ๋ชฉ๊ณผ ๋ณธ๋ฌธ์ ํ ์ค ๋์ ๋ถ๋ฆฌํ๊ธฐ
#     ๋ณธ๋ฌธ์ "์ด๋ป๊ฒ" ๋ณด๋ค "๋ฌด์์", "์"๋ฅผ ์ค๋ชํ๋ค.
#     ๋ณธ๋ฌธ์ ์ฌ๋ฌ์ค์ ๋ฉ์์ง๋ฅผ ์์ฑํ  ๋ "-"๋ก ๊ตฌ๋ถ
```

๐ฒ **Branch**

- **master**

- **develop**

- ๋ฌธ์์ผ ๊ฒฝ์ฐ : docs/[name]-[status]

- ์์ ํ  ๊ฒฝ์ฐ : hotfix/[part]-[name]

- ๊ธฐ๋ฅ : feature/[part]-[name]-[status]

  - \*part : FE or BE

  - \*name : ๊ธฐ๋ฅ ๋ฑ ์์ 

  - \*status : ๊ธฐ๋ฅ์ ํ ๋ฒ์ ์์ฑํ์ง ๋ชปํ์ ๊ฒฝ์ฐ ์ถ๊ฐ๋ก ํ  ๋

    (ex. init, second, processing, end)

๐ป **Code**

- **์ ์ฒด format**
  
  - ESLint, prettier ์ฌ์ฉ
- naming
  - Django(Python)
    - Snake case (ex. snake_case) : ๋ณ์, ํจ์, ๋ฉ์๋
    - Pascal case (ex. PascalCase) : ํด๋์ค
  - React-native
    - Pascal case (ex. PascalCase) : ํด๋์ค
    - Camel case (ex. camelCase) : ๊ธฐํ
    
    

#### ๐ท Gallery

<img src="README.assets/cap.jpg" alt="cap" style="zoom:50%;" />

<img src="README.assets/writediary.png" alt="writediary" style="zoom:50%;" />

<img src="README.assets/alpha.jpg" alt="alpha" style="zoom:50%;" />

<img src="README.assets/wordlist.jpg" alt="wordlist" style="zoom:50%;" />

<img src="README.assets/statbyword.png" alt="statbyword" style="zoom:50%;" />
