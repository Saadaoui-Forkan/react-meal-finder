import { useState, useEffect } from "react";
import FilterMeal from "./FilterMeal";
import Meals from "./Meals";
import Search from "./Search";
import ReactPaginate from 'react-paginate';

function App() {
  const [searchMeal, setSearchMeal] = useState("");
    const [meals, setMeals] = useState([]);
    const [showMeals, setShowMeals] = useState(false);// إضافة قائمة الوجبات الأصلية

    // Fetch Meals API
    const getMeals = async () => {
        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s"
        );
        const data = await response.json();
        const findMeals = data.meals.map((meal) => ({
            id: meal.idMeal,
            title: meal.strMeal,
            image: meal.strMealThumb,
            rate: (Math.random() * 5).toFixed(2),
            category: meal.strCategory,
            description: meal.strYoutube,
        }));
        setMeals(findMeals);
    };
    useEffect(() => {
        getMeals();
    }, []);

    // Display Searched Meals
   const getSearchedMeals = (e) => {
    e.preventDefault();
    if (searchMeal !== "") {
        const searched = meals.filter(meal =>
        meal.title.toLowerCase().includes(searchMeal.toLowerCase())
        );
        setShowMeals(true);
        setMeals(searched);
        }
    };

    // filter by category
    const [selected, setSelected] = useState([]);
    const categories = meals
        .map((meal) => meal.category)
        .reduce((acc, item) => (acc.includes(item) ? acc : [...acc, item]), []);
    const handleCheck = (e) => {
        const { value, checked } = e.target;
        if (checked === true) {
            setSelected((pre) => [...pre, value]);
        } else {
            setSelected((pre) => [...pre.filter((item) => item !== value)]);
        }
    };
    
    const filtered = (selected.length === 0) ? meals 
                        : meals.filter(meal => selected.includes(meal.category))

    // Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const mealsPerPage = 6;
    const pagesVisited = pageNumber * mealsPerPage;
    const displayMeals = filtered.slice(pagesVisited, pagesVisited+mealsPerPage)
    const pagesCount = Math.ceil(filtered.length / mealsPerPage)
    const handlePageClick = ({selected}) => {
        setPageNumber(selected)
    }
  return (
    <div className="container">
            <Search
                searchMeal={searchMeal}
                setSearchMeal={setSearchMeal}
                getSearchedMeals={getSearchedMeals}
            />
            <div className="main">
                {showMeals && (
                    <FilterMeal
                        categories={categories}
                        handleCheck={handleCheck}
                    />
                )}
                {
                    showMeals && <Meals 
                                    meals={displayMeals} 
                                    searchMeal={searchMeal} 
                                />
                }
            </div>
            {
                showMeals && <ReactPaginate
                                breakLabel = "..."
                                nextLabel = "next"
                                onPageChange = {handlePageClick}
                                pageRangeDisplayed = {5}
                                pageCount = {pagesCount}
                                previousLabel = "previous"
                                renderOnZeroPageCount = {null}
                                containerClassName = {'pagination'}
                                nextClassName = {'page-item'}
                                nextLinkClassName = {'page-link'}
                                previousClassName = {'page-item'}
                                previousLinkClassName = {'page-link'}
                                breakClassName = {'page-item'}
                                breakLinkClassName = {'page-link'}
                                pageClassName = {'page-item'}
                                pageLinkClassName = {'page-link'}
                                activeClassName = {'active'}

                            />
            }
        </div>
  );
}

export default App;
