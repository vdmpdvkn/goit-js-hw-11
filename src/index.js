import { Notify } from 'notiflix';
import throttle from 'lodash.throttle';
import gallery from './js-modules/lightbox';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { fetchPhotos } from './js-modules/fetchPhotos';
import {
  renderGallery,
  renderGalleryOnScroll,
} from './js-modules/renderGallery';

import refs from './js-modules/refs';

const { formEl, galleryEl } = refs;

formEl.addEventListener('submit', formHandler);
window.addEventListener('scroll', throttle(checkPosition, 250));

let querySearch = '';
let pageCounter = 1;

async function formHandler(evt) {
  evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;
  const trimmedSearchQuery = searchQuery.value.trim();
  if (trimmedSearchQuery === '') {
    Notify.failure('Введи что то нормальное');
    return;
  }
  if (trimmedSearchQuery === querySearch) {
    pageCounter += 1;
  } else if (trimmedSearchQuery !== querySearch) {
    pageCounter = 1;
    querySearch = trimmedSearchQuery;
  }
  const photos = await fetchPhotos(querySearch, pageCounter);
  renderGallery(photos, galleryEl);
  gallery.refresh();
}

async function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;
  if (position >= threshold) {
    pageCounter += 1;
    const photos = await fetchPhotos(querySearch, pageCounter);
    renderGalleryOnScroll(photos, galleryEl);
    gallery.refresh();
  }
}
