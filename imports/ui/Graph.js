import React, { Component } from 'react';
import Plot from "react-plotly.js";

// Task component - represents a single todo item
export default class Graph extends Component {
    constructor(props){
        super(props)

    }

    graph(){
        const a = 0;
        console.log(this.props) ;
        return (
            <Plot
                data={[
                    {
                        x: this.props.x_axis,
                        y: this.props.y_axis,
                        type: 'scatter',
                        mode: 'markers',
                        marker: {color: 'red'},
                    },
                ]}
                layout={{width: 700, height: 700, title: 'DMLP 4uni data5'}}
            />);
    };

    render() {
        return (
            <div>
                {this.graph()}
            </div>
        );
    }
}