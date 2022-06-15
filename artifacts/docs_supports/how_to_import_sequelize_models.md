# Sequelize.import is not a function error 처리 방법
Sequelize 6부터 import 문 사용 시, 에러 발생하므로 아래와 같이 코드를 변경

```
    // 기존 코드
    const model = sequelize.import(path.join(__dirname, file));

    // 수정 코드, 뒤 인자는 모델 생성 방식에 조금씩 다름
    const model = require(path.join(__dirname, file))
```
