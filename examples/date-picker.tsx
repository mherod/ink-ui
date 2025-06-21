import React, {useState} from 'react';
import {render, Text, Box} from 'ink';
import {DatePicker} from '../source/index.js';

function Example() {
	const [selectedDate, setSelectedDate] = useState<Date>();

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="green">
				📅 Date Picker Example
			</Text>

			<Text>
				Use arrow keys to navigate, Space/Enter to select, P/N for months, T for
				today
			</Text>

			<DatePicker
				defaultValue={new Date()}
				onSelect={setSelectedDate}
				onSubmit={date => {
					// Date submitted successfully
					console.log('Date submitted:', date);
				}}
			/>

			{selectedDate && (
				<Box marginTop={1}>
					<Text color="blue">
						You selected:{' '}
						{selectedDate.toLocaleDateString('en-US', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</Text>
				</Box>
			)}
		</Box>
	);
}

render(<Example />);
