import closeIcon from '../../assets/images/svg/close.svg';

// Constants
import { TOAST } from '../constants';

// eslint-disable-next-line max-len
export const toastTemplate = (
	message = TOAST.MESSAGE.SUCCESS,
	description = TOAST.DESCRIPTION.DELETED_BOOK,
	options = {}
) => {
	const { type = TOAST.TYPE.SUCCESS, closeButtonId = TOAST.CLOSE_BUTTON_ID } = options;

	return `
    <div class="toast-container ${type}">
      <h2 class="text-heading toast-message">${message}</h2>
      <p class="text-description toast-description">${description}</p>
      <button id=${closeButtonId} class="btn btn-close">
        <img width="16px" height="16px" src=${closeIcon} alt="close">
      </button>
    </div>
  `;
};
