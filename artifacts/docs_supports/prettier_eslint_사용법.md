# prettier_eslint_사용법
- prettier : 코드(텍스트)가 일관되게 작성할 수 있도록 도와주는 환경 설정
- eslint : 일관성 있는 방식으로 구현할 수 있도록 (코드 구현 방식)
```
    {
        // .prettier.json
        "singleQuoto": true, // 문자열은 따옴표로 formatting
        "semi": true, // 코드 마지막에 세미콜론이 있게 formatting
        "useTabs": false, // 탭의 사용을 금지하고, 스페이스바 사용하게
        "tabWidth": 2, // 들여쓰기 너비 2칸
        "trailingComma": "all", // 객체나 배열 키:값 뒤에 항상 콤마
        "printWidth": 80, // 코드 한 줄 최대 길이 80자
        "arrowParens": "avoid", // 화살표 함수가 하나의 매개변수를 받을 때 괄호 생략
        "bracketSpacing": true  // [1,2] -> [ 1, 2 ]
    }
```
```
    {
        // .eslintrc.json
        "env": {
            "browser": true,
            "es2021": true,
            "node": true,
            "commonjs": true
        },
        // 저장되어 있는 외부 file 을 extends 하는 부분
        "extends": ["airbnb-base", "plugin:prettier/recommended"],
        "parserOptions": {
            "ecmaVersion": 13,
            "sourceType": "module"
        },
        "plugins": ["prettier"],
        // 직접 lint rule 을 적용하는 부분
        "rules": {
            
        }
    }
```