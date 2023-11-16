import React, { Component }  from 'react';
import ReactDOM from 'react-dom/client';

import "./common/i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.scss';

import { MainView } from './view/MainView';

class HtmlBootstrapEditorShowcaseApp extends Component{
  render(){
    let main = <MainView/>;
    return main;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HtmlBootstrapEditorShowcaseApp/>);