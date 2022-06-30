import './css/styles.scss';
import GalleryApiService from './GalleryApiService.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryApiService = new GalleryApiService();

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  clearMarkup();

  galleryApiService.query = e.currentTarget.elements.searchQuery.value;

  loadMoreBtn.classList.add('is-hidden');

  galleryApiService.fetchArticles().then(chooseMarkup);
}

function clearMarkup() {
  gallery.innerHTML = '';
  galleryApiService.resetPageAndCard();
}

function chooseMarkup(data) {
  if (data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  addMarkup(data);
}

function addMarkup(data) {
  const cards = data.hits;
  const markup = cards
    .map(card => {
      return `<div class="gallery__item">
                <a class="gallery__link" href='${card.largeImageURL}'>              
                  <img class="gallery__image" src='${card.webformatURL}' alt='${card.pageURL}' loading="lazy" />
                </a>
                <div class="info">
                    <p class="info__item">
                      <b>Likes</b>
                      <span>${card.likes}</span>
                    </p>
                    <p class="info__item">
                      <b>Views</b>
                      <span>${card.views}</span>
                    </p>
                    <p class="info__item">
                      <b>Comments</b>
                      <span>${card.comments}</span>
                    </p>
                    <p class="info__item">
                      <b>Downloads</b>
                      <span>${card.downloads}</span>
                    </p>
                </div>    
              </div>`;
    })
    .join('');

  // gallery.innerHTML = markup;    // For switch page
  gallery.insertAdjacentHTML('beforeend', markup);

  loadMoreBtn.classList.remove('is-hidden');
  loadMoreBtn.addEventListener('click', onLoadMore);

  // Smooth page scrolling
  pageScrolling();

  // SimpleLightbox
  var lightbox = new SimpleLightbox('.gallery a', {});
  lightbox.refresh();

  // notify the end of search results
  if (galleryApiService.getCurrentCard() >= data.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
}

function onLoadMore() {
  galleryApiService.fetchArticles().then(addMarkup);
}

function pageScrolling() {
  const { height: cardHeight } = document
    .querySelector('.scroll-window')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}
