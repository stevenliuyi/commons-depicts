import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import WebFont from 'webfontloader'

WebFont.load({
    google: {
        families: [
            'Montserrat:700',
            'san-serif'
        ]
    }
})

ReactDOM.render(<App />, document.getElementById('root'));
