import React from 'react';

import classes from './Checkbox.module.css';

function Checkbox({ checked, isTickMark=true }) {
	let icon;
	
	// Show check mark	
	if (isTickMark && checked) {
		icon = <svg id="Capa_1" enableBackground="new 0 0 515.556 515.556" height="512" viewBox="0 0 515.556 515.556" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/></svg>;
	}
	
	// Show plus icon on select all
	else if (!isTickMark && checked) {
		icon = <svg height="469.33333pt" viewBox="0 0 469.33333 469.33333" width="469.33333pt" xmlns="http://www.w3.org/2000/svg"><path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0"/></svg>;
	}
	
	// Show minus icon on remove all
	else if (!isTickMark && !checked) {
		icon = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="124px" height="124px" viewBox="0 0 124 124" style={{enableBackground:'new 0 0 124 124'}} xmlSpace="preserve"><g><path d="M112,50H12C5.4,50,0,55.4,0,62c0,6.6,5.4,12,12,12h100c6.6,0,12-5.4,12-12C124,55.4,118.6,50,112,50z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>;
	}

	// Checked class is added either when the icon type is not of check mark or when it is cehcked
	const classNames = [classes.checkbox];
	(!isTickMark || checked) && classNames.push(classes.checkbox_checked);
	
	return (
		<div className={classNames.join(' ')}>
			{icon}
		</div>
	)
}

export default Checkbox;
