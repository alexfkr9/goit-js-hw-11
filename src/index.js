import './css/styles.css';
import NewsApiService from './NewsApiService.js';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


const newsApiService = new NewsApiService();


const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");

searchForm.addEventListener('submit', onSearch)

onSearch();
function onSearch(e) {
  // e.preventDefault();   // for testing

  // clearArticlesContainer();
  // newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.query = 'car';       // for testing
  // newsApiService.resetPage();

  newsApiService.fetchArticles().then(response => renderUserList(response));
 

  // console.log(newsApiService.querry)
}

// function appendArticlesMarkup(acticles) {  
// }


function renderUserList(data) {
    console.log(data);
  const cards=data.hits;
  if (cards.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');    
    return;
  }  
  const markup = cards
    .map((card) => {
      return `
      <a href=${card.webformatURL}>        
            <img src=${card.webformatURL} alt=${card.pageURL} loading="lazy" />
            <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  <span>${card.likes}</span>
                </p>
                <p class="info-item">
                  <b>Views</b>
                  <span>${card.views}</span>
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  <span>${card.comments}</span>
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  <span>${card.downloads}</span>
                </p>
            </div>        
      </a>  
      `;
    })
    .join("");
    gallery.innerHTML = markup;
}

