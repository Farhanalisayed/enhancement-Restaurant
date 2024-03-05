import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdCart} from 'react-icons/io'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const {restoName} = props

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <nav className="nav-bar">
          <div className="header">
            <Link to="/">
              <h1 className="resto-name">{restoName}</h1>
            </Link>
            <div className="order-cont">
              <p className="note">My Orders</p>

              <div className="cart-cont">
                <Link to="/cart">
                  <IoMdCart className="icon" />{' '}
                </Link>
                <p className="orders-number">{cartList.length}</p>
              </div>

              <button onClick={onLogout} type="button" className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </nav>
      )
    }}
  </CartContext.Consumer>
)
export default withRouter(Header)
