import React, { Component } from 'react'

class MemeGenerator extends Component {
    
    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '', 
            image: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    async componentDidMount() {
        // console.log('oi')
        const allMemeImgs = []
        await fetch('https://api.imgflip.com/get_memes').then(
            response => response.json()
        ).then(
            response => {
                const {memes} = response.data
                // console.log(memes[0])
                // allMemeImgs.push(memes) 
                this.setState({allMemeImgs: memes})
            }
        )
    }
    
    handleChange(event) {
        // console.log('está sendo alterado')
        let {name, value} = event.target
        this.setState({[name]: value})
    }
    
    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        // console.log(randMemeImg)
        this.setState({image: randMemeImg})
    }
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" 
                            name="topText" 
                            placeholder="Top text" 
                            value={this.state.topText} 
                            onChange={this.handleChange}
                    />
                    <input type="text" 
                            name="bottomText" 
                            placeholder="Bottom text" 
                            value={this.state.bottomText} 
                            onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.image} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom" >{this.state.bottomText}</h2>
                    
                </div>
            </div>
        )    
        
    }

}

export default MemeGenerator