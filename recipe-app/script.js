const recipes = [
  { name: "Pasta", description: "Boil pasta, add sauce, and serve." },
  { name: "Omelette", description: "Beat eggs, cook in pan with veggies." },
  { name: "Sandwich", description: "Layer veggies and sauces between bread." },
  { name: "Maggi", description: "Boil noodles with spice mix and veggies." },
];

const savedRecipes = [];

function searchRecipe() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const list = document.getElementById("recipeList");
  list.innerHTML = "";

  const results = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(input)
  );

  if (results.length === 0) {
    list.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  results.forEach(recipe => {
    const div = document.createElement("div");
    div.className = "recipe";
    div.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <button onclick='saveRecipe("${recipe.name}")'>Save</button>
      <button onclick='shareRecipe("${recipe.name}", "${recipe.description}")'>Share</button>
    `;
    list.appendChild(div);
  });
}

function saveRecipe(name) {
  const recipe = recipes.find(r => r.name === name);
  if (!savedRecipes.includes(recipe)) {
    savedRecipes.push(recipe);
    updateSavedList();
    alert(`${name} saved!`);
  }
}

function updateSavedList() {
  const ul = document.getElementById("savedRecipes");
  ul.innerHTML = "";
  savedRecipes.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.name}: ${r.description}`;
    ul.appendChild(li);
  });
}

function shareRecipe(name, desc) {
  const text = `${name}: ${desc}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Recipe copied to clipboard!");
  });
}
