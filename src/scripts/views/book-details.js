import { bookDetailsTemplate } from '../templates/book-details';
import { serverErrorTemplate } from '../templates/server-error';

import { createElement, getElement } from '../utils';

export default class BookDetailsView {
  constructor() {
    this.mainContent = getElement('#content');
  }

  removeChildNodes(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  displayServerError() {
    this.removeChildNodes(this.mainContent);
    this.mainContent.innerHTML = serverErrorTemplate();
  }

  displaySkeletonBookDetails() {
    const bookDetailsWrapper = createElement('section', 'book-details container loading');
    bookDetailsWrapper.innerHTML = bookDetailsTemplate({});
    this.mainContent.appendChild(bookDetailsWrapper);
  }

  getBookDetails(book) {
    this.removeChildNodes(this.mainContent);
    const bookDetailsWrapper = createElement('section', 'book-details container');
    bookDetailsWrapper.innerHTML = bookDetailsTemplate(book);
    this.mainContent.appendChild(bookDetailsWrapper);
  }
}
