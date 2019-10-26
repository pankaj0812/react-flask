import React, { Component } from 'react'

export default class test extends Component {
   onSubmit(event){
       event.preventDefault();
       console.log(this.input.value)
   } 
    
    render() {
        const list =["item1", "item3"];
        return (
            <div className="test"> 
                <h1>
                    {
                        list.map(item =>{
                            return {item}
                        })
                    }
                    </h1>
                    <form onSubmit={this.onSubmit}>
                        <input onChange={this.onChange} ref={input => this.input = input}/>
                    </form>
            </div>
        )
    }
}
