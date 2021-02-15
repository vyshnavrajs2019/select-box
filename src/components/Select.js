import React, { useState, useRef, useEffect, useCallback } from 'react';

import Checkbox from './Checkbox';
import Option from './Option';
import classes from './Select.module.css';

function Select({ label = "", search = true, multiselect = false, options = [] }) {
	const [active, setActive] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);

	const isSimpleArray = options.length === 0 || typeof options[0] === "string";
	let mappedOptions;
	if (isSimpleArray) {
		mappedOptions = options.map(option => {
			return { displayName: option, value: { displayName: option } }
		});
	} else {
		mappedOptions = options.map(option => {
			return { displayName: option.title, value: { displayName: option.title, ...option } };
		});
	}

	const openDropdown = () => {
		setActive(true);
	}

	const closeDropdown = () => {
		setActive(false);
	}

	const onOptionClick = (optionIndex, value) => {
		const item = selectedItems.find(_ => _.optionIndex === optionIndex);
		if (!item) {
			setSelectedItems([ ...selectedItems, { optionIndex, value }]);
		} else {
			setSelectedItems([ ...selectedItems.filter(_ => _.optionIndex !== optionIndex) ]);
		}
	}

	let dropdown;
	let element;
	if (active) {
		const optionsArray = mappedOptions.map((option, index) => <Option key={index} multiselect={multiselect} option={option} optionIndex={index} selectedItems={selectedItems} onOptionClick={onOptionClick} />);
		let dropdownFooter;
		let dropdownHeader;
		if (multiselect) {
			dropdownHeader = (
				<div className={classes.select__dropdownHeader}><Checkbox /></div>
			);
			dropdownFooter = (
				<div className={classes.select__dropdownFooter}>
					<button onClick={() => setSelectedItems([])} className={classes.select__dropdownClearButton}>Clear</button>
					<button onClick={closeDropdown} className={classes.select__dropdownSubmitButton}>Submit</button>
				</div>
			);
		}
		dropdown = (
			<div className={classes.select__dropdown}>
				{dropdownHeader}
				<div className={classes.select__dropdownScrollContainer}>{optionsArray}</div>
				{dropdownFooter}
			</div>
		);
		element = <input />
	} else {
		const elementContent = selectedItems.length ? `${label} - ${selectedItems.map(item => item.value.displayName).join(', ')}` : `${label}`;
		element = (
			<React.Fragment>
				<span className={classes.select__spanContent}>{elementContent}</span>
				<div className={classes.select__dropdownArrow} />
				<div className={classes.select__overlay} onClick={openDropdown} />
			</React.Fragment>
		);
	}

	// const selectRef = useRef();

	// const bodyEventHandler = useCallback((event) => {
	// 	const target = event.target;
	// 	const withinSelectRef = selectRef.current.contains(target);
	// 	if (!withinSelectRef) {
	// 	alert('close');
	// 		console.log(selectRef.current, target);
	// 		closeDropdown();
	// 	}
	// }, []);

	// useEffect(() => {
	// 	document.body.addEventListener('click', bodyEventHandler);
	// 	return () => {
	// 		document.body.removeEventListener('click', bodyEventHandler);
	// 	}
	// }, [bodyEventHandler]);

	return (
		<div className={classes.select}>
			{element}
			{dropdown}
		</div>
	)
}

export default Select;