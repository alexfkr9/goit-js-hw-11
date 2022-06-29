import axios from 'axios';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.currentCard = 1;
    } 
  
    fetchArticles = async () =>  {
        
        const headers = new Headers({
          "Content-Type": "application/json",
          "X-Custom-Header": "custom value",
        });
        const url = `https://pixabay.com/api/?key=28304018-265b00fbf5f9e6bf82ef29498&q=${this.searchQuery}&
                  image_type=photo&orientation=horizontal&safesearch=false&page=${this.page}&per_page=3
                  `;
        
        const fetchGallery = await axios.get(url, headers);
        
        this.incrementPage();
        this.incrementCard();

        return fetchGallery.data;          
    }
  
    incrementPage() {
        this.page += 1
    }
  
    incrementCard() {
        this.currentCard += 140;
    }

    resetPageAndCard() {
        this.page = 1;
        this.currentCard = 1;        
    }    

    getCurrentCard() {
        return this.currentCard;
    }    
  
    get query() {
        return this.searchQuery;
    }
  
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
  }
