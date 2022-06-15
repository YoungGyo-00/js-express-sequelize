// DB 환경 설정 파일
const dotenv = require('dotenv');
dotenv.config();

const {MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_DATABASE_TEST, MYSQL_HOST, DIALECT} = process.env;

// 개발 단계 환경 설정
const development = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  dialect: DIALECT
};

// 배포 단계
const production = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE_PRODUCTION,
  host: MYSQL_HOST,
  dialect: DIALECT
};

// 테스트 단계
const test = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE_TEST,
  host: MYSQL_HOST,
  dialect: DIALECT
};

module.exports = { development, production, test };