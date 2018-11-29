import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor'
import Graph from './Graph.js';
import {withTracker} from 'meteor/react-meteor-data';
import {Data} from '../api/tasks.js';
import Card from '@material-ui/core/Card'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Checkbox from '@material-ui/core/Checkbox'
import ItemDrawer from './Drawer'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    formControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 0,
        paddingTop: 0,
        minWidth: 120,
        height: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginTop: 0,
    }
});

// App component - represents the whole app
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            collection:[],
            saved:[],
            unit:'',
            lr:'',
            dropout:'',
            act:'',
            init:'',
            opt:'',
            reg:'',
            lrReg:'',
            nLayers:'',
            x:[],
            y:[],
            checked:[],
            nada: true,
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

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });

    };


    clearParam = () =>{
        this.setState({
            unit:'',
            lr:'',
            dropout:'',
            act:'',
            init:'',
            opt:'',
            reg:'',
            lrReg:'',
            nLayers:'',

        })
    };

    saveQuery = () => {
        const obj = Object.create(null);

        const unit = this.state.unit;
        const lr = this.state.lr;
        const dropout = this.state.dropout;
        const act = this.state.act;
        const init = this.state.init;
        const opt = this.state.opt;
        const reg = this.state.reg;
        const lrReg = this.state.lrReg;
        const nLayers = this.state.nLayers;
        const x_axis = [];
        const y_axis = [];

        obj.unit = this.state.unit;
        obj.lr = this.state.lr;
        obj.dropout = this.state.dropout;
        obj.act = this.state.act;
        obj.init = this.state.init;
        obj.opt = this.state.opt;
        obj.reg = this.state.reg;
        obj.lrReg = this.state.lrReg;
        obj.nLayers = this.state.nLayers;

        let out = this.props.collection.filter(value => {
            if ((value.units1 !== unit && unit !== "") || (value.lr !== lr && lr !== "") || (value.dropout !== dropout && dropout !== "")
                || (value.activation !== act && act !== "") || (value.init !== init && init !== "") || (value.opt !== opt && opt !== "")
                || (value.reg !== reg && reg !== "") || (value.lr_reg !== lrReg && lrReg !== "") || (value.n_layers !== nLayers && nLayers !== "")
            )
                return false;
            return value;
        })


        out.sort((a,b) => (a.tentativa > b.tentativa) ? 1 : ((b.tentativa > a.tentativa) ? -1 : 0))
            .map(value => {
                console.log(this.state.unit, 'un')
                x_axis.push(value.tentativa);
                y_axis.push(100-value.loss)
            });

        obj.x_axis = x_axis;
        obj.y_axis = y_axis;

        console.log(obj,'l')
        this.state.saved.push(obj)
        console.log(this.state.saved, 'amem')
        this.setState({
            nada: false,
        })

    }

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
        const x_axis = []
        const y_axis = []

        let out = this.props.collection.filter(value => {
            if ((value.units1 !== unit && unit !== "") || (value.lr !== lr && lr !== "") || (value.dropout !== dropout && dropout !== "")
                || (value.activation !== act && act !== "") || (value.init !== init && init !== "") || (value.opt !== opt && opt !== "")
                || (value.reg !== reg && reg !== "") || (value.lr_reg !== lrReg && lrReg !== "") || (value.n_layers !== nLayers && nLayers !== "")
            )
                return false;
            return value;
        })


        out.sort((a,b) => (a.tentativa > b.tentativa) ? 1 : ((b.tentativa > a.tentativa) ? -1 : 0))
            .map(value => {
                console.log(this.state.unit, 'un')
            x_axis.push(value.tentativa);
            y_axis.push(100-value.loss)
        });

       return(
           <Graph
               x_axis={x_axis}
               y_axis={y_axis}
               checked = {this.state.checked}
               saved = {this.state.saved}
           />
       );

    };

    render() {
        const { classes } = this.props;
        console.log(this.props.collection, 'hrl')
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            DMLP
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />


                <div style={{display:'flex', flexWrap: 'wrap',justifyContent:'space-between', marginBottom: '20',
                    marginTop:'0px', padding:'0px' }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel >Fold</InputLabel>
                        <Select
                            value={this.state.opt}
                            onChange={this.handleChangeUnit}
                            className={classes.selectEmpty}
                            input={<Input name="unit1" id="unit1-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={32}>32</MenuItem>
                            <MenuItem value={64}>64</MenuItem>
                            <MenuItem value={128}>128</MenuItem>
                        </Select>
                        <FormHelperText>fold</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel >Número de neurônios</InputLabel>
                        <Select
                            value={this.state.unit}
                            onChange={this.handleChangeUnit}
                            className={classes.selectEmpty}
                            input={<Input name="unit1" id="unit1-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={32}>32</MenuItem>
                            <MenuItem value={64}>64</MenuItem>
                            <MenuItem value={128}>128</MenuItem>
                        </Select>
                        <FormHelperText>unit1</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        {/*learning rate*/ }
                        <InputLabel >Taxa de aprendizado </InputLabel>
                        <Select
                            value={this.state.lr}
                            onChange={this.handleChangeLr}
                            className={classes.selectEmpty}
                            input={<Input name="unit1" id="unit1-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={0.01}>0.01</MenuItem>
                            <MenuItem value={0.001}>0.001</MenuItem>
                            <MenuItem value={0.0001}>0.0001</MenuItem>
                        </Select>
                        <FormHelperText>lr</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel >Dropout</InputLabel>
                        <Select
                            value={this.state.dropout}
                            onChange={this.handleChangeDropout}
                            className={classes.selectEmpty}
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
                        <FormHelperText>dropout</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        {/*funçao de ativação: somatorio mais o bias*/}
                        <InputLabel >Ativação</InputLabel>
                        <Select
                            value={this.state.act}
                            onChange={this.handleChangeAct}
                            className={classes.selectEmpty}
                            input={<Input name="act" id="act-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"relu"}>relu</MenuItem>
                            <MenuItem value={"linear"}>linear</MenuItem>
                        </Select>
                        <FormHelperText>act</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                            {/*inicialização dos pesos da rede*/}
                        <InputLabel >Inicialização</InputLabel>
                        <Select
                            value={this.state.init}
                            className={classes.selectEmpty}
                            onChange={this.handleChangeInit}
                            input={<Input name="init" id="init-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"random_normal"}>random_normal</MenuItem>
                            <MenuItem value={"random_uniform"}>random_uniform</MenuItem>
                        </Select>
                        <FormHelperText>init</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                                {/*optimization function*/}
                        <InputLabel >Função de otimização</InputLabel>
                        <Select
                            value={this.state.opt}
                            className={classes.selectEmpty}
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
                        <FormHelperText>opt</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>{/*normalização da entrada*/}

                        <InputLabel >Regularização</InputLabel>
                        <Select
                            value={this.state.reg}
                            onChange={this.handleChangeReg}
                            className={classes.selectEmpty}
                            input={<Input name="reg" id="reg-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"l1"}>l1</MenuItem>
                            <MenuItem value={"l2"}>l2</MenuItem>
                            <MenuItem value={"l1l2"}>l1l2</MenuItem>
                        </Select>
                        <FormHelperText>reg</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Taxa de aprendizado regularização</InputLabel>
                        <Select
                            value={this.state.lrReg}
                            onChange={this.handleChangeLrReg}
                            className={classes.selectEmpty}
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
                        <FormHelperText>lr_reg</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel >Número de camadas</InputLabel>
                        <Select
                            value={this.state.nLayers}
                            className={classes.selectEmpty}
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
                        <FormHelperText>nLayers</FormHelperText>
                    </FormControl>
                    <div style={{justifyContent:'flex-start'}}>
                    <Button className={classes.button} variant="contained"onClick={this.clearParam}>
                        Limpar parâmetros
                    </Button>
                    <Button className={classes.button} variant="contained"onClick={this.saveQuery}>
                        Salvar parâmetros
                    </Button>
                    </div>
                </div>
                <Card>
                    {this.setQuery()}

                </Card>
                </main>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="right"
                >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" align='center'>
                            Configurações Salvas
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        {this.state.saved.map((value, index) => (
                            <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(index)} style={{flexWrap: 'wrap'}}>
                                <Checkbox
                                    checked={this.state.checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                               <ItemDrawer
                                   obj = {value}
                               />
                            </ListItem>))
                        }
                        </List>


                </Drawer>
            </div>
        );
    }
}


export default withTracker(() => {
    Meteor.subscribe('tasks');
    return {
        collection: Data.find().fetch()
    };
})(withStyles(styles)(App));