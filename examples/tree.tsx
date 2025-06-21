/**
 * Run this example:
 *   npm run example examples/tree.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Tree, type TreeNode} from '../source/index.js';

const sampleData: TreeNode[] = [
	{
		key: 'src',
		label: 'src',
		isDefaultExpanded: true,
		children: [
			{
				key: 'components',
				label: 'components',
				isDefaultExpanded: true,
				children: [
					{
						key: 'button',
						label: 'Button.tsx',
						icon: '📄',
					},
					{
						key: 'input',
						label: 'Input.tsx',
						icon: '📄',
					},
					{
						key: 'modal',
						label: 'Modal.tsx',
						icon: '📄',
					},
				],
			},
			{
				key: 'utils',
				label: 'utils',
				children: [
					{
						key: 'helpers',
						label: 'helpers.ts',
						icon: '📄',
					},
					{
						key: 'constants',
						label: 'constants.ts',
						icon: '📄',
					},
				],
			},
			{
				key: 'index',
				label: 'index.ts',
				icon: '📄',
			},
		],
	},
	{
		key: 'docs',
		label: 'docs',
		children: [
			{
				key: 'readme',
				label: 'README.md',
				icon: '📖',
			},
			{
				key: 'api',
				label: 'api.md',
				icon: '📖',
			},
		],
	},
	{
		key: 'tests',
		label: 'tests',
		children: [
			{
				key: 'unit',
				label: 'unit',
				children: [
					{
						key: 'button.test',
						label: 'button.test.ts',
						icon: '🧪',
					},
					{
						key: 'input.test',
						label: 'input.test.ts',
						icon: '🧪',
					},
				],
			},
			{
				key: 'e2e',
				label: 'e2e',
				children: [
					{
						key: 'app.test',
						label: 'app.test.ts',
						icon: '🧪',
					},
				],
			},
		],
	},
	{
		key: 'package',
		label: 'package.json',
		icon: '📦',
	},
	{
		key: 'disabled',
		label: 'disabled-file.txt',
		icon: '🚫',
		isDisabled: true,
	},
];

function Example() {
	const [selectedNode, setSelectedNode] = useState<TreeNode | undefined>(
		undefined,
	);
	const [lastAction, setLastAction] = useState('');

	const handleSelect = (node: TreeNode) => {
		setSelectedNode(node);
		setLastAction(`Selected: ${node.label}`);
	};

	const handleToggle = (node: TreeNode, isExpanded: boolean) => {
		setLastAction(`${isExpanded ? 'Expanded' : 'Collapsed'}: ${node.label}`);
	};

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Tree Component Examples
			</Text>

			<Box flexDirection="row" gap={4}>
				<Box flexDirection="column" gap={1}>
					<Text bold>Project File Tree:</Text>
					<Tree
						nodes={sampleData}
						onSelect={handleSelect}
						onToggle={handleToggle}
					/>
				</Box>

				<Box flexDirection="column" gap={1} width={30}>
					<Text bold>Tree without lines:</Text>
					<Tree
						nodes={sampleData.slice(0, 2)}
						hasLines={false}
						onSelect={handleSelect}
					/>
				</Box>
			</Box>

			{selectedNode && (
				<Box flexDirection="column" gap={1}>
					<Text bold>Selected Node Info:</Text>
					<Text>Key: {selectedNode.key}</Text>
					<Text>Label: {selectedNode.label}</Text>
					<Text>Has Children: {selectedNode.children ? 'Yes' : 'No'}</Text>
					{selectedNode.icon && <Text>Icon: {selectedNode.icon}</Text>}
				</Box>
			)}

			{lastAction && (
				<Box>
					<Text>Last Action: </Text>
					<Text color="green">{lastAction}</Text>
				</Box>
			)}

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Use ↑↓ to navigate, →← to expand/collapse, Space/Enter to select
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
