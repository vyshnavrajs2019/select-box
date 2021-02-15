import React, { useState, useEffect, useCallback } from 'react';

import Checkbox from './Checkbox';
import Option from './Option';
import classes from './Select.module.css';

function Select({ label = "", search = true, multiselect = false, options = [] }) {
	const [active, setActive] = useState(false);
	const [query, setQuery] = useState("");
	const [selectedItems, setSelectedItems] = useState([]);

	const isSimpleArray = options.length === 0 || typeof options[0] === "string";
	let mappedOptions;
	if (isSimpleArray) {
		mappedOptions = options.map((option, optionIndex) => {
			return { optionIndex, displayName: option, value: { displayName: option } }
		});
	} else {
		mappedOptions = options.map((option, optionIndex) => {
			return { optionIndex, displayName: option.title, value: { displayName: option.title, ...option } };
		});
	}

	const [menuOptions, setMenuOptions] = useState(mappedOptions);

	const openDropdown = () => {
		setActive(true);
	}

	const closeDropdown = useCallback(() => {
		setActive(false);
	}, []);

	const onBodyClick = useCallback(() => {
		closeDropdown();
	}, [closeDropdown]);

	useEffect(() => {
		document.body.addEventListener('click', onBodyClick);
		return () => {
			document.body.removeEventListener('click', onBodyClick);
		}
	}, [onBodyClick]);

	const onOptionClick = (optionIndex, value) => {
		const item = selectedItems.find(_ => _.optionIndex === optionIndex);
		if (!multiselect) {
			setSelectedItems([{ optionIndex, value }]);
			closeDropdown();
			return; 
		}
		if (!item) {
			setSelectedItems([ ...selectedItems, { optionIndex, value }]);
		} else {
			setSelectedItems([ ...selectedItems.filter(_ => _.optionIndex !== optionIndex) ]);
		}
	}

	const onSelectAllClick = () => {
		if (selectedItems.length === mappedOptions.length) {
			setSelectedItems([]);
			return;
		}
		setSelectedItems(mappedOptions.map((option, optionIndex) => {
			return { optionIndex, value: option.value };
		}));
	}

	const fliterItems = (e) => {
		const v = e.target.value;
		setQuery(v);
		setMenuOptions(mappedOptions.filter(option => option.displayName.toLowerCase().includes(v.toLowerCase())));
	}

	let dropdown;
	let element;
	if (active) {
		const optionsArray = menuOptions.map((option) => <Option key={option.optionIndex} multiselect={multiselect} option={option} selectedItems={selectedItems} onOptionClick={onOptionClick} />);
		let dropdownFooter;
		let dropdownHeader;
		if (multiselect) {
			dropdownHeader = (
				<div onClick={(e) => {e.stopPropagation();onSelectAllClick();}} className={classes.select__dropdownHeader}><Checkbox isTickMark={false} checked={selectedItems.length === mappedOptions.length} /></div>
			);
			dropdownFooter = (
				<div className={classes.select__dropdownFooter} onClick={(e) => {e.stopPropagation();}}>
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
		if (search) {
			element = <input value={query} onChange={fliterItems} className={classes.select__search} placeholder="Search" />;
		} else {
			const elementContent = selectedItems.length ? `${label} - ${selectedItems.map(item => item.value.displayName).join(', ')}` : `${label}`;
			element = <span className={classes.select__spanContent}>{elementContent}</span>
		}
	} else {
		const elementContent = selectedItems.length ? `${label} - ${selectedItems.map(item => item.value.displayName).join(', ')}` : `${label}`;
		element = (
			<React.Fragment>
				<span className={classes.select__spanContent}>{elementContent}</span>
				<div className={classes.select__dropdownArrow} />
			</React.Fragment>
		);
	}

	return (
		<div className={classes.select} onClick={(e) => {e.stopPropagation(); openDropdown();}}>
			{element}
			{dropdown}
		</div>
	)
}

export default Select;