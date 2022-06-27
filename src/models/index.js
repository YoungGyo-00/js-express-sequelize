// 모델을 정의 + 관계 설정 파일 => Sequelize 객체들이 DAO
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // 배포 환경에 따라 다른 값을 저장하는 변수
const config = require("../config/config")[env]; // sequelize 설정 변수 읽어오기
const fs = require("fs"); // 파일 읽기 모듈
const path = require("path");

const basename = path.basename(__filename); // index.js
const sequelize = new Sequelize( // sequelize 설정 부분
    config.database,
    config.username,
    config.password,
    config,
);

class Database {
    constructor() {
        this.db = {}; // 자기 차조 변수 => 생성할 인스턴스 가리킴
        this.setModel(); // model 객체 등록
        this.init(); // model 객체의 init() 함수 실행
        this.associate(); // model 객체의 associate() 함수 실행
        this.db.sequelize = sequelize;
    }

    setModel() {
        fs.readdirSync(__dirname) // node 작업 디렉토리 기반 상대 경로 설정
            .filter(file => {
                return (
                    file.indexOf(".") !== 0 &&
                    file !== basename &&
                    file.slice(-3) === ".js"
                ); // 모델 파일만 배열 구성
            })
            .forEach(file => {
                const model = require(path.join(__dirname, file)); // 파일에 저장되어 있는 모델 정의와 동일한 객체 저장
                this.db[model.name] = model; // 객체 추가
            });
    }

    init() {
        Object.keys(this.db).forEach(modelName => {
            this.db[modelName].init(sequelize);
        });
    }

    associate() {
        Object.keys(this.db).forEach(modelName => {
            if (this.db[modelName].associate) {
                this.db[modelName].associate(this.db);
            }
        });
    }
}

module.exports = new Database().db;
