AOS.init();

const uchiwa = document.getElementById("rascal-uchiwa");

function flipUchiwa() {
  const flipping = document.querySelector(".flip-card");
  flipping.classList.toggle("flipping");
}

uchiwa.addEventListener("click", flipUchiwa);
