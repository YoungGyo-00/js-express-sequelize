// 서버 실행하는 동작 코드
const app = require('../app.js');

// listen() => 서버 설정 및 실행
app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 에서 대기 중');
})