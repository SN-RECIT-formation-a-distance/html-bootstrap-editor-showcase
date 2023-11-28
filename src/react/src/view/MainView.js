import React, { Component }  from 'react';
import { Navbar, Nav, NavDropdown, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import {faHome,  faSearch, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Options } from '../Options';
import {$glVars} from "../common/common";
import {Assets} from "../assets/Assets";
import { GenericTemplate, SpecificTemplate } from './views';

export class MainView extends Component{
  static defaultProps = {
    showCloseButton: false
  };

  constructor(props){
    super(props);

    this.onNavbarSelect = this.onNavbarSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);

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
  }

  render(){
    let main = 
    <div>                
        <Navbar bg="dark" variant="dark" onSelect={this.onNavbarSelect} expand="sm">
            <Navbar.Brand>
                <img alt="RÉCIT" src={Assets.RecitLogo} width="30" height="30" className="d-inline-block align-top" />{' '}
                {$glVars.i18n.tags.appName}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link eventKey="home"><FontAwesomeIcon icon={faHome} title={$glVars.i18n.tags.home}/></Nav.Link>
                </Nav>
                
                <Nav className="mr-auto"></Nav>
                <Nav >
                  <Form inline>
                    <InputGroup>
                      <FormControl type="text" placeholder="Search" onChange={this.onSearch} disabled={(this.state.view === 'home')} />
                        <InputGroup.Prepend>
                          <InputGroup.Text><FontAwesomeIcon icon={faSearch} title={$glVars.i18n.tags.search}/></InputGroup.Text>
                        </InputGroup.Prepend>
                      </InputGroup>
                  </Form>

                  <NavDropdown className='ml-5' title={this.languageList[this.state.lang]} id="nav-dropdown-language">
                   {Object.entries(this.languageList).map((item, index) => {  
                      return (<NavDropdown.Item eventKey={item[0]} key={index}>{item[1]}</NavDropdown.Item>);
                    })}
                  </NavDropdown>

                  {this.props.showCloseButton && 
                    <Nav className='ml-5'> 
                      <Nav.Link eventKey="exit"><FontAwesomeIcon icon={faTimesCircle} title={$glVars.i18n.tags.exit}/></Nav.Link>
                    </Nav>
                  }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        {['home', 'generic'].includes(this.state.view) && <GenericTemplate view={this.state.view} onDetails={this.onNavbarSelect}/>}
        {['home', 'specific'].includes(this.state.view) && <SpecificTemplate view={this.state.view} onDetails={this.onNavbarSelect}/>}
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
      case Object.keys(this.languageList).includes(eventKey):
        this.setState({lang: eventKey});
        break;
      case 'exit':
        window.parent.postMessage({ message: "showcase-exit" }, "*");
        break;
      default:
        break;
    }
  }

  onSearch(event){
    $glVars.queryStr = event.target.value;
    this.forceUpdate();
  }
}