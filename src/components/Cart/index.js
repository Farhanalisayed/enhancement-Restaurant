import {Component} from 'react'
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

class Cart extends Component {
  state = {
    restoName: '',
  }

  componentDidMount() {
    this.getRestaurantsName()
  }

  getRestaurantsName = async () => {
    const apiUrl = `https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData[0]
      this.setState({restoName: updatedData.restaurant_name})
    }
  }

  render() {
    const {restoName} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const showEmptyView = cartList.length === 0

          const onRemoveAll = () => {
            removeAllCartItems()
          }

          const showCart = () => (
            <>
              <h1 className="cart-heading">My Cart</h1>
              <button
                type="button"
                className="remove-all-btn"
                onClick={onRemoveAll}
              >
                Remove All
              </button>
            </>
          )

          return (
            <>
              <Header restoName={restoName} />
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCartView />
                ) : (
                  <div className="cart-content-container">
                    {showCart()}
                    <CartListView />
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
