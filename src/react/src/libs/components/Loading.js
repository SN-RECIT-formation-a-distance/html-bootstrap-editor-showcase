import React, { Component } from 'react';

export class Loading extends Component{
    static defaultProps = {
        webApi: null,
        children: null
    };

    constructor(props){
        super(props);

        this.domRef = React.createRef();
    }

    renderChildren() {        
        return React.Children.map(this.props.children, (child, index) => {
            if(child === null){ return (null); }

            return React.cloneElement(child, {
                className: "Img"
            });
        });
    }

    componentDidMount(){
        if(this.props.webApi === null){ return; }

        this.props.webApi.domVisualFeedback = this.domRef.current;
    }

    render(){
        let main =
            <div className="loading" ref={this.domRef}>
                <div className='loading-background'>{this.renderChildren()}</div>
            </div>

        return (main);
    }
}