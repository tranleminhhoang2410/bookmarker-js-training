import { BOOK_FORM } from '../constants';

import uploadIcon from '../../assets/images/svg/upload.svg';

export const bookFormTemplate = (book = {}, options = {}) => {
	const { name = '', description = '', authors = [], imageUrl = '', publishedDate = '' } = book;

	const {
		formTitle = BOOK_FORM.TITLE.CREATE_BOOK,
		formId = BOOK_FORM.FORM_ID,
		uploadButtonId = BOOK_FORM.UPLOAD_BUTTON_ID,
		positiveButtonId = BOOK_FORM.POSITIVE_BUTTON_ID,
		negativeButtonId = BOOK_FORM.NEGATIVE_BUTTON_ID,
		positiveText = BOOK_FORM.POSITIVE_TEXT,
		negativeText = BOOK_FORM.NEGATIVE_TEXT
	} = options;

	return `
    <form id=${formId} class="book-form">
      <h2 class="form-heading text-heading">${formTitle}</h2>
      <div class="form-content">
        <div class="input-group book-name">
          <label for="book-name" class="input-label text-sub-heading">Book name</label>
          <input type="text" class="text-description input-box" data-field-name="name" data-field-validate="Book's name" name="book-name" placeholder="Book name" value="${name}"/>
          <p class="text-description text-error error-message"></p>
        </div>
        <div class="input-group book-author">
          <label for="book-authors" class="input-label text-sub-heading">Author(s)</label>
          <input type="text" class="text-description input-box" data-field-name="authors" data-field-validate="Book's author(s)" name="book-authors" placeholder="Author(s)" value="${authors}"/>
          <p class="text-description text-error error-message"></p>
        </div>
        <div class="input-group book-published-date">
          <label for="book-published-date" class="input-label text-sub-heading">Published date</label>
          <input type="date" placeholder="MM/DD/YYYY" data-field-name="publishedDate" data-field-validate="Book's published date" class="text-description input-box" name="book-published-date" value="${publishedDate}"/>
          <p class="text-description text-error error-message"></p>
        </div>
        <div class="input-group book-image">
          <label for="book-image" class="input-label text-sub-heading">Image</label>
          <button id=${uploadButtonId} type="button" class="btn btn-secondary btn-upload">
            <img src=${uploadIcon} alt="upload" />
            <span class="upload-text text-sub-heading text-light">Upload</span>
          </button>
          <input id="file-upload" accept="image/*" type="file" data-field-name="image" data-field-validate="Book's image" class="text-description input-box" name="book-image" />
          <input type="hidden" id="book-image-url" name="book-image-url" value="">
          <div class="book-preview">
            <span class="text-description book-name-preview"></span>
            <figure class="book-img-preview-frame">
              <img class="book-img-preview" src="${imageUrl}" alt=""/>
            </figure>
          </div>
          <p class="text-description text-error error-message"></p>
        </div>
        <div class="input-group book-description">
          <label for="book-description" class="input-label text-sub-heading">Description</label>
          <textarea class="text-description input-box" name="book-description" data-field-name="description" data-field-validate="Book's description" placeholder="Description">${description}</textarea>
          <p class="text-description text-error error-message"></p>
        </div>
      </div>
      <div class="form-action">
        <button id=${negativeButtonId} type="button" class="btn btn-cancel btn-rectangle btn-action text-sub-heading text-light">${negativeText}</button>
        <button id=${positiveButtonId} type="submit" class="btn btn-secondary btn-rectangle btn-action text-sub-heading text-light">${positiveText}</button>
      </div>
    </form>
  `;
};
