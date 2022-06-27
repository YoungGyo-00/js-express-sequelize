const express = require("express"); // http 모듈 + 많은 기능 포함
const morgan = require("morgan"); // request 에 대한 추가 로그를 콘솔에 기록
const cookieParser = require("cookie-parser"); // 요청된 쿠키를 쉽게 추출하는 미들웨어
// const path = require("path"); // 파일 경로 찾을 때 사용하는 모듈
const passport = require("passport"); // 로그인(local, kakao ...)에 따른 요청 인증 모듈
const passportConfig = require("./passport");
const session = require("express-session"); // passport 모듈로 로그인 후 유저 정보를 세션에 저장
const dotenv = require("dotenv"); // 환경변수 파일 읽기
// const { UUID } = require("sequelize"); // 세션 ID 를 랜덤하고 중복되지 않게 만들기 위한 모듈
const FileStore = require("session-file-store")(session); // 세션 객체 저장 모듈
const cors = require("cors"); // 외부 도메인, 프로토콜, 포트에 있는 리소스를 요청하는 cross-orgin HTTP 요청 처리
dotenv.config(); // .env 파일을 읽을 수 있게 설정 => ex) process.env.PORT

const MainRouter = require("./api/routes");
const { PORT, COOKIE_SECRET } = process.env;

// 서버 생성
class App {
    constructor() {
        this.app = express(); // express() => 애플리케이션 객체 생성
        this.setMiddleWare();
        this.setStatic();
        this.getRouter();
        this.errorHandler();
    }

    // 미들웨어 설정
    setMiddleWare() {
        this.app.set("port", PORT || 8080); // .env 파일에 key값이 PORT 가져오기 => 없으면 8080번(기본값) 포트 사용
        passportConfig(); // passport 미들웨어는 passport 폴더에서 실행

        this.app.use(cors()); // 모든 도메인에 대해 허용
        this.app.use(morgan("dev")); // 추가적인 로그 생성
        this.app.use(express.json()); // json Request Body 파싱
        this.app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded 형태 데이터 파싱, querystring(false), qs(true)
        this.app.use(cookieParser(COOKIE_SECRET)); // 암호화(서명)된 쿠키 발급
        this.app.use(
            session({
                resave: false, // 세션 데이터가 바뀌기 전까지 세션저장소의 값을 저장할지 여부
                secret: COOKIE_SECRET, // cookieParser와 같은 signed(서명) 사용
                store: new FileStore(), // mysql(실제 배포 시) 에 세션을 저장할 수도 있음
                saveUninitialized: false, // 세션이 필요하기 전에 세션 구동할지 여부
                cookie: {
                    // 세션 쿠키 설정
                    httpOnly: true, // JS를 통해 세션 쿠키를 사용할 수 없도록 설정
                    secure: false, // http 환경에서만 사용(개발 단계)
                    maxAge: 1 * 60 * 60 * 1000, // 1시간 설정
                },
                rolling: true, // expiration reset
                genid: () => {
                    // 세션 ID 만들기, req 첨부된 일부 값을 사용하려면 첫 번째 인수로 req 제공
                    return "testCookie";
                },
            })
        );
        this.app.use(passport.initialize()); // passport 구성을 위한 미들웨어
        this.app.use(passport.session()); // passport.deserializeUser() Method 실행
    }

    // 사진 등의 정적 파일 경로 설정
    setStatic() {
        // this.app.use('/', express.static(path.join(__dirname + 'public')));
    }

    // 라우터 설정
    getRouter() {
        this.app.use(MainRouter);
    }

    // 에러 처리 미들웨어 => 비동기 에러 처리 문제 해결 방법 찾아야 함
    errorHandler() {
        this.app.use((req, res, next) => {
            const err = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
            err.status = 404;
            next(err);
        });

        // eslint-disable-next-line no-unused-vars
        this.app.use((err, req, res, next) => {
            res.locals.message = err.message;
            res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
            res.status(err.status || 500);

            console.error(err);
            res.json({ message: err.message });
        });
    }
}

module.exports = new App().app;
