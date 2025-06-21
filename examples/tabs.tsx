/**
 * Run this example:
 *   npm run example examples/tabs.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Tabs, Badge, ProgressBar, UnorderedList} from '../source/index.js';

function Example() {
	const [activeTab, setActiveTab] = useState('overview');

	const tabItems = [
		{
			key: 'overview',
			label: 'Overview',
			children: (
				<Box flexDirection="column" gap={1}>
					<Text bold>Project Overview</Text>
					<Text>Welcome to the Ink UI component library!</Text>
					<Text>
						This library provides beautiful CLI components built with React and
						Ink.
					</Text>
					<Box marginTop={1}>
						<Badge color="green">Active</Badge>
					</Box>
				</Box>
			),
		},
		{
			key: 'components',
			label: 'Components',
			children: (
				<Box flexDirection="column" gap={1}>
					<Text bold>Available Components</Text>
					<UnorderedList>
						<UnorderedList.Item>
							<Text>Alert - Status alerts and notifications</Text>
						</UnorderedList.Item>
						<UnorderedList.Item>
							<Text>Badge - Status indicators</Text>
						</UnorderedList.Item>
						<UnorderedList.Item>
							<Text>Checkbox - Boolean input controls</Text>
						</UnorderedList.Item>
						<UnorderedList.Item>
							<Text>Table - Data display in rows and columns</Text>
						</UnorderedList.Item>
						<UnorderedList.Item>
							<Text>Tabs - Navigation between content sections</Text>
						</UnorderedList.Item>
					</UnorderedList>
				</Box>
			),
		},
		{
			key: 'progress',
			label: 'Progress',
			children: (
				<Box flexDirection="column" gap={1}>
					<Text bold>Development Progress</Text>
					<Text>Library implementation status:</Text>
					<Box marginTop={1} flexDirection="column" gap={1}>
						<Box>
							<Text>Core Components: </Text>
							<ProgressBar value={85} />
							<Text> 85%</Text>
						</Box>
						<Box>
							<Text>Documentation: </Text>
							<ProgressBar value={70} />
							<Text> 70%</Text>
						</Box>
						<Box>
							<Text>Examples: </Text>
							<ProgressBar value={90} />
							<Text> 90%</Text>
						</Box>
					</Box>
				</Box>
			),
		},
		{
			key: 'settings',
			label: 'Settings',
			disabled: true,
			children: <Text>Settings panel - Coming soon!</Text>,
		},
	];

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Tabs Examples
			</Text>

			<Box flexDirection="column" gap={1}>
				<Text bold>Default Tabs:</Text>
				<Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Full Width Tabs:</Text>
				<Tabs isFullWidth items={tabItems} />
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>Use ← → arrow keys or Tab to navigate between tabs</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
