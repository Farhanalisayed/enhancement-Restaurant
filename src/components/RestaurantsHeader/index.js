import {Component} from 'react'

import './index.css'

class RestaurantsHeader extends Component {
  state = {
    activeCategoryId: '',
  }

  onChangeSortBy = event => {
    const {updateActiveCategoryId} = this.props
    this.setState({activeCategoryId: event.target.value})
    updateActiveCategoryId(event.target.value)
  }

  render() {
    const {activeCategoryId} = this.state
    const {categoryList} = this.props
    return (
      <div className="Restaurants-header">
        {categoryList.map(each => (
          <button
            onClick={this.onChangeSortBy}
            value={each}
            className={activeCategoryId === each ? 'active-btn' : 'normal-btn'}
          >
            {each}
          </button>
        ))}
      </div>
    )
  }
}
export default RestaurantsHeader
