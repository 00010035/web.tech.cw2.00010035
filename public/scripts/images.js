var container = document.getElementById("container");
var images_hover = document.getElementById("images_hover");
window.onload = () => {
  fetch("/api/v1/image")
    .then((response) => response.json())
    .then((data) => load(data));
};

function load(data) {
  data.map((data) => {
    var Element = document.createElement("li");
    Element.addEventListener("mouseover", (e) => {
      images_hover.src = data.path;
    });
    Element.className = "image";
    var title = document.createElement("a");
    title.href = `/image/${data.id}`;
    title.className = "title";
    title.textContent = data.title;

    var Deletebtn = document.createElement("a");
    Deletebtn.href = `/image/${data.id}/delete`;
    Deletebtn.classList.add("images_delete");
    var icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt");

    Deletebtn.appendChild(icon);
    Element.appendChild(title);
    Element.appendChild(Deletebtn);
    container.appendChild(Element);
  });
}
