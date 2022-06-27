// 서버 실행하는 동작 코드
const app = require("../app.js");
const { sequelize } = require("../models");

// MySQL 연결
sequelize
  .sync({ force: false }) // 모델에서 정의한 테이블이 존재하지 않을 경우 동작, force : 강제 업데이트
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    // 에러 잡아주는 코드
    console.error(err);
  });

// listen() => 서버 설정 및 실행
app.listen(app.get("port"), () => {
  console.log(app.get("port") + "번 에서 대기 중");
});
