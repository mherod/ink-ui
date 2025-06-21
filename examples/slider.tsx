/**
 * Run this example:
 *   npm run example examples/slider.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Slider} from '../source/index.js';

function Example() {
	const [volume, setVolume] = useState(50);
	const [brightness, setBrightness] = useState(75);
	const [temperature, setTemperature] = useState(20);
	const [progress, setProgress] = useState(33);

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Slider Component Examples
			</Text>

			<Box flexDirection="column" gap={2}>
				<Text bold>Volume Control:</Text>
				<Slider
					hasValueDisplay
					hasMinMaxLabels
					label="Volume"
					min={0}
					max={100}
					value={volume}
					variant="primary"
					formatValue={value => `${value}%`}
					onChange={setVolume}
				/>

				<Text bold>Brightness:</Text>
				<Slider
					hasTicks
					label="Screen Brightness"
					min={10}
					max={100}
					step={5}
					value={brightness}
					variant="warning"
					width={30}
					formatValue={value => `${value}%`}
					onChange={setBrightness}
				/>

				<Text bold>Temperature:</Text>
				<Slider
					hasMinMaxLabels
					hasTicks
					label="Room Temperature"
					min={16}
					max={30}
					step={0.5}
					value={temperature}
					variant="success"
					tickPositions={[18, 21, 24, 27]}
					formatValue={value => `${value}°C`}
					onChange={setTemperature}
				/>

				<Text bold>Progress Indicator:</Text>
				<Slider
					label="Task Progress"
					min={0}
					max={100}
					value={progress}
					variant="danger"
					width={25}
					formatValue={value => `${value}/100`}
					onChange={setProgress}
				/>

				<Text bold>Compact Slider (No Labels):</Text>
				<Slider
					min={0}
					max={10}
					step={1}
					defaultValue={5}
					hasValueDisplay={false}
					width={15}
					variant="primary"
				/>

				<Text bold>Disabled Slider:</Text>
				<Slider
					isDisabled
					label="Disabled Control"
					min={0}
					max={100}
					defaultValue={25}
					variant="primary"
					formatValue={value => `${value}%`}
				/>
			</Box>

			<Box flexDirection="column" gap={1} marginTop={2}>
				<Text bold>Current Values:</Text>
				<Text>
					Volume: <Text color="blue">{volume}%</Text>
				</Text>
				<Text>
					Brightness: <Text color="yellow">{brightness}%</Text>
				</Text>
				<Text>
					Temperature: <Text color="green">{temperature}°C</Text>
				</Text>
				<Text>
					Progress: <Text color="red">{progress}/100</Text>
				</Text>
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Use ←→ or h/l to adjust values, numbers 0-9 for quick positioning
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
