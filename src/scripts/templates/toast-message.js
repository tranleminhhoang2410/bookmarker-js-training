export const toastMessageTemplate = (message = 'Your actions executed successfully!', description) => `
  <div class="toast-container success">
    <h2 class="text-heading toast-message">${message}</h2>
    <p class="text-description toast-description">${description}</p>
    <button class="btn btn-close">
      <img width="16px" height="16px" src=${closeIcon} alt="close">
    </button>
  </div>
`;
