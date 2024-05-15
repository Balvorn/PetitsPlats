import { displayData, recipes as allRecipes} from "./index.js";

let selectedRecipes = []

const ingredients = {
    name: "ingredients",
    search: document.querySelector(".ingredients-searchbar"),
    list: document.querySelector(".ingredients-list"),
    set: new Set(),
    actives: new Set()
}
const ustensils = {
    name: "ustensils",
    search: document.querySelector(".ustensils-searchbar"),
    list: document.querySelector(".ustensils-list"),
    set: new Set(),
    actives: new Set()
}
const appliances = {
    name: "appliance",
    search: document.querySelector(".appliances-searchbar"),
    list: document.querySelector(".appliances-list"),
    set: new Set(),
    actives: new Set()
}
const data = [ingredients, ustensils, appliances]

const activeFilters = document.querySelector(".active-filters")

const filterNames = document.querySelectorAll(".filter-name")

const mainSearch = document.querySelector(".main-search")
let mainSearchValue = ""

mainSearch.addEventListener("input", function(e){
    mainSearchValue = e.target[0].value
    e.preventDefault()
    updateRecipes()
})
mainSearch.addEventListener("reset", function () {
    mainSearchValue = ""
    updateRecipes(allRecipes)
})

filterNames.forEach((elem) => {
    elem.addEventListener("click", function () {
        this.parentElement.classList.toggle("opened-filter")
    })
})

data.forEach(obj => {
    obj.search.addEventListener("input", function (e) {
        updateList(obj, e.target.value)
    })

    obj.search.form.addEventListener("reset", function () {
        updateList(obj)
    })
    obj.search.form.addEventListener("submit", function (e) {
        e.preventDefault()
    })
})

export function loadFilters(recipes) {
    selectedRecipes = recipes
    data.forEach(el => el.set = new Set())
    
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(el => ingredients.set.add(el.ingredient.toLowerCase()))
        recipe.ustensils.forEach(el => ustensils.set.add(el.toLowerCase()))
        appliances.set.add(recipe.appliance.toLowerCase())
    });
    updateList(ingredients)
    updateList(ustensils)
    updateList(appliances)
}

function updateList(obj, filter = "") {
    obj.list.innerHTML = ""
    obj.set.forEach(item => {
        if (item.includes(filter.toLowerCase()) && !obj.actives.has(item)) {
            const li = document.createElement("li")
            li.setAttribute("class", obj.name + "-item list-item")
            li.textContent = item[0].toUpperCase() + item.slice(1).toLowerCase()
            li.addEventListener("click", function () { addFilter(item, obj) })

            obj.list.appendChild(li)
        }
    })
}

function addFilter(filter, category) {
    category.list.parentElement.classList.toggle("opened-filter")

    const li = document.createElement("li")
    li.setAttribute("class", "active-filter")
    li.textContent = filter[0].toUpperCase() + filter.slice(1).toLowerCase()
    const icon = document.createElement("span")
    icon.setAttribute("class", "fa-solid fa-xmark")
    li.appendChild(icon)
    icon.addEventListener("click", function () { removeFilter(filter, category, li) })

    activeFilters.appendChild(li)

    category.actives.add(filter)
    updateList(category)
    updateRecipes()

}

function removeFilter(filter, category, li) {
    category.actives.delete(filter)
    li.remove()
    updateRecipes(allRecipes)
}

function updateRecipes(recipes = selectedRecipes) {
    let recipesSet = new Set()
    let filtered = false
    let matches = recipes
    if(mainSearchValue != ""){
        matches = matches.filter(
            (item) => strFound(mainSearchValue, item)
        )
        filtered = true
    }
    data.forEach((el) => {
        el.actives.forEach((active) => {
            matches = matches.filter(
                (item) => strFound(active, item[el.name])
            )
            filtered = true
        })
    })
    matches.forEach(match => recipesSet.add(match))
    selectedRecipes = filtered ? [...recipesSet] : allRecipes
    displayData(selectedRecipes)
    loadFilters(selectedRecipes)

}

function strFound(text, obj) {
    if (typeof obj === "string") return obj.toLowerCase().includes(text);
    return Object.values(obj).some(val => strFound(text, val));
}