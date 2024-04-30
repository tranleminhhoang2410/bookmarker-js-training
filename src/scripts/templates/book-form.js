import { BOOK_FORM } from '../constants/book-form';

import uploadIcon from '../../assets/images/svg/upload.svg';

export const bookFormTemplate = (options = {}) => {
	const {
		formId = BOOK_FORM.FORM_ID,
		uploadButtonId = BOOK_FORM.UPLOAD_BUTTON_ID,
		positiveButtonId = BOOK_FORM.POSITIVE_BUTTON_ID,
		negativeButtonId = BOOK_FORM.NEGATIVE_BUTTON_ID,
		positiveText = BOOK_FORM.POSITIVE_TEXT,
		negativeText = BOOK_FORM.NEGATIVE_TEXT
	} = options;

	return `
    <form id=${formId} class="book-form">
      <h2 class="form-heading text-heading">Create a new book marker</h2>
      <div class="form-content">
        <div class="input-group book-name">
          <label for="book-name" class="input-label text-sub-heading">Book name</label>
          <input type="text" class="text-description input-box" name="book-name" placeholder="Book name"/>
        </div>
        <div class="input-group book-author">
          <label for="book-author" class="input-label text-sub-heading">Author</label>
          <input type="text" class="text-description input-box" name="book-author" placeholder="Author"/>
        </div>
        <div class="input-group book-published-date">
          <label for="book-published-date" class="input-label text-sub-heading">Published date</label>
          <input type="date" placeholder="MM/DD/YYYY" class="text-description input-box" name="book-published-date" />
        </div>
        <div class="input-group book-image">
          <label for="book-image" class="input-label text-sub-heading">Image</label>
          <button id=${uploadButtonId} type="button" class="btn btn-secondary btn-upload">
            <img src=${uploadIcon} alt="upload" />
            <span class="upload-text text-sub-heading text-light">Upload</span>
          </button>
          <input id="file-upload" accept="image/*" type="file" class="text-description input-box" name="book-image" placeholder="Book name"/>
          <input type="hidden" id="book-image-url" name="book-image-url" value="">
          <div class="book-preview">
            <span class="text-description book-name-preview"></span>
            <img class="book-img-preview" src="" alt=""/>
          </div>
        </div>
        <div class="input-group book-description">
          <label for="book-description" class="input-label text-sub-heading">Description</label>
          <textarea class="text-description input-box" name="book-description" placeholder="Description"></textarea>
        </div>
      </div>
      <div class="form-action">
        <button id=${negativeButtonId} type="button" class="btn btn-cancel btn-rectangle btn-action text-sub-heading text-light">${negativeText}</button>
        <button id=${positiveButtonId} type="submit" class="btn btn-secondary btn-rectangle btn-action text-sub-heading text-light">${positiveText}</button>
      </div>
    </form>
  `;
};
