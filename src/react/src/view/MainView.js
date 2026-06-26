import React, { Component }  from 'react';
import { Button } from 'react-bootstrap';
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
    this.getCollectionFromUrl = this.getCollectionFromUrl.bind(this);

    this.state = {
      view: 'home', // home, generic, specific
      lang: 'fr',
      collection: null
    };

    this.languageList = {
      fr: 'Français',
      en: 'English'
    }
  } 

  componentDidMount(){
    window.document.title = Options.appTitle(); 

    $glVars.webApi.getTemplates((result) => {
      $glVars.data = result;
      const collection = this.getCollectionFromUrl(result);
      this.setState({
        collection,
        view: collection ? collection.type : this.state.view
      });
    });

    $glVars.i18n.setLang(this.state.lang);
  }

  render(){
    let main = 
    <div>                
        {['home', 'generic'].includes(this.state.view) && <GenericTemplate view={this.state.view} onDetails={this.onNavbarSelect} collection={this.state.collection}/>}

        {['home', 'specific'].includes(this.state.view) && <SpecificTemplate view={this.state.view} onDetails={this.onNavbarSelect} collection={this.state.collection}/>}

        <Loading webApi={$glVars.webApi}><FontAwesomeIcon icon={faSpinner} pulse/></Loading>

        <footer className='mt-5 bg-dark w-100  text-white d-flex justify-content-center align-items-center'> 
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

  getCollectionFromUrl(data){
    if(typeof window === 'undefined'){ return null; }

    const params = new URLSearchParams(window.location.search);
    const requestedCollection = params.get('collection');

    if(!requestedCollection){ return null; }

    const normalizedCollection = requestedCollection.trim().toLowerCase();

    const genericMatch = (data.generic || []).find((item) => {
      return item && item.name && item.name.trim().toLowerCase() === normalizedCollection;
    });

    if(genericMatch){
      return { type: 'generic', data: genericMatch };
    }

    const specificMatch = (data.specific || []).find((item) => {
      return item && item.name && item.name.trim().toLowerCase() === normalizedCollection;
    });

    if(specificMatch){
      return { type: 'specific', data: specificMatch };
    }

    return null;
  }
  
}