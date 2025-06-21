/**
 * Run this example:
 *   npm run example examples/checkbox.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Checkbox} from '../source/index.js';

function Example() {
	const [checked1, setChecked1] = useState(false);
	const [checked2, setChecked2] = useState(true);
	const [checked3, setChecked3] = useState(false);

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<Text bold color="blue">
				Checkbox Examples
			</Text>

			<Checkbox
				isChecked={checked1}
				label="Enable notifications"
				onChange={setChecked1}
			/>

			<Checkbox
				isChecked={checked2}
				label="Save login credentials"
				onChange={setChecked2}
			/>

			<Checkbox
				isChecked={checked3}
				label="Accept terms and conditions"
				onChange={setChecked3}
			/>

			<Checkbox isIndeterminate label="Partially selected" />

			<Checkbox isChecked label="Pre-checked option" />

			<Checkbox isDisabled label="Disabled option" />

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>Use Space or Enter to toggle checkboxes</Text>
			</Box>

			<Box marginTop={1}>
				<Text>
					Status: notifications={checked1 ? 'on' : 'off'}, credentials=
					{checked2 ? 'saved' : 'not saved'}, terms=
					{checked3 ? 'accepted' : 'not accepted'}
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
