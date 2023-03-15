import React from 'react'

function Meals({meals, searchMeal}) {
  return (
    <>
      {/* <div className='result-heading'>
        <h2>Search results for </h2>
      </div> */}
      <div className='meals'>
        {
          meals.map(meal => (
              <div className="meal" key={meal.id}>
                <img src = {meal.image} alt = {meal.image} />
                <div className='meal-info'>
                  <h3>{meal.title}</h3>
                </div>
              </div>
          ))
        }
      </div>
    </>
  )
}

export default Meals
