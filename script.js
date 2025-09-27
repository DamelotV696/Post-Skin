let PostName = document.getElementById("postName");
let PostDescription = document.getElementById("postDescription");
let PostPrice = document.getElementById("postPrice");
let PostCategory = document.getElementById("category");
let addPostBtn = document.getElementById("addPosts");
let adsContainer = document.getElementById("adsContainer");
let search = document.getElementById("search");
let filterCategory = document.getElementById("filterCategory");
let sortPrice = document.getElementById("sortPrice");

let posts = [];

addPostBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let name = PostName.value.trim();
  let description = PostDescription.value.trim();
  let price = PostPrice.value.trim();
  let category = PostCategory.value;

  if (name && description && price && category) {
    const NewPost = {
      name: name,
      description: description,
      price: parseFloat(price),
      category: category == 1 ? "Техника" : "Животные",
    };

    posts.push(NewPost);

    PostName.value = "";
    PostDescription.value = "";
    PostPrice.value = "";

    let modal = bootstrap.Modal.getInstance(adModal);
    modal.hide();

    applyFilters();
  } else {
    alert("Пожалуйста, заполните все поля!");
  }
});

function applyFilters() {
  let query = search.value.trim().toLowerCase();
  let filCat = filterCategory.value;
  let sort = sortPrice.value;
  let filteredPosts = posts.filter((post) => {
    let matName = post.name.toLowerCase().includes(query);
    let matCat = filCat === "all" || post.category === filCat;
    return matName && matCat;
  });
  if (sort === "asc") {
    filteredPosts.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredPosts.sort((a, b) => b.price - a.price);
  }

  renderPosts(filteredPosts);
}

search.addEventListener("input", applyFilters);
filterCategory.addEventListener("change", applyFilters);
sortPrice.addEventListener("change", applyFilters);

function renderPosts(list = posts) {
  adsContainer.innerHTML = "";

  if (list.length === 0) {
    adsContainer.innerHTML = `<p class="text-center mt-3">Нет объявлений</p>`;
    return;
  }

  list.forEach((post) => {
    adsContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="card mb-3" style="width: 18rem; ">
        <div class="card-body">
          <h4 class="card-title text-center text-light">${post.name}</h4>
          <p class="card-text text-center text-light">${post.description}</p>
          <p class="card-text text-center text-light">Цена: <b>${post.price} ₽</b></p>
          <p class="card-text text-center text-light">Категория: <b>${post.category}</b></p>
        </div>
      </div>`
    );
  });
}
