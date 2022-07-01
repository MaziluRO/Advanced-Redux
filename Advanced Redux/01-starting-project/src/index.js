import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reduxStore from './reduxStore/reduxStore';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={reduxStore}>
		<App />
	</Provider>
);
