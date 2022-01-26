const API_KEY = '24213942-a792ed2f2e86967ff0299013f';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
    return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    ).then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong');
      };
      return response.json()
    })
      .then(( data ) => {
        this.incrementPage();
        if (data.length === 0) {
          throw new Error('Information not found');
                };
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
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