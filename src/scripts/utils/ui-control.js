// Create an element with an optional CSS class
export const createElement = (tag, classNames) => {
	const element = document.createElement(tag);
	if (classNames) element.classList.add(...classNames.split(' '));
	return element;
};

// Retrieve an element from the DOM
export const getElement = (selector) => {
	const element = document.querySelector(selector);
	return element;
};

// Retrieve more than one element from the DOM
export const getElements = (selector) => {
  const elements = document.querySelectorAll(selector);
  return elements;
};
