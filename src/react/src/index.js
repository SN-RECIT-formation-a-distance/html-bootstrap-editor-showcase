import React, { Component }  from 'react';
import ReactDOM from 'react-dom/client';

import "./common/i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.scss';

import { MainView } from './view/MainView';
import Utils from './libs/utils/Utils';

class HtmlBootstrapEditorShowcaseApp extends Component{
  static defaultProps = {
    showCloseButton: false
  };

  render(){
    let main = <MainView showCloseButton={this.props.showCloseButton}/>;
    return main;
  }
}

let urlVars = Utils.getUrlVars({close: '0'});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<HtmlBootstrapEditorShowcaseApp showCloseButton={urlVars.close.toString() === '1'}/>); 