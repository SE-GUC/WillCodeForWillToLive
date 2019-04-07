import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';



=======
import 'bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv'
dotenv.config()
>>>>>>> bd7a7e840a9e2fc958f2c53e9030bfb068329900
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();



