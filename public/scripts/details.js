var title = document.getElementById("title");
var image = document.getElementById("image");
var desc = document.getElementById("description");

var id = location.href.split("image/")[1];

window.onload = () => {
  fetch(`/api/v1/image/${id}`)
    .then((response) => response.json())
    .then((data) => load(data[0]));
};

function load(data) {
  title.textContent = data.title;
  image.src = data.path;
  desc.textContent = data.description;
}
