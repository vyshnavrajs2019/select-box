import React from 'react';
import Checkbox from './Checkbox';

import classes from './Option.module.css';

function Option({ option, optionIndex, multiselect, selectedItems, onOptionClick }) {
	const { displayName, value } = option;
	let checkbox = null;
	const selected = selectedItems.find(item => item.optionIndex === optionIndex);
	if (multiselect) {
		checkbox = <Checkbox checked={selected} />
	}
	return (
		<div className={selected ? classes.option_selected : classes.option} onClick={() => onOptionClick(optionIndex, value)}>
			{checkbox}
			<span>{displayName}</span>
		</div>
	)
}

export default Option;