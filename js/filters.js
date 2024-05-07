const filterNames = document.querySelectorAll(".filter-name")

filterNames.forEach((elem) => {
    
    elem.addEventListener("click", function(){
        this.parentElement.classList.toggle("opened-filter")
    }
    )
})


/*
const ustensilsFilter = document.querySelector(".ustensils-filter");
const ingredientsFilter = document.querySelector(".ingredients-filter");
const applianceFilter = document.querySelector(".appliance-filter");
const allFilters = document.querySelector(".filter");

const ustensilsList = document.querySelector(".ustensils-list");
const ingredientsList = document.querySelector(".ingredients-list");
const applianceList = document.querySelector(".appliance-list");
const allLists = document.querySelector(".filter-list");

function displayFilters(recipes){
    recipes.forEach(recipe => {
        
    });
} */