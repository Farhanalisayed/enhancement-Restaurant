import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <ul className="cart-list">
          {cartList.map(each => (
            <CartItem key={each.id} cartItemDetails={each} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
