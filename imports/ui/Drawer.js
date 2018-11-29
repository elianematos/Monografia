import React, {Component} from 'react';
import ListItemText from '@material-ui/core/ListItemText'
export default class ItemDrawer extends Component {
    constructor(props){
        super(props)

    }

    setList=()=>{
        const value = Object.keys(this.props.obj);
        //return(<div>hello</div>)
        // return(
        //     <ListItemText primary={`hello: ${this.props.obj.unit}`} />)
        const alphga = value.map(key =>{
            console.log(this.props.obj[key], 'valjlk')
            console.log(key, 'kfj')
            if (this.props.obj[key] !== '' && key !== 'x_axis' && key !== 'y_axis' ) {
                return(<ListItemText primary={`${key}: ${this.props.obj[key]}`} />)
                }
            })
        return(alphga)
    };

    render(){
        console.log(this.props.obj, 'obj')
        return(this.setList()

        );
    }
}


