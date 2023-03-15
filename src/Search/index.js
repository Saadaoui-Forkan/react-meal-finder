import React from 'react'

function Search({searchMeal, setSearchMeal, getSearchedMeals}) {
  return (
    <div>
      <h1>Meal Finder</h1>
      <div className="flex">
        <form className="flex">
          <input
            type="text"
            placeholder="Search for meals or keywords"
            onChange = {(e)=>setSearchMeal(e.target.value)}
            value = {searchMeal}
          />
          <button 
            className="search-btn" type="submit"
            onClick = {getSearchedMeals}
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Search
