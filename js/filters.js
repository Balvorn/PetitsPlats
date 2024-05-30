import { displayData, recipes as allRecipes } from "./index.js";

const ingredients = {
    name: "ingredients",
    search: document.querySelector(".ingredients-searchbar"),
    list: document.querySelector(".ingredients-list"),
    filters: new Set(),
    actives: new Set()
}
const ustensils = {
    name: "ustensils",
    search: document.querySelector(".ustensils-searchbar"),
    list: document.querySelector(".ustensils-list"),
    filters: new Set(),
    actives: new Set()
}
const appliances = {
    name: "appliance",
    search: document.querySelector(".appliances-searchbar"),
    list: document.querySelector(".appliances-list"),
    filters: new Set(),
    actives: new Set()
}
const categories = [ingredients, ustensils, appliances]

const mainSearch = document.querySelector(".main-search") //form
const mainSearchbar = document.querySelector(".searchbar") //input
let mainSearchValue = "" //keyword

mainSearch.addEventListener("submit", function (e) {
    e.preventDefault()
})

mainSearchbar.addEventListener("input", function (e) {
    if (e.target.value.length > 2 || e.target.value.length == 0) {
        mainSearchValue = e.target.value
        updateRecipes()
    }
})

//reset if close icon clicked
mainSearch.addEventListener("reset", function () {
    mainSearchValue = ""
    updateRecipes()
})

//expand/collapse filter divs on click
document.querySelectorAll(".filter-name").forEach((elem) => {
    elem.addEventListener("click", function () {
        this.parentElement.classList.toggle("opened-filter")
    })
})

//update available filters via category-specific searchbar
categories.forEach(category => {
    category.search.form.addEventListener("submit", function (e) {
        e.preventDefault()
    })
    category.search.addEventListener("input", function (e) {
        updateList(category, e.target.value)
    })
    category.search.form.addEventListener("reset", function () {
        updateList(category)
    })
})

export function loadFilters(recipes) {
    //reset all filters
    categories.forEach(category => category.filters = new Set())

    //add available filters in corresponding category
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(obj => ingredients.filters.add(obj.ingredient.toLowerCase()))
        recipe.ustensils.forEach(ustensil => ustensils.filters.add(ustensil.toLowerCase()))
        appliances.filters.add(recipe.appliance.toLowerCase())
    });

    updateList(ingredients)
    updateList(ustensils)
    updateList(appliances)
}

function updateList(category, search = "") {
    //reset list
    category.list.innerHTML = ""

    //display filters of specific category, activate on click
    category.filters.forEach(filter => {
        if (filter.includes(search.toLowerCase()) && !category.actives.has(filter)) {
            const li = document.createElement("li")
            li.setAttribute("class", category.name + "-item list-item")
            li.textContent = filter[0].toUpperCase() + filter.slice(1).toLowerCase()
            li.addEventListener("click", function () { addFilter(filter, category) })
            category.list.appendChild(li)
        }
    })
}

function addFilter(filter, category) {
    //collapse list
    category.list.parentElement.classList.toggle("opened-filter")

    //add clicked filter to actives set and update available recipes
    category.actives.add(filter)
    updateRecipes()

    //display activated filter, deactivate on click
    const li = document.createElement("li")
    li.setAttribute("class", "active-filter")
    li.textContent = filter[0].toUpperCase() + filter.slice(1).toLowerCase()
    const icon = document.createElement("span")
    icon.setAttribute("class", "fa-solid fa-xmark")
    li.appendChild(icon)
    icon.addEventListener("click", function () { removeFilter(filter, category, li) })
    document.querySelector(".active-filters").appendChild(li)
}

function removeFilter(filter, category, li) {
    category.actives.delete(filter)
    li.remove()
    updateRecipes()
}

function updateRecipes() {
    let matches = [...allRecipes]

    if (mainSearchValue != "") {
        for (let i = matches.length - 1; i >= 0; i--) {
            let match = matches[i];
            //remove recipe from list if keyword not found in name/ingredients/description
            if (!strFound(mainSearchValue, [match.name, match.ingredients, match.description])) matches.splice(i, 1)
        }
    }

    for (let i = 0; i < categories.length; i++) {
        let item = categories[i]
        let actives = item.actives.values()
        for (let j = 0; j < item.actives.size; j++) {
            let active = actives.next().value;
            for (let k = matches.length - 1; k >= 0; k--) {
                let match = matches[k];
                if (!strFound(active, match[item.name])) {
                    //remove recipe from list if filter not found in given recipe property (ingredients/ustensils/appliance)
                    matches.splice(k, 1)
                }
            }
        }
    }

    displayData(matches)
    loadFilters(matches)
}

function strFound(text, obj) {
    if (typeof obj === "string") return obj.toLowerCase().includes(text)

    //if category is ingredients, only search on ingredient name
    if (Object.hasOwn(obj, 'ingredient')) return strFound(text, obj.ingredient)
    return obj.some(val => strFound(text, val))
}