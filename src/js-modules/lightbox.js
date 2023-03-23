import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export default new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionsDelay: 250,
});
