import './css/styles.css';
// import NewsApiService from './NewsApiService.js'

class NewsApiService {
  constructor() {
      this.searchQuery = '';
      this.page = 1;
  }

  fetchArticles() {
      // const options = {
      //     headers: {
      //         Autorization: '',                
      //     },
      // };
      const url = `https://pixabay.com/api/?key=28304018-265b00fbf5f9e6bf82ef29498&q=${this.searchQuery}&
                image_type=photo&orientation=horizontal&safesearch=false&per_page=40`;    

      return fetch(url)
          .then(r => r.json())
          .then(data => {
              this.incrementPage();
              return data;
          });
  }

  incrementPage() {
      this.page += 1
  }

  resetPage() {
      this.page = 1;
  }

  get query() {
      return this.searchQuery;
  }

  set query(newQuery) {
      this.searchQuery = newQuery;
  }
}


const newsApiService = new NewsApiService();


const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");

// searchForm.addEventListener('submit', onSearch)

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
  const markup = cards
    .map((card) => {
      return `
        <div class="photo-card">
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
        </div>
      `;
    })
    .join("");
    gallery.innerHTML = markup;
}
