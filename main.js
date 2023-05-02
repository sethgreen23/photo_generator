// geting the data from the unspla
const loader = document.querySelector(".loader");
const container = document.querySelector(".photo-container");
const imageCount = 10;
function hide(element) {
  element.style.display = "none";
}
function show(element) {
  element.style.display = "block";
}

async function getFotos() {
  show(loader);
  const accessKey = "6yiOZYKYrUyHvWD8DEVOY-PXUk60K1cfD3nJTCp2low";
  let url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${imageCount}`;
  try {
    const request = await axios.get(url);
    const response = await request;
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function showFotos(onload = false) {
  show(loader);
  const photos = await getFotos();
  // console.log(photos.data);
  if (onload) {
    container.innerHTML = "";
  }
  for (let photo of photos.data) {
    const content = `
    <div class="photo" data-link="${photo.links.html} onclick="opendLink(this)">
      <img
        class="image"
        title="${photo.description}"
        src="${photo.urls.regular}"
        alt="${photo.description}"
        class="img"
      />
    </div>
    `;
    container.innerHTML += content;
  }
  hide(loader);
}
window.onload = function () {
  showFotos(true);
};

let throtter = false;

function throttler(callback, timmer) {
  if (throtter) return;
  throtter = true;
  setTimeout(() => {
    callback();
    throtter = false;
  }, timmer);
}

window.addEventListener("scroll", function (event) {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
    throttler(function () {
      console.log("Im inside of throtter");
      showFotos();
    }, 1000);
  }
});

function openLink(element) {
  let link = element.getAttribute("data-link");
  window.open(link, "_blank");
}
