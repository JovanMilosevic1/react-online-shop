import React, { Component } from 'react'
import { storeProducts, detailProduct} from './data';
const ProductContext = React.createContext();
// Provider

// Consumer
class ProductProvider extends Component {
  state = {
      products: [],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax:0,
      cartTotal: 0

  };

  componentDidMount() {
    this.setProducts();
  }
  setProducts= () => {
    let tempProducts = [];
    storeProducts.forEach(product => {
        const singleProduct = {...product};
        tempProducts= [...tempProducts, singleProduct];
    });
    this.setState(()=>{
        return {products: tempProducts}
    })
  };

  getItem = id => {
    const product = this.state.products.find( item => item.id === id);
    return product;
  }

  handleDetail = id => {
    // console.log(id);
    const product = this.getItem(id);
    this.setState(() => {
      return {detailProduct: product}
    })
  };

  addToCart = (id) => {
    let tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getItem(id));
    console.log(index);
    const product = tempProduct[index];
    console.log(product);
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(()=> {
      return { products: tempProduct, cart: [...this.state.cart, product]};
    },()=> {
      this.addTotals();
    })
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(()=> {
      return {modalProduct: product, modalOpen: true}
    })
  }
  closeModal = () => {
    this.setState(() => {
      return {modalOpen: false}
    })
  }
  // for cart
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return id === item.id
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(() => {
      return {cart: [...tempCart] }
    }, () => {
      this.addTotals();
    });
  }
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return id === item.id
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;

    if(product.count === 0) {
      this.removeItem(id);
    }
    else {
      product.total = product.count * product.price;
      this.setState(() => {
        return {cart: [...tempCart] }
      }, () => {
        this.addTotals();
      });
    }
    
  }
  // back later
  removeItem = (id) => {
    const cart = this.state.cart.filter(item => {
      return id !== item.id;
    });
    this.setState(() => {
      return {cart: cart}
    }, () => {
      this.setProducts();
      this.addTotals();

    })
  }
  clearCart = () => {
    console.log('cart was cleared');
    this.setState(() => {
      return {cart: []};
      
    }, () => {
      this.setProducts();
      this.addTotals();
    })
  }
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => {
      return subTotal += item.total;
    });
    const tempTax = subTotal * 0.2;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(()=> {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total 
      }
    })
  }
  render() {
    return (
      <ProductContext.Provider value={{
          ...this.state,
          handleDetail:this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};

//1. see index.js