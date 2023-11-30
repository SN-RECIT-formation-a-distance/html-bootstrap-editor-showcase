import React, { Component }  from 'react';
import ReactDOM from 'react-dom/client';

import "./common/i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.scss';

import { MainView } from './view/MainView';

class HtmlBootstrapEditorShowcaseApp extends Component{
  static defaultProps = {
    
  };

  render(){
    let main = <MainView showCloseButton={this.props.showCloseButton}/>;
    return main;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<HtmlBootstrapEditorShowcaseApp/>); 