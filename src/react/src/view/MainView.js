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
        <div className='alert alert-warning p-3 m-3'>
            <h1 className='mb-4'>⚠️ Cette vitrine a été déplacée</h1>
            <p>La vitrine est maintenant disponible à la nouvelle adresse suivante : <strong>https://cssbe-distance-learning.github.io/html-bootstrap-editor-showcase/index.html</strong></p>
            <p>Veuillez mettre à jour la configuration <strong>showcase_url</strong> dans l'administration de votre site Moodle afin qu'elle pointe vers cette nouvelle URL.</p>
            <p className='mb-5'>L'ancienne adresse pourrait être retirée dans une prochaine version. Merci de procéder à cette mise à jour dès que possible.</p>

            <hr/>

            <h1 className="mt-5 mb-4">⚠️ This Showcase Has Moved</h1>
            <p>The showcase is now available at the following address: <strong>https://cssbe-distance-learning.github.io/html-bootstrap-editor-showcase/index.html</strong></p>
            <p>Please update the <strong>showcase_url</strong> setting in your Moodle site's administration so that it points to this new URL.</p>
            <p>The previous address may be removed in a future release. Please update your configuration as soon as possible.</p>
        </div>        
        
        <Loading webApi={$glVars.webApi}><FontAwesomeIcon icon={faSpinner} pulse/></Loading>

        
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