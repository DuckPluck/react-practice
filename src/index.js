import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import {BrowserRouter} from 'react-router-dom';
// import {Introducingjsx} from './1.2_introducing-jsx/introducing-jsx';
// import {NumberList, numbers} from './1.8_lists-and-keys/lists-and-keys';
// import {NameForm} from './1.9_forms/forms';
import {Calculator} from './1.10_lifting-state-up/lifting-state-up';


ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Calculator />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);



