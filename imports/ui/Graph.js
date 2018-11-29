import React, { Component } from 'react';
import Plot from "react-plotly.js";


// Task component - represents a single todo item
export default class Graph extends Component {
    constructor(props){
        super(props)
    this.graph.bind(this)
    }

    graph(){
        const saveGraphs = [{
            x: this.props.x_axis,
            y: this.props.y_axis,
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
        }]
        const colors = ['blue', 'green', 'yellow', 'brown']
        if(this.props.checked && this.props.saved && this.props.checked !== []){
            this.props.checked.map(index => {
                console.log(this.props.saved, 'sel')
                console.log(this.props.checked, 'che')

                const aux = {
                x: this.props.saved[index].x_axis,
                y: this.props.saved[index].y_axis,
                type: 'scatter',
                mode: 'markers',
                marker: {color: colors[index]},
            };

            saveGraphs.push(aux)
                console.log(saveGraphs,'cade?')
        })}
//fold5
        return (
            <Plot
                data={
                    saveGraphs
                }
                layout={{width: 600, height: 570, title: 'DMLP 4uni', xaxis:{title: 'Tentativa'}, yaxis:{title: 'Eficiência - MacroF1'}}}
            />);
    };

    render() {
        return (
            <div style={{display:"flex"}}>
                {this.graph()}
            </div>
        );
    }
}