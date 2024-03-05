import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import AllRestaurant from './components/AllRestaurant'
import Cart from './components/Cart'

import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = (dish, quantity) => {
    const {cartList} = this.state
    const theProduct = cartList.find(each => each.id === dish.dish_id)
    if (theProduct !== undefined) {
      const index = cartList.indexOf(theProduct)
      let theQuantity = cartList[index].quantity
      theQuantity += quantity
      const updatedProd = {...cartList[index], quantity: theQuantity}
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === dish.dish_id) {
            return updatedProd
          }
          return each
        }),
      }))
    } else {
      const theDish = {
        id: dish.dish_id,
        name: dish.dish_name,
        image: dish.dish_image,
        price: dish.dish_price,
        quantity: quantity,
      }
      this.setState(prevState => ({cartList: [...prevState.cartList, theDish]}))
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState(prevState => {
      const theProduct = cartList.find(each => each.id === id)
      const index = cartList.indexOf(theProduct)
      let theQuantity = cartList[index].quantity
      theQuantity += 1
      const updatedProd = {...cartList[index], quantity: theQuantity}

      return {
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return updatedProd
          }
          return each
        }),
      }
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    this.setState(prevSt => {
      const theProduct = cartList.find(each => each.id === id)
      const index = cartList.indexOf(theProduct)
      let theQuantity = cartList[index].quantity
      if (theQuantity >= 1) {
        theQuantity -= 1
      }
      const updatedProd = {...cartList[index], quantity: theQuantity}
      return {
        cartList: prevSt.cartList.map(each => {
          if (each.id === id) {
            return updatedProd
          }
          return each
        }),
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={AllRestaurant} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
