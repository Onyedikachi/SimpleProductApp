import React, { Component } from 'react';

export default class ProductRow extends Component {
    constructor(props){
        super(props);
        this.destroy = this.destroy.bind(this);
        this.edit = this.edit.bind(this);
    }
    destroy(){
        this.props.onDestroy(this.props.product.id);
    }
    edit(){
        this.props.onEdit(this.props.product.id);
    }
    render() {
        return (
                <tr>
                    <td>
                        <span className={this.props.product.stocked ? '': 'ProductRow-out-of-stock'}>
                            {this.props.product.name}
                        </span> 
                    </td>
                    <td>
                        {this.props.product.price}
                    </td>
                    <td>
                        <button onClick={this.destroy}>x</button>
                        <button onClick={this.edit}>edit</button>
                    </td>
                </tr>
        )
    }
}
