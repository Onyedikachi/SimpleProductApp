import React, {Component} from 'react'
const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

export default class ProductForm extends Component {
    constructor(props){
        super(props)
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.state = {
            product:Object.assign({},RESET_VALUES), 
            error:{}
        };
    }
    handleSave(e){
        if(this.handleValidation()){
            this.props.onSave(this.state.product);
            this.setState({
                product: Object.assign({},RESET_VALUES)
            });
        }
        e.preventDefault();
    }
    handleChange(e){
        const target = e.target;
        const value =target.type === 'checkbox'? target.checked : target.value;
        const name = target.name;

        this.setState((prevState)=>{
            prevState.product[name] = value;
            return {product : prevState.product};
        })
    }
    handleValidation(){
        const {name} = this.state.product;
        if (name.trim() === ""|| typeof name == "undefined"){
            const error = {name:"Product name is Blank"}
            this.setState({error});
            return false;
        }else{
            this.setState({error: ""});
            return true;
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.formProduct){
            this.setState({product: nextProps.formProduct});
        }
    }
    render(){
        return(
            <form>
                <h3>Enter a new product</h3>
                <p>
                    <label>
                        Name
                        <br />
                        <input type="text" name="name"
                        value={this.state.product.name} onChange={this.handleChange} required/>
                    </label>
                </p>
                <span className ={this.state.error.name ? "alertDanger": "" }>{this.state.error.name}</span>
                <p>
                    <label>
                        Category
                        <br />
                        <input type="text" name="category" 
                            value={this.state.product.category}
                            onChange={this.handleChange}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Price
                        <br />
                        <input type="text" name="price" 
                            value={this.state.product.price}
                            onChange={this.handleChange}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="stocked" 
                            value={this.state.product.stocked}
                            onChange={this.handleChange}
                        />
                        &nbsp; In stock?
                    </label>
                </p>
                <input type="submit" value= "Save"  onClick={this.handleSave}/>
            </form>
        )
    }
}