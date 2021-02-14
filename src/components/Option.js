import React from 'react';

import classes from './Option.module.css';

function Option({ option, multiselect, selected=false }) {
	const { displayName, value } = option;
	let checkbox = null;
	if (multiselect) {
		const className = selected ? classes.option__checkbox_checked : classes.option__checkbox;
		checkbox = <div className={className} />
	}
	return (
		<div className={classes.option}>
			<div>{checkbox}</div>
			<span>{displayName}</span>
		</div>
	)
}

export default Option;