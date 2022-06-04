import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import CartProvider from './store/CartProvider';
import CartHandlerProvider from './store/CartHandlerProvider';

ReactDOM.render(
    <CartProvider>
        <CartHandlerProvider>
            <App />
        </CartHandlerProvider>
    </CartProvider>
    , document.getElementById('root'));
