import React, { Component }  from 'react';
import { Navbar, Nav, NavDropdown, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import {faHome,  faSearch, faSpinner, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Options } from '../Options';
import {$glVars} from "../common/common";
import {Assets} from "../assets/Assets";
import { GenericTemplate, SpecificTemplate } from './views';
import { Loading } from '../libs/components/components'; 

export class MainView extends Component{
  static defaultProps = {
  };

  constructor(props){
    super(props);

    this.onNavbarSelect = this.onNavbarSelect.bind(this);

    this.state = {
      view: 'home', // home, generic, specific
      lang: 'fr'
    };

    this.languageList = {
      fr: 'Français',
      en: 'English'
    }
  } 

  componentDidMount(){
    window.document.title = Options.appTitle(); 

    let that = this;
    $glVars.webApi.getTemplates((result) => {
      $glVars.data = result;
      that.forceUpdate();
    });

    $glVars.i18n.setLang(this.state.lang);
  }

  render(){
    let that = this;
    let main = 
    <div>                
        {['home', 'generic'].includes(this.state.view) && <GenericTemplate view={this.state.view} onDetails={this.onNavbarSelect}/>}

        {['home', 'specific'].includes(this.state.view) && <SpecificTemplate view={this.state.view} onDetails={this.onNavbarSelect}/>}

        <Loading webApi={$glVars.webApi}><FontAwesomeIcon icon={faSpinner} pulse/></Loading>

        <footer style={{position: "fixed", bottom: 0}} className='bg-dark w-100  text-white d-flex justify-content-center align-items-center'>
          <span>Veuillez sélectionner la langue de votre choix: </span>
          {Object.entries(this.languageList).map((item, index) => {  
              let selected = (this.state.lang === item[0] ? {textDecoration: 'underline'} : null);
              return (<Button className='text-white' style={selected}  key={index} variant='link' onClick={() => this.onNavbarSelect(item[0])}>{item[1]}</Button>);
          })}
        </footer>
    </div>;

    return main; 
  }

  onNavbarSelect(eventKey){ 
    switch(eventKey){
      case 'home':
      case 'generic':
      case 'specific':
        this.setState({view: eventKey});
        break;
      case 'en':
      case 'fr':
        $glVars.i18n.setLang(eventKey);
        this.setState({lang: eventKey});
        break;
      default:
        break;
    }
  }

  
}