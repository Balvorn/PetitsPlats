import recipeTemplate from "./recipe_template.js";
import {loadFilters} from "./filters.js";
export let recipes = []

async function getRecipes() {
    const response = await fetch("../../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes
    return recipes;
}

// Display recipes via template
export function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
    const recipesTotal = document.querySelector(".recipes-total");

    recipesSection.innerHTML = ""
    recipesTotal.textContent = recipes.length + " recettes"

    recipes.forEach((recipe) => {
            const recipeModel = recipeTemplate(recipe);
            const recipeCardDOM = recipeModel.getRecipeCardDOM();
            recipesSection.innerHTML += recipeCardDOM;
    });
}

async function init() {
    recipes = await getRecipes();
    displayData(recipes);
    loadFilters(recipes)
}

init();