import React, { useState } from 'react';

import Select from './components/Select';
import * as configData from './config/data';

function App() {
	const [search, setSearch] = useState(true);
	const [multiSelect, setMultiSelect] = useState(false);

	const onCheckChange = (e, cb) => {
		const v = e.target.checked;
		cb(v);
	}

	return (
		<div className="App">
			<div>
				<input id="search" type="checkbox" checked={search} onChange={(e) => onCheckChange(e, setSearch)} />&nbsp;&nbsp;
				<label for="search">Search</label>
			</div>
			<div>
				<input id="multi" type="checkbox" checked={multiSelect} onChange={(e) => onCheckChange(e, setMultiSelect)} />&nbsp;&nbsp;
				<label for="multi">Multiselect</label>
			</div>
			<br/ >
			<div style={{display: 'flex'}}>
			<Select search={search} label="Colors" options={configData.colors} multiselect={multiSelect}  />
			&nbsp;&nbsp;&nbsp;
			<Select search={search} label="Components" options={configData.components} multiselect={multiSelect}  />
			</div>
		</div>
	);
}

export default App;