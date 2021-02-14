import React from 'react';

import Option from './Option';
import classes from './Select.module.css';

function Select({ search=true, multiselect=false, options=[] }) {
	const isSimpleArray = options.length === 0 || typeof options[0] === "string";
	let mappedOptions;
	if (isSimpleArray) {
		mappedOptions = options.map(option => {
			return { displayName: option, value: option }
		});
	} else {
		mappedOptions = options.map(option => {
			return { displayName: option.title, value: option };
		});
	}
	const optionsArray = mappedOptions.map((option, index) => <Option key={index} multiselect={multiselect} option={option} />);
	return (
		<div className={classes.select}>
			{optionsArray}
		</div>
	)
}

export default Select;