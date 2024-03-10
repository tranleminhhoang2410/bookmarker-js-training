export const timeFormat = (timeStamp) => {
	const timeFormat = new Date(timeStamp);
	const hours = timeFormat.getHours();
	const minutes = timeFormat.getMinutes().toString().padStart(2, '0');
	const year = timeFormat.getFullYear();
	const month = (timeFormat.getMonth() + 1).toString().padStart(2, '0');
	const date = timeFormat.getDate().toString().padStart(2, '0');
	const periodOfDay = hours >= 12 ? 'PM' : 'AM';
	const timeDisplay = `${hours}:${minutes} ${periodOfDay}, ${year}-${month}-${date}`;
	return timeDisplay;
};
