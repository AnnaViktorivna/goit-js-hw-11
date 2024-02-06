import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';

const gallerySimpleLightbox = new SimpleLightbox('.js-gallery a.link-item', {
  /* options */
  navText: ['←', '→'],
  closeText: '×',
  enableKeyboard: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const refs = {
  formEl: document.querySelector('.js-search-form[data-id="1"]'),
  listEl: document.querySelector('.js-gallery'),
  inputEl: document.querySelector('.js-input'),
  loaderEl: document.querySelector('.js-loader'),
};

refs.formEl.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const imgName = e.target.elements.query.value;
  refs.loaderEl.style.display = 'block';
  clearGallery();
  searchImage(imgName)
    .then(renderImage)
    .then(() => {
      gallerySimpleLightbox.refresh();

      gallerySimpleLightbox.on('error.simplelightbox', function (e) {
        console.log(e);
      });
    })
    .catch(handleError)
    .finally(() => {
      refs.loaderEl.style.display = 'none';
      clearInput();
    });
}

function clearInput() {
  refs.inputEl.value = null;
}

function searchImage(image) {
  const params = {
    q: image,
    image_type: 'photo',
    key: '42190247-000e45a6447d3626b5dd5a4c9',
    orientation: 'horizontal',
    safesearch: true,
  };
  const url = BASE_URL + '?' + new URLSearchParams(params);

  if (params.q === '') {
    return Promise.reject('Empty search query');
  }

  return fetch(url).then(res => res.json());
  //   const url = new URL(BASE_URL);
  //   url.search = new URLSearchParams(params).toString();
}

function renderImage(data) {
  const markup = imagesTemplate(data.hits);
  refs.listEl.innerHTML = markup;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}

function imageTemplate(img) {
  const {
    largeImageURL,
    likes,
    views,
    webformatURL,
    tags,
    comments,
    downloads,
  } = img;

  return `<li class="gallery-item">
    <a class="link-item" href="${largeImageURL}"><img class="gallery-img" src="${webformatURL}" alt="${tags}" title=""/></a>
      <div class="info">
        <p class="info-item"><b>Likes</b><br>${likes}</p>
        <p class="info-item"><b>Views</b><br>${views}</p>
        <p class="info-item"><b>Comments</b><br>${comments}</p>
        <p class="info-item"><b>Downloads</b><br>${downloads}</p>
      </div>
    </li>`;
}

function clearGallery() {
  refs.listEl.innerHTML = '';
}

function handleError(error) {
  console.error('Error:', error);
  iziToast.error({
    message: 'An error occurred. Please try again later.',
  });
}
