import React, { Component } from 'react'
import ProductRow from './ProductRow'
import SortableColumnHeader from './SortableColumnHeader'

export default class ProductTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            sort : {
                column : 'name',
                direction: 'desc'
            }
        }
        this.sortByColumnAndDirection = this.sortByColumnAndDirection.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    sortByColumnAndDirection(objectA, objectB){
        let isDesc =  this.state.sort.direction === 'desc' ? -1 : 1;
        let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];
        if (this.state.sort.column === 'price'){
            [a, b] = [a, b].map((value)=> parseFloat(value.replace(/[^\d.]/g,''), ''), 10)
        }
        if (a > b){
            return 1 * isDesc;
        }
        if (a < b){
            return -1 * isDesc;
        }
        return; 
    }
    sortProducts(){
        let productsAsArray = Object.keys(this.props.products).map((pid)=> this.props.products[pid]);
        return productsAsArray.sort(this.sortByColumnAndDirection)
    }
    handleDestroy(id){
        this.props.onDestroy(id);
    }
    handleEdit(id){
        this.props.onEdit(id);
    }
    handleSort(column, direction){
        this.setState({
            sort:{
                column: column,
                direction: direction
            }
        })
    }
    render() {
        let rows= [];
        this.sortProducts().forEach((product)=>{
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
                return;
            }
        
            rows.push(<ProductRow product = {product} key={product.id} 
                onDestroy={this.handleDestroy} onEdit={this.handleEdit}
            />);   
        
        })
        return (
            <table>
                <thead>
                    <tr>
                        <SortableColumnHeader 
                        currentSort={this.state.sort}
                        column="name" 
                        onSort = {this.handleSort}
                        />
                        <SortableColumnHeader 
                        currentSort={this.state.sort}
                        column="price"
                        onSort = {this.handleSort} />
                    </tr>  
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
