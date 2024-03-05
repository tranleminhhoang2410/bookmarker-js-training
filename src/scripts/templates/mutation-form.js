export const mutationFormTemplate = () => {
	return `
    <form class="mutation-form">
			<h2 class="form-heading text-heading">Create a new book marker</h2>
				<div class="form-content">
					<div class="input-group book-name">
						<label for="book-name" class="input-label text-sub-heading">Book name</label>
						<input type="text" class="input-box" name="book-name" placeholder="Book name" />
					</div>
					<div class="input-group book-author">
		        <label for="book-author" class="input-label text-sub-heading">Author</label>
		        <input type="text" class="input-box" name="book-author" placeholder="Author" />
	        </div>
	        <div class="input-group book-published-date">
		        <label for="book-published-date" class="input-label text-sub-heading">Published date</label>
		        <input type="date" class="input-box" name="book-published-date" />
	        </div>
	        <div class="input-group book-image">
		        <label for="book-image" class="input-label text-sub-heading">Image</label>
		        <button type="button" class="btn btn-secondary btn-upload">
			        <img src="../assets/images/svg/upload.svg" alt="upload" />
			        <span class="btn-upload-text text-sub-heading text-white">Upload</span>
		        </button>
		        <input type="file" class="input-box" name="book-image" placeholder="Book name" />
	        </div>
	        <div class="input-group book-description">
		        <label for="book-description" class="input-label text-sub-heading">Description</label>
		        <textarea class="input-box" name="book-description" placeholder="Description"></textarea>
	        </div>
        </div>
        <div class="form-action">
	        <button class="btn btn-cancel btn-action text-sub-heading text-white">Cancel</button>
	        <button class="btn btn-secondary btn-action text-sub-heading text-white">Save</button>
        </div>
			</form>
  `;
};
