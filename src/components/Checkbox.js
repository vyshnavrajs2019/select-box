import React from 'react';

import classes from './Checkbox.module.css';

function Checkbox({ checked, isTickMark=true }) {
	return (
		<div className={checked ? classes.checkbox_checked : classes.checkbox} />
	)
}

export default Checkbox;