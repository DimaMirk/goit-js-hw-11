import './sass/styles.scss';
import FetchPictures from './js/fetchPicture';
// import createCard from './js/marcup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.showBtn'),
};

const fetchApiPictures = new FetchPictures();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// let searchQuery = '';

function onSearch(e) {
  e.preventDefault();
  fetchApiPictures.query = e.currentTarget.elements.searchQuery.value;

  if (fetchApiPictures.query === '') {
    return showError();
  }

  fetchApiPictures.fetchPictures().then(({ hits, totalHits }) => {
    clearCardsConteiner();
    if (totalHits === 0) {
      return showError();
    }
    appendCardsMarcup(hits);
    showFirstQuerytotalHits(totalHits);
    refs.loadMoreBtn.style.display = 'flex';
  });
  fetchApiPictures.resetPage();
}

function onLoadMore() {
  fetchApiPictures.fetchPictures().then(({ hits }) => {
    appendCardsMarcup(hits);
  });
}

function appendCardsMarcup(cards) {
  refs.gallery.insertAdjacentHTML('beforeend', createCard(cards));
  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}

function showError() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  refs.loadMoreBtn.style.display = 'none';
}

function createCard(res) {
  return res
    .map(
      elem => `<a class="photo-card" href=${elem.largeImageURL}>
              <img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
               <div class="info">
                 <p class="info-item">
                    <b>Likes </b>${elem.likes}
                 </p>
                 <p class="info-item">
                     <b>Views </b>${elem.views}
                 </p>
                 <p class="info-item">
                      <b>Comments </b>${elem.comments}
                 </p>
                 <p class="info-item">
                       <b>Downloads </b> ${elem.downloads}
                 </p>
               </div>
         </a>`,
    )
    .join('');
}

function clearCardsConteiner() {
  refs.gallery.innerHTML = '';
}
function showFirstQuerytotalHits(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
