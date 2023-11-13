import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
 const showCart = useSelector(state => state.ui.cartIsVisible) //스토어의 리듀서 맵 키 사용 ->  그 다음 관심 있는 프로퍼티 이름 사용
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
