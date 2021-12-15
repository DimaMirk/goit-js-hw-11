export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures(searchQuery) {
    const response = await fetch(
      `https://pixabay.com/api/?key=24657500-5c2ff9cb7634f4ca49a4c6811&q=${this.searchQuery}&image_type=photo$safesearch=true&orientation=horizontal&page=${this.page}`,
    );
    const newCard = await response.json();
    this.incrementPage();
    return newCard;
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
