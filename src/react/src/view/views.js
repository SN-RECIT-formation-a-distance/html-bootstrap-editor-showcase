import React, { Component }  from 'react';
import { Button, Card, Carousel, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { $glVars } from '../common/common';
import { ToggleButtons } from '../libs/components/ToggleButtons';
import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Assets } from '../assets/Assets';


export class GenericTemplate extends Component{
    static defaultProps = {
        onDetails: null,
        view: ''
    };

    constructor(props){
      super(props);

      this.onBack = this.onBack.bind(this);
      this.onDetails = this.onDetails.bind(this);
  
      this.state = {details: null};
    } 

    componentDidUpdate(prevProps){
        if((prevProps.view !== this.props.view) && (this.props.view !== 'generic')){
            this.setState({details: null});
        }
    }

    render(){
        if($glVars.data === null){ return null; }

        let main =
            <section className="p-4 rounded-0 m-0 bg-light">
                <div>
                    <div className="container px-md-4 px-lg-5 py-3 py-md-4 py-lg-5" >
                        <div className="row-fluid flex-md-row d-flex justify-content-center align-items-center" >
                            <div className="col-8 col-md-4" >
                                <div className="mb-0 text-center">
                                    <img src={Assets.BootstrapLogo} alt='Bootstrap logo' className="img-fluid rounded shadow" />
                                </div> 
                            </div>
                            <div className="col-md-8" >
                                <div className="mb-0 text-center">
                                    <h1 className="display-4" >{$glVars.i18n.tags.genericTemplates}</h1>
                                    <p  dangerouslySetInnerHTML={{__html: $glVars.i18n.tags.genericTemplatesText}}></p>
                                    <hr className="my-4" align="center" width="50%" />

                                    {$glVars.data.generic.map((item, index) => {  
                                        return ( <Button key={index} size="lg" className="mx-2" onClick={() => this.onDetails(item)}>{item.name}</Button>);
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>;

        if(this.state.details !== null){
            return <CollectionDetails data={this.state.details} nameAlt={`${$glVars.i18n.tags.genericTemplates} ${this.state.details.name}`} onBack={this.onBack}/>;
        }
        else{
            return main;
        }
    }

    onDetails(data){
        this.setState({details: data}, this.props.onDetails('generic'));
    }

    onBack(){
        this.props.onDetails('home')
    }
}

export class SpecificTemplate extends Component{
    static defaultProps = {
        onDetails: null,
        view: ''
    };
    
    constructor(props){
      super(props);
  
      this.onDetails = this.onDetails.bind(this);
      this.onFilterChange = this.onFilterChange.bind(this);
      this.onBack = this.onBack.bind(this);

      this.state = {
        details: null, 
        queryStr: ['all'],         
        };

        this.dropdownFilterList = []
    } 

    componentDidUpdate(prevProps){
        if((prevProps.view !== this.props.view) && (this.props.view !== 'specific')){
            this.setState({details: null});
        }
    }

    render(){
        if($glVars.data === null){ return null; }

        this.dropdownFilterList = [
            {text: $glVars.i18n.tags.all, value: 'all'},
            {text: $glVars.i18n.tags.english, value: 'en'},
            {text: $glVars.i18n.tags.french, value: 'fr'}
        ]

        let dataProvider = $glVars.data.specific;

        if(this.state.queryStr.length > 1){
            let that = this;
            dataProvider = dataProvider.filter(function(item){
                if(that.state.queryStr.includes('all')){
                    return true;
                }
                else{
                    return (that.state.queryStr.includes(item.lang)  ? true : false);
                }
            })
        }

        dataProvider = dataProvider.reduce((accumulator, currentValue, currentIndex, array) => {
            if (currentIndex % 2 === 0) {
                accumulator.push(array.slice(currentIndex, currentIndex + 2));
            }
            return accumulator;
        }, []);

        let main =
        <section className="text-center">
            <h1 className="display-4 text-center pt-5">{$glVars.i18n.tags.modelCollections}</h1>
            <p className="lead text-center" >{$glVars.i18n.tags.modelCollectionsText}</p>

            <div className="d-inline-flex justify-content-center align-items-center rounded border p-2 ">
                <ToggleButtons  name="filter" defaultValue={this.state.queryStr} type="radio" onChange={this.onFilterChange} 
                                                    options={this.dropdownFilterList}/>   
            </div>

            <hr style={{width: 400}}/> 

            <Carousel className='container' prevIcon={<FontAwesomeIcon icon={faArrowCircleLeft} className='fa-3x text-primary'/>}  nextIcon={<FontAwesomeIcon icon={faArrowCircleRight} className='fa-3x text-primary '/>}> 
                {dataProvider.map((items, index) => {  
                    let result =  
                        <Carousel.Item key={index}>
                            <div className="container pb-5"> 
                                <div className="row flex-md-row justify-content-center ">
                                    <div className="col-8 py-2 col-md-4" >
                                        <CarouselCard  data={items[0]} onDetails={this.onDetails}/>
                                    </div>
                                    <div className="col-8 py-2 col-md-4" >
                                        <CarouselCard  data={items[1] || null} onDetails={this.onDetails}/>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>;

                    return result;
                })}  
            </Carousel>
        </section>;

        let details = <CollectionDetails data={this.state.details} onBack={this.onBack}/>;

        return (this.state.details !== null ? details : main);
    }

    onDetails(data){
        this.setState({details: data}, this.props.onDetails('specific'));
    }

    onFilterChange(event){
        this.setState({queryStr: event.target.value});
    }
    
    onBack(){
        this.props.onDetails('home')
    }
}

export class CollectionDetails extends Component{
    static defaultProps = {
        nameAlt: "",
        data: null,
        onBack: null
    };

    constructor(props){
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = {selectedItem: null, filter: {tags: [], queryStr: ""}};
    }

    render(){
        if(this.props.data === null){ return null; }

        let that = this;
        let dataProvider = this.props.data.items;

        if(this.state.filter.tags.length > 0){
            dataProvider = dataProvider.filter((item) => {
                for(let tag of that.state.filter.tags){
                    if(item.tags.includes(tag)){
                        return true;
                    }
                }
                return false;
            });
        }

        if(this.state.filter.queryStr.length > 0){
            dataProvider = dataProvider.filter((item) => {
                let result = (item.name.toLowerCase().includes(that.state.filter.queryStr.toLocaleLowerCase()));
                if(result){
                    return true;
                }

                for(let tag of item.tags){
                    if(tag.toLowerCase().includes(that.state.filter.queryStr.toLocaleLowerCase())){
                        return true;
                    }
                }

                return false;
            });
        }

        let main =
        <div className='m-3'>
            <section className="rounded p-0 mt-2 mb-2">
                <div className="container-fluid m-0 p-0 bg-light rounded" >
                    <div className="row flex-column flex-md-row justify-content-center m-0 p-0 align-items-start">
                        <div className="m-0 p-0 col-sm-auto col">
                            <div style={{backgroundSize: 'cover', width: '240px'}} className="position-relative">
                                <div style={{WebkitMaskImage: `url('./img/mask_left.png')`, WebkitMaskSize: "100% 100%", WebkitMaskRepeat: 'no-repeat', WebkitMaskOrigin: "content-box",
                                        maskImage:  `url('./img/mask_left.png')`, maskSize: "100% 100%", maskRepeat: "no-repeat", maskOrigin: "content-box"}}>
                                    <img src={this.props.data.img} className="rounded-left img-fluid"/>
                                </div>
                            </div>
                        </div>
                        <div className="align-self-center m-0 p-0 col">                            
                            <div className="card border-0 p-0 m-0"> 
                                <div className="card-body bg-light text-center" >
                                    <h3>{(this.props.nameAlt.length > 0 ? this.props.nameAlt : this.props.data.name)}</h3>
                                    <span dangerouslySetInnerHTML={{__html: this.props.data.description}}></span>
                                </div>
                            </div>
                            <Form style={{width: "60%", margin: "auto"}} className='mb-2 mb-lg-0'> 
                                <InputGroup> 
                                    <FormControl type="text" placeholder={$glVars.i18n.tags.search} onChange={this.onSearch} />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FontAwesomeIcon icon={faSearch} title={$glVars.i18n.tags.search}/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Form>
                        </div>
                        <Button size='lg' variant='primary' className="m-2" onClick={this.props.onBack}><FontAwesomeIcon icon={faArrowLeft}/>{` ${$glVars.i18n.tags.back}`}</Button>
                    </div>
                </div>
            </section> 

            
            <div className="d-flex justify-content-center mt-3">
                {this.props.data.tags.map((item, index) => {  
                    let variant = (this.state.filter.tags.includes(item) ? 'badge-primary' : 'badge-secondary');
                    return (<span onClick={() => this.onFilter(item)} key={index} className={`badge ${variant} m-1 p-2`} style={{cursor: 'pointer'}}>{item}</span> );
                })}
            </div>
            <hr className="my-4"/>

            <div className='d-flex flex-wrap justify-content-around'>
                {dataProvider.length === 0 && <b>{$glVars.i18n.tags.noResults}</b>}
                {dataProvider.map((item, index) => {  
                    let result =
                        <Card key={index} style={{ width: '15rem' }} className='clickable m-2 text-center' onClick={() => this.onClick(item)}>
                            <div style={{height: 140}}>
                                <Card.Img variant="top" src={item.img} style={{maxHeight: '100%'}}/>
                            </div>
                            <Card.Body>
                                <Card.Title className='h6'>{item.name}</Card.Title>
                                {item.tags.map((item2, index2) => {  
                                    return (<span key={index2} className="badge badge-primary m-1">{item2}</span> );
                                })}
                            </Card.Body>
                        </Card>

                    return (result);
                })}
            </div>

            <ModalTemplate data={this.state.selectedItem} onClose={() => this.setState({selectedItem: null})}/>
        </div>;

        return main;
    }

    onClick(data){
        this.setState({selectedItem: data});
    }

    onFilter(tag){
        let filter = Object.assign(this.state.filter, {});

        if(this.state.filter.tags.includes(tag)){
            let index = filter.tags.indexOf(tag);
            filter.tags.splice(index, 1);
        }
        else{
            filter.tags.push(tag);
        }

        this.setState({filter: filter});
    }

    onSearch(event){
        let filter = this.state.filter;
        filter.queryStr = event.target.value;
        this.setState({filter: filter});
    }
}

export class ModalTemplate extends Component{
    static defaultProps = {
        data: null,
        onClose: null
    };

    constructor(props){
        super(props);

        this.onImport = this.onImport.bind(this);
    }

    render(){
        if(this.props.data === null){ return null; }

        let main =
            <Modal show={true} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.data.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <img style={{width: 450}} src={this.props.data.img} alt="Template thumbnail"/>
                </Modal.Body>

                <Modal.Footer>
                    <Button size='sm' variant="success" onClick={this.onImport}><FontAwesomeIcon icon={faDownload}/>{` ${$glVars.i18n.tags.import}`}</Button>
                </Modal.Footer>
            </Modal>;

        return main;
    }

    onImport(){
        window.parent.postMessage({ message: "import", value: this.props.data }, "*");
    }
}

export class CarouselCard extends Component{
    static defaultProps = {
        data: null,
        onDetails: null
    };

    render(){
        if(this.props.data === null){ return null; }

        let main =
            <div className="card shadow border-0 text-center h-100 bg-transparent">
                <div className="position-relative card-img-top" style={{height: '250px', backgroundImage: `url('${this.props.data.img}')`, backgroundSize: 'cover'}}>
                    <div className="position-absolute text-white p-2 w-100" style={{backgroundColor: 'rgba(27, 8, 8, 0.4)', bottom: '0px'}}  dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
                </div>
                <div className="card-body pb-0">
                    <h3>{this.props.data.name}</h3>
                </div>
                <div className="card-footer border-0 mb-0">
                    <Button onClick={() => this.props.onDetails(this.props.data)}>{$glVars.i18n.tags.access}</Button>
                </div>
            </div>;

        return main;
    }
}