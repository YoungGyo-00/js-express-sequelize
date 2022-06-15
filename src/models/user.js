const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    // 공개하고 싶지 않은 속성(getter & setter 불가능)

    // 모델의 속성 정의 부분(공개)
    static init(sequelize){
        return super.init({
            userId: {
                type: Sequelize.STRING(70),
                primaryKey: true
            }
        }, {
            // 모델의 속성 이외의 추가적인 옵션
            sequelize,
            timestamps: false, // createdAt, updatedAt 생성(true)
            underscored: false, 
            modelName: 'User',
            tableName: 'users',
            paranoid: false, // deletedAt 생성(true)
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    // 연관관계 설정
    static associate(db){

    };
};