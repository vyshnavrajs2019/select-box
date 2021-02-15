import React from 'react';

import Select from './components/Select';
import * as configData from './config/data';

function App() {
	return (
		<div className="App">
			{/* <Select options={configData.colors} multiselect /> */}
			<Select label="Colours" options={configData.colors} multiselect  />
		</div>
	);
}

export default App;