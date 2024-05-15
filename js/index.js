import recipeTemplate from "./recipe_template.js";
import {loadFilters} from "./filters.js";
export let recipes = []
async function getRecipes() {

    const response = await fetch("../../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes
    return recipes;
}

export function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
    const recipesTotal = document.querySelector(".recipes-total");

    recipesSection.innerHTML = ""
    recipesTotal.textContent = recipes.length + " recettes"

    recipes.forEach((recipe) => {
            const recipeModel = recipeTemplate(recipe);
            const userCardDOM = recipeModel.getUserCardDOM();
            recipesSection.innerHTML += userCardDOM;
    });
}

async function init() {
    // Récupère les datas des photographes
    recipes = await getRecipes();
    displayData(recipes);
    loadFilters(recipes)
}

init();