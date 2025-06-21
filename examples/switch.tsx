/**
 * Run this example:
 *   npm run example examples/switch.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Switch} from '../source/index.js';

function Example() {
	const [notifications, setNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [autoSave, setAutoSave] = useState(true);
	const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Switch Component Examples
			</Text>

			<Box flexDirection="column" gap={2}>
				<Text bold>Settings Panel:</Text>
				<Switch
					label="Push Notifications"
					description="Receive notifications about important updates"
					isChecked={notifications}
					variant="primary"
					onChange={setNotifications}
				/>

				<Switch
					hasStateText
					label="Dark Mode"
					description="Use dark theme throughout the application"
					isChecked={darkMode}
					variant="success"
					onChange={setDarkMode}
				/>

				<Switch
					label="Auto-save"
					description="Automatically save changes as you work"
					isChecked={autoSave}
					variant="warning"
					onChange={setAutoSave}
				/>

				<Switch
					label="Analytics"
					description="Help improve the app by sharing anonymous usage data"
					isChecked={analyticsEnabled}
					variant="danger"
					onChange={setAnalyticsEnabled}
				/>
			</Box>

			<Box flexDirection="column" gap={2} marginTop={2}>
				<Text bold>Different Sizes:</Text>
				<Box flexDirection="row" gap={4}>
					<Switch
						isDefaultChecked
						label="Small"
						size="small"
						variant="primary"
					/>
					<Switch
						isDefaultChecked
						label="Medium"
						size="medium"
						variant="success"
					/>
					<Switch
						isDefaultChecked
						hasStateText
						label="Large"
						size="large"
						variant="warning"
					/>
				</Box>
			</Box>

			<Box flexDirection="column" gap={2} marginTop={2}>
				<Text bold>States:</Text>
				<Box flexDirection="row" gap={4}>
					<Switch isDefaultChecked label="Enabled" variant="primary" />
					<Switch isDisabled label="Disabled" variant="primary" />
					<Switch
						isDisabled
						isDefaultChecked
						label="Disabled Checked"
						variant="primary"
					/>
				</Box>
			</Box>

			<Box flexDirection="column" gap={2} marginTop={2}>
				<Text bold>With State Text:</Text>
				<Box flexDirection="row" gap={4}>
					<Switch
						hasStateText
						isDefaultChecked
						checkedText="YES"
						uncheckedText="NO"
						variant="success"
					/>
					<Switch
						hasStateText
						checkedText="ACTIVE"
						uncheckedText="INACTIVE"
						variant="primary"
					/>
				</Box>
			</Box>

			<Box flexDirection="column" gap={1} marginTop={2}>
				<Text bold>Current Settings:</Text>
				<Text>
					Notifications:{' '}
					<Text color="green">{notifications ? 'ON' : 'OFF'}</Text>
				</Text>
				<Text>
					Dark Mode: <Text color="green">{darkMode ? 'ON' : 'OFF'}</Text>
				</Text>
				<Text>
					Auto-save: <Text color="green">{autoSave ? 'ON' : 'OFF'}</Text>
				</Text>
				<Text>
					Analytics:{' '}
					<Text color="green">{analyticsEnabled ? 'ON' : 'OFF'}</Text>
				</Text>
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>Use Space/Enter to toggle switches</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
