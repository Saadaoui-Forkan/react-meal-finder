import React from 'react'

function Meals({meals}) {
  
  return (
    <>
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
