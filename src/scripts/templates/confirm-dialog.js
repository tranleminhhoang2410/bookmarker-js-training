export const confirmDialogTemplate = () => {
	return `
    <div class='confirm-dialog'>
      <h2 class='text-heading confirm-dialog-heading'>Are you sure to delete this book?</h2>
      <p class='text-description confirm-dialog-description'>This action can not undo, so please careful with this action.</p>
      <div class='confirm-dialog-action'>
        <button class='text-white confirm-dialog-btn cancel-btn'>Cancel</button>
        <button class='text-white confirm-dialog-btn confirm-btn'>OK</button>
      </div>
    </div>
  `;
};
