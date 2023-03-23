import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotos(query, page) {
  const params = {
    key: '34643580-ab3b9936868efea730eeb9b50',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  };

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params,
    });
    const totalPages = response.data.totalHits / params.per_page;
    console.log('totalPages->', totalPages);
    if (response.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (params.page >= totalPages) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    if (params.page === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    return response.data.hits;
  } catch (error) {
    Notify.failure(error.message);
    return;
  }
}
