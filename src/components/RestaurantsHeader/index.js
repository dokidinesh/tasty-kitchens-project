import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const RestaurantsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortBy} = props
    changeSortBy(event.target.value)
  }

  const {sortByOptions, activeOptionId} = props

  return (
    <div className="restaurants-header">
      <p className="popular-restaurants-description">
        Select your favourite restaurant special dish and make your day happy...
      </p>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort By</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortByOptions.map(eachOption => (
            <option
              className="select-option"
              key={eachOption.id}
              value={eachOption.value}
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default RestaurantsHeader
