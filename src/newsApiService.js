export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        const options = {
            headers: {
                Autorization: '',                
            },
        };
        const url = `https://pixabay.com/api/?key=28304018-265b00fbf5f9e6bf82ef29498&q=white+cats&image_type=photo`;    

        return fetch('https://pixabay.com/api/?key=28304018-265b00fbf5f9e6bf82ef29498&q=white+cats&image_type=photo');
            // .then(data => {
            //     this.incrementPage();
            //     return data;
            // });
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
