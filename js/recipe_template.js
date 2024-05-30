export default function recipeTemplate(data) {
    const { name, image, id, ingredients, time, description } = data;
    const imgUrl = `assets/images/${image}`;

    function getIngredientsList() {
        let ingredientsList = "";

        ingredients.forEach((element) => {
            let { ingredient, ...infos } = element;
            ingredientsList += `
            <li>
                <h4 class="ingredient-name">${ingredient}</h4>
                <p>${Object.values(infos).join(" ")}</p>
            </li>`
        })
        return ingredientsList
    }

    function getRecipeCardDOM() {
        const article =
            `<article class="recipe-card" id="${id}">
                <img class="card-img" src="${imgUrl}" alt="${name}">
                <div class="time">${time}min</div>
                <div class="card-content">
                    <h2>${name}</h2>
                    <section class="description">
                        <h3>RECETTE</h3>
                        <p>${description}</p>
                    </section>
                    <section class="ingredients">
                        <h3>INGREDIENTS</h3>
                        <ul>${getIngredientsList()}</ul>
                    </section>
                </div>
            </article>`
        return (article);
    }
    return { name, imgUrl, getRecipeCardDOM }
}