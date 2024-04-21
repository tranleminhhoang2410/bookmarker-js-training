import uploadIcon from '../../assets/images/svg/upload.svg';

const mutationFormTemplate = () => `
    <form class="mutation-form">
      <h2 class="form-heading text-form">Create a new book marker</h2>
      <div class="form-content">
        <div class="input-group book-name">
          <label for="book-name" class="input-label text-form">Book name</label>
          <input type="text" class="input-box" name="book-name" placeholder="Book name"/>
        </div>
        <div class="input-group book-author">
          <label for="book-author" class="input-label text-form">Author</label>
          <input type="text" class="input-box" name="book-author" placeholder="Author"/>
        </div>
        <div class="input-group book-published-date">
          <label for="book-published-date" class="input-label text-form">Published date</label>
          <input type="date" placeholder="MM/DD/YYYY" class="input-box" name="book-published-date" />
        </div>
        <div class="input-group book-image">
          <label for="book-image" class="input-label text-form">Image</label>
          <button type="button" class="btn btn-secondary upload-btn">
            <img src=${uploadIcon} alt="upload" />
            <span class="upload-text text-form text-light">Upload</span>
          </button>
          <input accept="image/*" type="file" class="input-box" name="book-image" placeholder="Book name"/>
          <div class="book-preview">
            <span class="book-name-preview"></span>
            <img class="book-img-preview" src="" alt=""
            />
          </div>
        </div>
        <div class="input-group book-description">
          <label for="book-description" class="input-label text-form">Description</label>
          <textarea class="input-box" name="book-description" placeholder="Description"></textarea>
        </div>
      </div>
      <div class="form-action">
        <button type="button" class="btn btn-cancel btn-action text-form text-light">Cancel</button>
        <button type="submit" class="btn btn-secondary btn-action text-form text-light">Save</button>
      </div>
    </form>
  `;

export default mutationFormTemplate;
