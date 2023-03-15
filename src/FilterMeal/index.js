import React, { } from 'react'

function FilterMeal({categories, handleCheck, meals}) {
    
  return (
    <div className='filter-meal'>
        <h3>Select your meal:</h3>
        {
            categories.map((category, index) => (
                <div key = {index}>
                <div className="category">
                    <input
                        className='category-input'
                        type = "checkbox"
                        value = {category}
                        onChange = {(e)=>handleCheck(e)}
                    />
                    {category}
                </div>
                </div>
            
            ))
        }
    </div>
  )
}

export default FilterMeal
