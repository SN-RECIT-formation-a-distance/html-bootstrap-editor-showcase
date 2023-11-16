import React, { Component }  from 'react';
import { Button, Card, Carousel, Modal } from 'react-bootstrap';
import { $glVars } from '../common/common';
import { ToggleButtons } from '../libs/components/ToggleButtons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export class GenericTemplate extends Component{
    static defaultProps = {
        onDetails: null,
        view: ''
    };

    constructor(props){
      super(props);

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
            <section className="jumbotron rounded-0 m-0">
                <div>
                    <div className="container-fluid px-md-4 px-lg-5 py-3 py-md-4 py-lg-5" >
                        <div className="row-fluid flex-md-row d-flex justify-content-center align-items-center" >
                            <div className="col-8 col-md-4" >
                                <div className="mb-0 text-center">
                                    <img src="https://ena.recitfad.com/draftfile.php/17219/user/draft/20843757/bootstrap.jpg" alt='Bootstrap logo' className="img-fluid rounded shadow" />
                                </div>
                            </div>
                            <div className="col-md-8" >
                                <div className="mb-0 text-center">
                                    <h1 className="display-4" >Gabarits génériques</h1>
                                    <p >Les <strong >gabarits génériques</strong>&nbsp;mettent à profit les classes <strong >Bootstrap 4</strong> qui facilitent la création à partir d'une mise en page constituée <strong >d'images,&nbsp;</strong>de<strong> textes Lorem, de vidéo, etc</strong>.</p>
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

        let details = <CollectionDetails data={this.state.details}/>;

        return (this.state.details !== null ? details : main);
    }

    onDetails(data){
        this.setState({details: data}, this.props.onDetails('generic'));
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

      this.state = {
        details: null, 
        queryStr: [''], 
        dropdownLists: {
            filterList: [
                {text: 'Anglais', value: 'en'},
                {text: 'Français', value: 'fr'}
            ]
            }
        };
    } 

    componentDidUpdate(prevProps){
        if((prevProps.view !== this.props.view) && (this.props.view !== 'specific')){
            this.setState({details: null});
        }
    }

    render(){
        if($glVars.data === null){ return null; }

        let dataProvider = $glVars.data.specific;

        if(this.state.queryStr.length > 1){
            let that = this;
            dataProvider = dataProvider.filter(function(item){
                return (that.state.queryStr.includes(item.lang)  ? true : false);
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
            <h1 className="display-4 text-center pt-5">Collections de modèles</h1>
            <p className="lead text-center" >Chaque collection offre plusieurs gabarits modèles qui sont réunis en fonction d'un contexte, d'un style, d'une clientèle, etc.</p>
            <div className="d-flex justify-content-center align-items-center d-inline-flex rounded border">
                <ToggleButtons  name="filter" defaultValue={this.state.queryStr} type="checkbox" onChange={this.onFilterChange} 
                                                    options={this.state.dropdownLists.filterList}/>  
            </div>
            <Carousel>
                {dataProvider.map((items, index) => {  
                    let result = 
                        <Carousel.Item key={index}>
                            <div className="container-fluid pb-5">
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

        let details = <CollectionDetails data={this.state.details}/>;

        return (this.state.details !== null ? details : main);
    }

    onDetails(data){
        this.setState({details: data}, this.props.onDetails('specific'));
    }

    onFilterChange(event){
        this.setState({queryStr: event.target.value});
    }
}

export class CollectionDetails extends Component{
    static defaultProps = {
        data: null
    };

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {selectedItem: null};
    }

    render(){
        if(this.props.data === null){ return null; }

        let main =
        <div>
            <h1 className="display-4">{this.props.data.name}</h1>
            
            <div className="d-flex justify-content-center mt-3">
                {this.props.data.tags.map((item, index) => {  
                    return (<span key={index} className="badge badge-secondary m-1">{item}</span> );
                })}
            </div>
            <hr className="my-4"/>

            <div className='d-flex flex-wrap'>
                {this.props.data.items.map((item, index) => {  
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

      /*  let modal = 
        */

        return main;
    }

    onClick(data){
        this.setState({selectedItem: data});
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
        $glVars.webApi.getFileToImport(this.props.data.filePath, (result) => {
            window.parent.postMessage({ message: "import", value: result.data }, "*");
        });
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
                    <Button onClick={() => this.props.onDetails(this.props.data)}>Accéder</Button>
                </div>
            </div>;

        return main;
    }
}