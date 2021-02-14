import React from 'react';

import Select from './components/Select';
import * as configData from './config/data';

function App() {
	return (
		<div className="App">
			<Select options={configData.colors} />
			<Select options={configData.components} />
		</div>
	);
}

export default App;