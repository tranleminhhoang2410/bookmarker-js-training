export const serverErrorTemplate = () => {
	return `
    <div class='server-error-content container'>
      <h2 class='server-error-heading'>500</h2>
      <p class='text-description server-error-message'>Oops! Something went wrong :(</p>
      <a class='back-link' href='/'>Back to home</a>
    </div>
  `;
};
