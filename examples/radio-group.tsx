/**
 * Run this example:
 *   npm run example examples/radio-group.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {RadioGroup, type RadioOption} from '../source/index.js';

const packageManagerOptions: RadioOption[] = [
	{
		value: 'npm',
		label: 'npm',
		description: 'Node Package Manager (default)',
	},
	{
		value: 'yarn',
		label: 'Yarn',
		description: 'Fast, reliable, and secure dependency management',
	},
	{
		value: 'pnpm',
		label: 'pnpm',
		description: 'Fast, disk space efficient package manager',
	},
	{
		value: 'bun',
		label: 'Bun',
		description: 'All-in-one JavaScript runtime & toolkit',
	},
];

const environmentOptions: RadioOption[] = [
	{value: 'development', label: 'Development'},
	{value: 'staging', label: 'Staging'},
	{value: 'production', label: 'Production'},
	{value: 'test', label: 'Test', isDisabled: true},
];

const deploymentOptions: RadioOption[] = [
	{value: 'vercel', label: 'Vercel'},
	{value: 'netlify', label: 'Netlify'},
	{value: 'aws', label: 'AWS'},
	{value: 'docker', label: 'Docker'},
];

function Example() {
	const [packageManager, setPackageManager] = useState('npm');
	const [environment, setEnvironment] = useState('development');
	const [deployment, setDeployment] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Radio Group Component Examples
			</Text>

			<Box flexDirection="row" gap={4}>
				<Box flexDirection="column" gap={2}>
					<Text bold>Package Manager Selection:</Text>
					<RadioGroup
						label="Choose your package manager"
						options={packageManagerOptions}
						value={packageManager}
						onChange={setPackageManager}
					/>

					<Text bold>Environment (Vertical Layout):</Text>
					<RadioGroup
						options={environmentOptions}
						value={environment}
						direction="vertical"
						onChange={setEnvironment}
					/>
				</Box>

				<Box flexDirection="column" gap={2}>
					<Text bold>Deployment (Horizontal Layout):</Text>
					<RadioGroup
						options={deploymentOptions}
						value={deployment}
						direction="horizontal"
						onChange={setDeployment}
					/>

					<Text bold>Without Indicators:</Text>
					<RadioGroup
						options={deploymentOptions.slice(0, 2)}
						hasIndicators={false}
						value={deployment}
						onChange={setDeployment}
					/>

					<Text bold>Disabled Group:</Text>
					<RadioGroup
						isDisabled
						options={environmentOptions.slice(0, 2)}
						defaultValue="development"
					/>
				</Box>
			</Box>

			<Box flexDirection="column" gap={1} marginTop={2}>
				<Text bold>Current Selections:</Text>
				<Text>
					Package Manager: <Text color="green">{packageManager}</Text>
				</Text>
				<Text>
					Environment: <Text color="green">{environment}</Text>
				</Text>
				{deployment && (
					<Text>
						Deployment: <Text color="green">{deployment}</Text>
					</Text>
				)}
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Use ↑↓ or ←→ to navigate options, Space/Enter to select
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
