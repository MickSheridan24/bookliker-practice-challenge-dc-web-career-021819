document.addEventListener("DOMContentLoaded", function() {
  const list = document.getElementById("list");
  fetch("http://localhost:3000/books")
    .then(e => e.json())
    .then(books =>
      books.forEach(book => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${book.title}</h3>`;
        div.addEventListener("click", () => {
          console.log(book.title);
          show(book, div);
        });
        list.appendChild(div);
      })
    );
});

function show(book, div) {
  const list = document.getElementById("list");
  for (let i = 0; i < list.children.length; i++) {
    while (list.children[i].children[1]) {
      list.children[i].children[1].remove();
    }
  }
  div.innerHTML = `<h3>${book.title}</h3><img src= ${book.img_url}></img> <p>${book.description}</p>`;
  const likes = document.createElement("p");
  likes.innerText = "Liked By: ";
  for (user of book.users) {
    likes.innerText += user.username + " ";
  }
  div.appendChild(likes);

  if (!book.users.find(e => e.id === 1)) {
    const button = document.createElement("button");
    button.innerHTML = "like";
    div.appendChild(button);
    const updated = [...book.users];
    button.addEventListener("click", () => {
      updated.push({ id: 1, username: "pouros" });
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({ users: updated })
      }).then(e => {
        console.log("reached", e);
        const likeP = div.querySelectorAll("p")[1];
        likeP.innerText += " pouros";
      });
    });
  }
}
