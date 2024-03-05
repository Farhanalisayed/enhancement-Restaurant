import {Component} from 'react'

import CartContext from '../../context/CartContext'
import './index.css'

const vegLogo =
  'https://packagingguruji.com/wp-content/uploads/2022/09/Veg-Logo-2.png'
const nonVegLogo =
  'https://infoseekershub.com/wp-content/uploads/2019/08/non-veg.jpg'

class Dish extends Component {
  state = {
    quantity: 0,
  }

  render() {
    const {quantity} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          const {dishData} = this.props

          const addToCart = () => {
            addCartItem(dishData, quantity)
          }

          const onClickPlus = () => {
            this.setState(prevState => ({
              quantity: prevState.quantity + 1,
            }))
          }

          const onClickMinus = () => {
            if (quantity > 0) {
              this.setState(prevState => ({
                quantity: prevState.quantity - 1,
              }))
            } else {
              this.setState({quantity: 0})
            }
          }

          const fetchAvailableOption = () =>
            dishData.addonCat.length > 0 ? (
              <>
                <div className="quantity-cont">
                  <button type="button" className="btn" onClick={onClickMinus}>
                    -
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button type="button" className="btn" onClick={onClickPlus}>
                    +
                  </button>
                </div>
                {quantity > 0 ? (
                  <button onClick={addToCart} type="button" className="addBtn">
                    ADD TO CART
                  </button>
                ) : null}
                <p className="available">Customizations available</p>
              </>
            ) : (
              <>
                <div className="quantity-cont">
                  <button type="button" className="btn" onClick={onClickMinus}>
                    -
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button type="button" className="btn" onClick={onClickPlus}>
                    +
                  </button>
                </div>
                {quantity > 0 ? (
                  <button onClick={addToCart} type="button" className="addBtn">
                    ADD TO CART
                  </button>
                ) : null}
              </>
            )

          return (
            <div className="dish-container">
              <div className="left-sec">
                <img
                  src={dishData.dish_Type === 1 ? nonVegLogo : vegLogo}
                  className="logo"
                />

                <div className="details-cont">
                  <h1 className="name">{dishData.dish_name}</h1>
                  <p className="price">
                    {dishData.dish_currency} {dishData.dish_price}
                  </p>
                  <p className="description">{dishData.dish_description}</p>

                  {dishData.dish_Availability ? (
                    fetchAvailableOption()
                  ) : (
                    <p className="unavailable">Not available</p>
                  )}
                </div>
              </div>
              <div className="right-sec">
                <p className="calories">{dishData.dish_calories}</p>

                <img className="dish-img" src={dishData.dish_image} />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Dish
