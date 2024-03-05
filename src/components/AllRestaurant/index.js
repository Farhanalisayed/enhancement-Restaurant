import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import RestaurantsHeader from '../RestaurantsHeader'
import Dish from '../Dish'

import './index.css'

class AllRestaurant extends Component {
  state = {
    isLoading: true,
    restaurantsList: [],
    categoryList: [],
    restoName: '',
    activeCategoryId: 'Salads and Soup',
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const {activeCategoryId} = this.state

    const apiUrl = `https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData[0]

      const menusList = updatedData.table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuId: each.menu_category_id,
        menuDishes: each.category_dishes,
      }))
      const categories = updatedData.table_menu_list.map(
        each => each.menu_category,
      )

      this.setState({
        isLoading: false,
        categoryList: categories,
        restoName: updatedData.restaurant_name,
        restaurantsList: menusList,
      })
    }
  }

  updateActiveCategoryId = activeCategoryId => {
    this.setState({activeCategoryId}, this.getRestaurantsList)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#000000" height={50} width={50} />
    </div>
  )

  renderRestaurantsList = () => {
    const {restaurantsList, restoName, categoryList, activeCategoryId} =
      this.state
    const theMenu = restaurantsList.find(
      each => each.menuCategory === activeCategoryId,
    )
    const dishesList = theMenu.menuDishes
    return (
      <>
        <Header restoName={restoName} />
        <RestaurantsHeader
          updateActiveCategoryId={this.updateActiveCategoryId}
          categoryList={categoryList}
        />
        <div className="Restaurants-container">
          {dishesList.map(each => (
            <Dish dishData={each} key={each.id} />
          ))}
        </div>
      </>
    )
  }

  render() {
    const {isLoading, restoName} = this.state

    return (
      <div>
        {isLoading ? this.renderLoader() : this.renderRestaurantsList()}
      </div>
    )
  }
}

export default AllRestaurant
