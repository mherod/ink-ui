/**
 * Simple preview showing all components (non-interactive)
 * Run this example:
 *   npm run example examples/preview-simple.tsx
 */

import React from 'react';
import {render, Box, Text} from 'ink';
import {
	Alert,
	Badge,
	Checkbox,
	OrderedList,
	ProgressBar,
	Spinner,
	StatusMessage,
	Table,
	Tabs,
	Toast,
	UnorderedList,
} from '../source/index.js';

function ComponentShowcase() {
	return (
		<Box flexDirection="column" gap={2} padding={2}>
			<Text bold color="blue">
				🎨 Ink UI Component Showcase
			</Text>

			<Box flexDirection="column" gap={1}>
				<Text bold>Alert Components:</Text>
				<Alert variant="success">Success: Operation completed</Alert>
				<Alert variant="error">Error: Something went wrong</Alert>
				<Alert variant="warning">Warning: Please check this</Alert>
				<Alert variant="info">Info: For your information</Alert>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Badge Components:</Text>
				<Box gap={2}>
					<Badge color="green">Pass</Badge>
					<Badge color="red">Fail</Badge>
					<Badge color="yellow">Warn</Badge>
					<Badge color="blue">Info</Badge>
				</Box>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Status Messages:</Text>
				<StatusMessage variant="success">Deployment successful</StatusMessage>
				<StatusMessage variant="error">Build failed</StatusMessage>
				<StatusMessage variant="warning">Deprecated API usage</StatusMessage>
				<StatusMessage variant="info">New feature available</StatusMessage>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Progress Bar:</Text>
				<ProgressBar value={75} />
				<Text dimColor>75% complete</Text>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Spinner:</Text>
				<Spinner label="Loading data..." />
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Ordered List:</Text>
				<OrderedList>
					<OrderedList.Item>
						<Text>First step</Text>
					</OrderedList.Item>
					<OrderedList.Item>
						<Text>Second step</Text>
						<OrderedList>
							<OrderedList.Item>
								<Text>Sub-step A</Text>
							</OrderedList.Item>
							<OrderedList.Item>
								<Text>Sub-step B</Text>
							</OrderedList.Item>
						</OrderedList>
					</OrderedList.Item>
					<OrderedList.Item>
						<Text>Final step</Text>
					</OrderedList.Item>
				</OrderedList>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Unordered List:</Text>
				<UnorderedList>
					<UnorderedList.Item>
						<Text>Feature A</Text>
					</UnorderedList.Item>
					<UnorderedList.Item>
						<Text>Feature B</Text>
						<UnorderedList>
							<UnorderedList.Item>
								<Text>Sub-feature 1</Text>
							</UnorderedList.Item>
							<UnorderedList.Item>
								<Text>Sub-feature 2</Text>
							</UnorderedList.Item>
						</UnorderedList>
					</UnorderedList.Item>
					<UnorderedList.Item>
						<Text>Feature C</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Checkboxes:</Text>
				<Checkbox isChecked label="Completed task" />
				<Checkbox label="Pending task" />
				<Checkbox isIndeterminate label="Partially completed" />
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Toast Notifications:</Text>
				<Toast variant="success">Operation completed successfully!</Toast>
				<Toast variant="error">Failed to save changes</Toast>
				<Toast variant="warning">Unsaved changes detected</Toast>
				<Toast variant="info">New update available</Toast>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Data Table:</Text>
				<Table
					columns={[
						{key: 'name', title: 'Name', width: 15},
						{key: 'status', title: 'Status', width: 10},
						{key: 'progress', title: 'Progress', width: 8},
					]}
					data={[
						{name: 'Project Alpha', status: 'Active', progress: '85%'},
						{name: 'Project Beta', status: 'Pending', progress: '60%'},
						{name: 'Project Gamma', status: 'Complete', progress: '100%'},
					]}
				/>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Navigation Tabs:</Text>
				<Tabs
					items={[
						{key: 'home', label: 'Home', children: <Text>Home content</Text>},
						{
							key: 'settings',
							label: 'Settings',
							children: <Text>Settings content</Text>,
						},
						{
							key: 'about',
							label: 'About',
							children: <Text>About content</Text>,
						},
					]}
				/>
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					💡 For interactive examples, try: npm run example
					examples/[component].tsx
				</Text>
			</Box>
		</Box>
	);
}

render(<ComponentShowcase />);
