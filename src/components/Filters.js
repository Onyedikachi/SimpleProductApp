import React, { Component } from 'react'

export default class Filters extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        const value =  e.target[e.target.type ==="checkbox"? 'checked' : 'value'];
        const name = e.target.name;
        this.props.onFilter({
            [name]: value
        })
    }
    render() {
        return (
            <form>
                <input type="text" 
                        placeholder="Search ..." 
                        value = {this.props.filterText}
                        onChange = {this.handleChange}
                        name = "filterText"
                />
                <p>
                    <label>
                        <input 
                        type="checkbox" 
                        checked={this.props.inStockOnly}
                        onChange = {this.handleChange}
                        name="inStockOnly"
                        />
                        &nbsp;
                        Only show products in stock
                    </label>
                </p>
            </form>
        )
    }
}
