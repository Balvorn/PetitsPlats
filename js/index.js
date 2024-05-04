import recipeTemplate from "./recipe_template.js";

async function getRecipes() {

    const response = await fetch("../../data/recipes.json");
    const data = await response.json();
    const recipes = data.recipes

    return ({
        recipes: [...recipes]
    });
}

async function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
    recipesSection.innerHTML = ""
    recipes.forEach((recipe) => {
        if (recipe.id < 9) {
            console.log(recipe)
            const recipeModel = recipeTemplate(recipe);
            const userCardDOM = recipeModel.getUserCardDOM();
            recipesSection.innerHTML += userCardDOM;
        }

    });
}

async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getRecipes();
    displayData(recipes);
}

init();