import axios from 'axios';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    } 
  
    fetchArticles = async () =>  {
        
        const headers = new Headers({
          "Content-Type": "application/json",
          "X-Custom-Header": "custom value",
        });
        const url = `https://pixabay.com/api/?key=28304018-265b00fbf5f9e6bf82ef29498&q=${this.searchQuery}&
                  image_type=photo&orientation=horizontal&safesearch=false&per_page=40`;
        
        const fetchGallery = await axios.get(url);
        console.log(fetchGallery.data);
        this.incrementPage();
        return fetchGallery.data;          
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
