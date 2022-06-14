// 서버 동작 규정 코드
const express = require('express'); // http 모듈 + 많은 기능 포함
const morgan = require('morgan'); // request 에 대한 추가 로그를 콘솔에 기록
const cookieParser = require('cookie-parser'); // 요청된 쿠키를 쉽게 추출하는 미들웨어
const path = require('path'); // 파일 경로 찾을 때 사용하는 모듈
const passport = require('passport'); // 로그인(local, kakao ...)에 따른 요청 인증 모듈
const session = require('express-session'); // passport 모듈로 로그인 후 유저 정보를 세션에 저장
const dotenv = require('dotenv'); // 환경변수 파일 읽기
const { UUID } = require('sequelize');
const FileStore = require('session-file-store')(session); // 세션 객체 저장 모듈

// 서버 생성
class App {
    constructor() {
        this.app = express(); // express() => 애플리케이션 객체 생성
        this.setMiddleWare();
        this.setStatic();
        this.getRouting();
        this.errorHandler();
    }

    // 미들웨어 설정
    setMiddleWare() {
        dotenv.config(); // .env 파일을 읽을 수 있게 설정 => ex) process.env.PORT
        this.app.set('port', process.env.PORT || 8080); // .env 파일에 key값이 PORT 가져오기 => 없으면 8080번(기본값) 포트 사용

        this.app.use(morgan('dev')); // 추가적인 로그 생성
        this.app.use(express.json()); // json Request Body 파싱
        this.app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded 형태 데이터 파싱, querystring(false), qs(true)
        this.app.use(cookieParser(process.env.COOKIE_SECRET)); // 암호화(서명)된 쿠키 발급
        this.app.use(session({
            resave: false, // 세션 데이터가 바뀌기 전까지 세션저장소의 값을 저장할지 여부
            secret: process.env.COOKIE_SECRET, // cookieParser와 같은 signed(서명) 사용
            store: new FileStore(), // mysql(실제 배포 시) 에 세션을 저장할 수도 있음
            saveUninitialized: false, // 세션이 필요하기 전에 세션 구동할지 여부
            cookie: { // 세션 쿠키 설정
                httpOnly: true, // JS를 통해 세션 쿠키를 사용할 수 없도록 설정
                secure: false, // http 환경에서만 사용(개발 단계) 
                maxAge: 1*60*60*1000 // 1시간 설정
            },
            rolling: true // expiration reset
        }));
        this.app.use(passport.initialize()); // passport 구성을 위한 미들웨어
        this.app.use(passport.session());
    }

    // 사진 등의 정적 파일 경로 설정
    setStatic() {
        // this.app.use('/', express.static(path.join(__dirname + 'public')));
    }

    // 라우터 설정
    getRouting() {

    }

    // 에러 처리 미들웨어 => 비동기 에러 처리 문제 해결 방법 찾아야 함
    errorHandler() {

        this.app.use((req, res, next) => {
            const err = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
            error.status = 404;
            next(error);
        });

        this.app.use((err, req, res, ) => {
            res.locals.message = err.message;
            res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
            res.status(err.status || 500);
            
            console.log();
            res.status(500).json({ message : error.message });
        });
    }
}

module.exports = new App().app;