import ReactDOM from 'react-dom/client';
//react-dom 패키지는 ReactDOM이라는 객체를 export하고요 우린 그걸 index.js로 import 하고 있습니다. 그리고 우린 ReactDOM을 index.js에 import한 다음에 거기 있는 createRoot 메서드를 호출합니다.
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


//맨 처음으로 실행되는 코드가 index.js 파일 안에 들어있다.
//정확히는 그 코드가 실행되는 게 아니라 그 코드의 변환된 버전이 실행되는 것
//npm start 프로세스는 이 개발 서버를 시작하고 우리의 코드를 감시하고 우리의 코드를 단순히 전달하는 것이 아니라 전달하기 전에 코드를 변환할 겁니다.
// 그러면 브라우저 안에는 이 코드를 받았을 때는 작동하지 않는 어떤 추가적인 기능이 작동하게 됩니다.
