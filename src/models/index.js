// 모델을 정의 + 관계 설정 파일 
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; // 배포 환경에 따라 다른 값을 저장하는 변수
const config = require('../config/config')[env]; // sequelize 설정 변수 읽어오기
const fs = require('fs'); // 파일 읽기 모듈
const path = require('path'); // 
const basename = path.basename(__filename); // index.js

class Database {
  constructor() {
    const db = {};
    const sequelize = new Sequelize(
      config.database, config.username, config.password, config
    );

    fs.readdirSync(__dirname) // node 작업 디렉토리 기반 상대 경로 설정
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) ==='.js'); // 모델 파일만 배열 구성
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file)); // 파일에 저장되어 있는 모델 정의와 동일한 객체 저장
        db[model.name] = model; // 객체 추가
      });

    Object.keys(db).forEach(modelName => {
      db[modelName].init(sequelize); // 객체의 init() 함수 실행
    });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db); // 모델 객체의 associate() 함수 실행
      }
    });

    db.sequelize = sequelize;
  }
}


module.exports = new Database().db;