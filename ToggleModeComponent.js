import './App.css'
import React from 'react'
import sad from './sad.png';
import care from './care.png';
class ToggleMode extends React.Component {
 constructor(props) {
 super(props);
 this.state = {pic : care};
 this.Toggle_Mode = this.Toggle_Mode.bind(this);
 }
 Toggle_Mode() {
    this.setState((prevState)=>{
    if (prevState.pic===sad)
    {
    this.mode="care"
    return {pic : care}
    }
    else if (prevState.pic===care)
    {
    this.mode="sad"
    return {pic :sad}
    }
    })
    } 
    render() {
        return (
       
        <div>
       
        <h3>This is output of Task2: {this.mode}
       </h3>
        <button onClick={this.Toggle_Mode}
        >
        <img src={this.state.pic}
       
        alt=" "/>
       
        </button>
       
        </div>
        );
    }
 }
        export default ToggleMode; 