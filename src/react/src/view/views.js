import React, { Component }  from 'react';
import { Button, Card, Carousel, Modal } from 'react-bootstrap';
import { $glVars } from '../common/common';
import { ToggleButtons } from '../libs/components/ToggleButtons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Assets } from '../assets/Assets';


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
                                    <img src={Assets.BootstrapLogo} alt='Bootstrap logo' className="img-fluid rounded shadow" />
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

        if(this.state.details !== null){
            return <CollectionDetails data={this.state.details} nameAlt={`Gabarits génériques ${this.state.details.name}`}/>;
        }
        else{
            return main;
        }
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
        nameAlt: "",
        data: null
    };

    constructor(props){
        super(props);

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

        if($glVars.queryStr.length > 0){
            dataProvider = dataProvider.filter((item) => {
                let result = (item.name.toLowerCase().includes($glVars.queryStr.toLocaleLowerCase()));
                if(result){
                    return true;
                }

                for(let tag of item.tags){
                    if(tag.toLowerCase().includes($glVars.queryStr.toLocaleLowerCase())){
                        return true;
                    }
                }

                return false;
            });
        }

        let main =
        <div className='m-3'>
            <h1 className="display-4">{(this.props.nameAlt.length > 0 ? this.props.nameAlt : this.props.data.name)}</h1>
            
            <div className="d-flex justify-content-center mt-3">
                {this.props.data.tags.map((item, index) => {  
                    let variant = (this.state.filter.tags.includes(item) ? 'badge-primary' : 'badge-secondary');
                    return (<span onClick={() => this.onFilter(item)} key={index} className={`badge ${variant} m-1 p-2`} style={{cursor: 'pointer'}}>{item}</span> );
                })}
            </div>
            <hr className="my-4"/>

            <div className='d-flex flex-wrap'>
                {dataProvider.length === 0 && <b>Il n'y a pas de résultat pour les critères sélectionnés.</b>}
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
                    <Button onClick={() => this.props.onDetails(this.props.data)}>Accéder</Button>
                </div>
            </div>;

        return main;
    }
}