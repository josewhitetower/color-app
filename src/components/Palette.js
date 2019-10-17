import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from "./Navbar";
import './Palette.css'

export default class Palette extends Component {
    state = {
        level:500,
        format: 'hex'
    }

    changeLevel = (level) => this.setState({level})

    changeFormat = (format) => this.setState({format})

    render() {
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => {
            return <ColorBox background={color[this.state.format]} name={color.name}/>
        })
        return (
            <div className="Palette">
                <Navbar level={this.props.level} changeLevel={this.changeLevel}  changeFormat={this.changeFormat} format={this.state.format}/>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}
