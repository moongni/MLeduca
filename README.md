# Serverless Web App For Machine Learning Education V.1.0.0

서버리스 머신러닝 교육용 웹앱은 수학공식과 복잡한 텍스트 코딩이 필요한 머신러닝 교육에 앞서 머신러닝의 전반적인 흐름을 직접 조작하고 그 조작을 직관적으로 보여줄 수 있는 도구를 통해 머신러닝을 처음 접하는 이들을 위한 교육용 웹앱이다. 

 ![앱 이미지](https://user-images.githubusercontent.com/88421322/204120058-71f4b0b3-88a1-4d97-b44c-bac99b401ba3.png)


## 기능

- 데이터 적재: URL, json, csv 파일을 통한 데이터 적재, 데이터 뷰 테이블
- 데이터 전처리: 라벨 열, 특성 열 설정과 각 열별 전처리 옵션 설정
- 신경망 구성: 레이어 구성 및 손실 함수 최적화 함수 설정
- 학습
- 예측
- 분석: 데이터 산점도, 학습 결과 시각화
- 다운로드: 모델 및 설정 파일 다운로드 

## Requirements

### `Node.js 설치`
이 웹앱은 Node.js를 기반으로 React.js 프레임워크를 사용하여 만들었습니다.

Node.js 14.16.1 이후의 버전으로 다운받습니다.

[Node.js 다운로드 페이지](https://nodejs.org/en/download/)

[Node.js github](https://github.com/nodejs/node)


### `웹 앱 다운로드`

빌드된 웹앱을 다운받습니다. 

`git clone https://github.com/moongni/ServerlessWebAppForMachineLearningEducation.git`

### 앱 실행

다운로드한 웹앱 디렉토리에서 cmd 또는 터미널에서 아래의 명령어를 실행합니다.

```
npm install -g serve  
serve -s build
```

빌드가 완료되면 앱을 시작합니다.

앱을 실행하면 브라우저에서 [http://localhost:3000](http://localhost:3000) 에서 앱을 실행할 수 있습니다.

실행하는 포트 설정을 변화하면 주소는 바뀔 수 있습니다.

## 소스코드


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
