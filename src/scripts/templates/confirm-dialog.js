import { CONFIRM_DIALOG } from '../constants/confirm-dialog';

export const confirmDialogTemplate = (
	message = CONFIRM_DIALOG.DELETE_BOOK,
	description = CONFIRM_DIALOG.DESCRIPTION,
	options = {}
) => {
	const {
		positiveButtonId = CONFIRM_DIALOG.POSITIVE_BUTTON_ID,
		negativeButtonId = CONFIRM_DIALOG.NEGATIVE_BUTTON_ID,
		positiveText = CONFIRM_DIALOG.POSITIVE_TEXT,
		negativeText = CONFIRM_DIALOG.NEGATIVE_TEXT
	} = options;

	return `
    <div class="confirm-dialog">
      <h2 class="text-heading confirm-dialog-heading">${message}</h2>
      <p class="text-description confirm-dialog-description">${description}</p>
      <div class="confirm-dialog-action">
        <button id=${negativeButtonId} class="text-sub-heading text-light btn btn-rectangle btn-action btn-cancel">${negativeText}</button>
        <button id=${positiveButtonId} class="text-sub-heading text-light btn btn-rectangle btn-secondary btn-action btn-confirm">${positiveText}</button>
      </div>
    </div>
  `;
};
