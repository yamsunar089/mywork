import './App.css'
import React from 'react'
import angry from './angry.jpg';
import love from './love.jpg';
import care from './care.png';
class FacebookEmojiCounter extends React.Component
{
 constructor(props)
{
 super(props)
 this.state = {number : 0};
 this.increment = this.increment.bind(this);
 this.pic=null
 if (this.props.type==="love")
 this.pic=love
 else if (this.props.type==="angry") 
    this.pic=angry
 else if (this.props.type==="care")
 this.pic=care
 }

increment() {
 this.setState((prevState)=>{ 
    return {number : prevState.number+1}
 })
 }

 render() {
 return (
 <div>
 <h5>It is {this.state.number}{this.props.type}.</h5>
 <button onClick={this.increment}>
 <img src={this.pic} alt=" "/>
 <b>{this.state.number} </b>
 </button>
 </div>
 )
 }
}
export default FacebookEmojiCounter;