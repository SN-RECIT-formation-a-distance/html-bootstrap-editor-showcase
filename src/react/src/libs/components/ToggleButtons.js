import React, { Component } from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton as BsToggleButton  } from 'react-bootstrap';

export class ToggleButtons extends Component {
    static defaultProps = {
        name: "",
        defaultValue: [],
        onChange: null,
        type: "checkbox", // checkbox | radio
        options: [], // {value: "", text:"", glyph: ""}
        bsSize: "", // "" | small
        style: null,
        disabled: false
    };
      
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    render() {       
        let main = 
            <ButtonToolbar style={this.props.style} data-read-only={(this.props.disabled ? 1 : 0)}>                        
                <ToggleButtonGroup className="flex-wrap" size={this.props.bsSize} type={this.props.type} name={this.props.name} defaultValue={this.props.defaultValue} onChange={this.onChange}>                                
                    {this.props.options.map((item, index) => {   
                        let element = 
                            <BsToggleButton style={{zIndex: 0}} id={`${this.props.name}-${index}`} key={index} variant={(this.props.defaultValue.includes(item.value) ? "primary" : "secondary")} value={item.value} disabled={this.props.disabled}>
                                {item.text}
                            </BsToggleButton>;
                        return (element);
                    })}                                    
                </ToggleButtonGroup>
            </ButtonToolbar>;
        return (main);
    }   
    
    onChange(eventKey){ 
        this.props.onChange({target: {value: eventKey, name: this.props.name}});
    }   
}
