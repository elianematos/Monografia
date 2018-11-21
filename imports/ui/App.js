import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor'
import Task from './Task.js';
import { withTracker } from 'meteor/react-meteor-data';
import Plot from 'react-plotly.js';
import { Tasks } from '../api/tasks.js';
import { Data } from '../api/tasks.js';
import Teste from '../api/tasks.js'
import Card from '@material-ui/core/Card'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// App component - represents the whole app
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            collection:[],
            openUnit: false,
            unit:'',
            openLr: false,
            lr:'',
            openDropout: false,
            dropout:'',
            openAct: false,
            act:'',
            openInit: false,
            init:'',
            openOpt: false,
            opt:'',
            openReg: false,
            reg:'',
            openLrReg: false,
            lrReg:'',
            openNLayers: false,
            nLayers:'',
            x:[],
            y:[],
        }
    }
    handleChangeUnit = event => {
        this.setState({
            unit:event.target.value
        })
        console.log(this.state.unit)
    };

    handleChangeLr = event => {
        this.setState({
            lr:event.target.value
        })
        console.log(this.state.lr)
    };

    handleChangeDropout = event => {
        this.setState({
            dropout:event.target.value
        })
        console.log(this.state.dropout)
    };

    handleChangeAct = event => {
        this.setState({
            act:event.target.value
        })
        console.log(this.state.act)
    };

    handleChangeInit = event => {
        this.setState({
            init:event.target.value
        })
        console.log(this.state.init)
    };

    handleChangeOpt = event => {

        this.setState({
            opt:event.target.value
        })
        console.log(this.state.opt)
    };

    handleChangeReg = event => {
        this.setState({
            reg:event.target.value
        })
        console.log(this.state.reg)
    };

    handleChangeLrReg = event => {
        this.setState({
            lrReg:event.target.value
        })
        console.log(this.state.lrReg)
    };

    handleChangeNLayers = event => {
        this.setState({
            nLayers:event.target.value
        })
        console.log(this.state.nLayers)
    };
    setQuery() {
        const unit = this.state.unit;
        const lr = this.state.lr;
        const dropout = this.state.dropout;
        const act = this.state.act;
        const init = this.state.init;
        const opt = this.state.opt;
        const reg = this.state.reg;
        const lrReg = this.state.lrReg;
        const nLayers = this.state.nLayers;

        console.log(this.props.collection);
        let out = this.props.collection.filter(value => {
            if ((value.units1 !== unit && unit !== "") || (value.lr !== lr && lr !== "") || (value.dropout !== dropout && dropout !== "")
                || (value.activation !== act && act !== "") || (value.init !== init && init !== "") || (value.opt !== opt && opt !== "")
                || (value.reg !== reg && reg !== "") || (value.lr_reg !== lrReg && lrReg !== "") || (value.n_layers !== nLayers && nLayers !== "")
            )
                return false;
            return value;
        })
        console.log(out, 'out')
        const x_axis = []
        const y_axis = []
        const a = 94
        const b = []
        b.push(100-a)
        console.log(b,'b')

        out.sort((a,b) => (a.tentativa > b.tentativa) ? 1 : ((b.tentativa > a.tentativa) ? -1 : 0))
            .map(value => {
            x_axis.push(value.tentativa);
            y_axis.push(100-value.loss)
        });

        console.log(out,'ot')
       if(x_axis !== [] && y_axis !== []) {
           return (<Plot
               data={[
                   {
                       x: x_axis,
                       y: y_axis,
                       type: 'scatter',
                       mode: 'lines+points',
                       marker: {color: 'red'},
                   },
               ]}
               layout={{width: 700, height: 700, title: 'DMLP 4uni data5'}}
           />);
       }
    };



    render() {
        console.log(this.props.collection, 'hrl')
        return (
            <div>
                <h1>MLP</h1>

                <Card>
                    <FormControl>
                        <InputLabel >units1</InputLabel>
                        <Select
                            value={this.state.unit}
                            onChange={this.handleChangeUnit}
                            input={<Input name="unit1" id="unit1-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={32}>32</MenuItem>
                            <MenuItem value={64}>64</MenuItem>
                            <MenuItem value={128}>128</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >lr</InputLabel>
                        <Select
                            value={this.state.lr}
                            onChange={this.handleChangeLr}
                            input={<Input name="unit1" id="unit1-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={0.01}>0.01</MenuItem>
                            <MenuItem value={0.001}>0.001</MenuItem>
                            <MenuItem value={0.0001}>0.0001</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >Drop out</InputLabel>
                        <Select
                            value={this.state.dropout}
                            onChange={this.handleChangeDropout}
                            input={<Input name="dropout" id="dropout-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={0.1}>0.1</MenuItem>
                            <MenuItem value={0.3}>0.3</MenuItem>
                            <MenuItem value={0.5}>0.5</MenuItem>
                            <MenuItem value={0.7}>0.7</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >Act</InputLabel>
                        <Select
                            value={this.state.act}
                            onChange={this.handleChangeAct}
                            input={<Input name="act" id="act-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"relu"}>relu</MenuItem>
                            <MenuItem value={"linear"}>linear</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >init</InputLabel>
                        <Select
                            value={this.state.init}
                            onChange={this.handleChangeInit}
                            input={<Input name="init" id="init-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"random_normal"}>random_normal</MenuItem>
                            <MenuItem value={"random_uniform"}>random_uniform</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >opt</InputLabel>
                        <Select
                            value={this.state.opt}
                            onChange={this.handleChangeOpt}
                            input={<Input name="opt" id="opt-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"SGD"}>SGD</MenuItem>
                            <MenuItem value={"Adam"}>Adam</MenuItem>
                            <MenuItem value={"Adamgrad"}>Adamgrad</MenuItem>
                            <MenuItem value={"RMSprop"}>RMSprop</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >reg</InputLabel>
                        <Select
                            value={this.state.reg}
                            onChange={this.handleChangeReg}
                            input={<Input name="reg" id="reg-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"l1"}>l1</MenuItem>
                            <MenuItem value={"l2"}>l2</MenuItem>
                            <MenuItem value={"l1l2"}>l1l2</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >lr_reg</InputLabel>
                        <Select
                            value={this.state.lrReg}
                            onChange={this.handleChangeLrReg}
                            input={<Input name="lrReg" id="lrReg-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={0.00001}>0.00001</MenuItem>
                            <MenuItem value={0.0001}>0.0001</MenuItem>
                            <MenuItem value={0.001}>0.001</MenuItem>
                            <MenuItem value={0.01}>0.01</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel >n_layers</InputLabel>
                        <Select
                            value={this.state.nLayers}
                            onChange={this.handleChangeNLayers}
                            input={<Input name="nLayers" id="nLayers-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                </Card>

                <Card>
                    {this.setQuery()}
                </Card>
            </div>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('tasks');
    return {
        collection: Data.find().fetch()
    };
})(App);