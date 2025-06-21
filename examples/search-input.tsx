/**
 * Run this example:
 *   npm run example examples/search-input.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {SearchInput, type SearchResult} from '../source/index.js';

const sampleData: SearchResult[] = [
	{
		id: '1',
		label: 'React Component',
		description: 'Build user interfaces with React',
		category: 'Frontend',
	},
	{
		id: '2',
		label: 'Node.js Server',
		description: 'Build server-side applications',
		category: 'Backend',
	},
	{
		id: '3',
		label: 'TypeScript Configuration',
		description: 'Configure TypeScript for your project',
		category: 'Config',
	},
	{
		id: '4',
		label: 'Express Router',
		description: 'Handle HTTP requests and routing',
		category: 'Backend',
	},
	{
		id: '5',
		label: 'CSS Modules',
		description: 'Scoped CSS for components',
		category: 'Frontend',
	},
	{
		id: '6',
		label: 'Jest Testing',
		description: 'Write and run tests with Jest',
		category: 'Testing',
	},
	{
		id: '7',
		label: 'Webpack Bundle',
		description: 'Bundle your application assets',
		category: 'Build',
	},
	{
		id: '8',
		label: 'ESLint Rules',
		description: 'Configure code linting rules',
		category: 'Config',
	},
	{
		id: '9',
		label: 'Database Migration',
		description: 'Manage database schema changes',
		category: 'Backend',
	},
	{
		id: '10',
		label: 'Docker Container',
		description: 'Containerize your application',
		category: 'DevOps',
	},
];

const commands: SearchResult[] = [
	{id: 'cmd1', label: 'npm install', description: 'Install dependencies'},
	{id: 'cmd2', label: 'npm run build', description: 'Build the project'},
	{id: 'cmd3', label: 'npm test', description: 'Run tests'},
	{id: 'cmd4', label: 'git status', description: 'Check git status'},
	{id: 'cmd5', label: 'git commit', description: 'Commit changes'},
	{id: 'cmd6', label: 'docker build', description: 'Build Docker image'},
	{id: 'cmd7', label: 'yarn start', description: 'Start development server'},
];

function Example() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedResult, setSelectedResult] = useState<
		SearchResult | undefined
	>(null);
	const [commandQuery, setCommandQuery] = useState('');
	const [selectedCommand, setSelectedCommand] = useState<
		SearchResult | undefined
	>(null);

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Search Input Component Examples
			</Text>

			<Box flexDirection="row" gap={4}>
				<Box flexDirection="column" gap={2} width={50}>
					<Text bold>Basic Search with Grouping:</Text>
					<SearchInput
						hasGrouping
						label="Search documentation"
						placeholder="Type to search..."
						results={sampleData}
						value={searchQuery}
						onSearch={setSearchQuery}
						onSelect={setSelectedResult}
					/>

					<Text bold>Command Search (No Grouping):</Text>
					<SearchInput
						hasSearchIcon
						hasClearButton
						hasHighlight
						label="Search commands"
						placeholder="Search commands..."
						results={commands}
						value={commandQuery}
						onSearch={setCommandQuery}
						onSelect={setSelectedCommand}
					/>

					<Text bold>Custom Filter (Exact Match):</Text>
					<SearchInput
						placeholder="Exact match search..."
						results={sampleData}
						minSearchLength={2}
						maxResults={5}
						filterFunction={(results, query) =>
							results.filter(
								result => result.label.toLowerCase() === query.toLowerCase(),
							)
						}
					/>

					<Text bold>Disabled Search:</Text>
					<SearchInput
						isDisabled
						placeholder="This search is disabled"
						results={sampleData}
					/>
				</Box>

				<Box flexDirection="column" gap={2} width={40}>
					<Text bold>Search Results:</Text>
					<Text>
						Current Query: <Text color="cyan">{searchQuery || 'None'}</Text>
					</Text>
					{selectedResult && (
						<Box flexDirection="column" gap={1}>
							<Text color="green">Selected: {selectedResult.label}</Text>
							{selectedResult.description && (
								<Text color="gray">{selectedResult.description}</Text>
							)}
							{selectedResult.category && (
								<Text color="yellow">Category: {selectedResult.category}</Text>
							)}
						</Box>
					)}

					<Text bold marginTop={2}>
						Command Results:
					</Text>
					<Text>
						Command Query: <Text color="cyan">{commandQuery || 'None'}</Text>
					</Text>
					{selectedCommand && (
						<Box flexDirection="column" gap={1}>
							<Text color="green">Selected: {selectedCommand.label}</Text>
							{selectedCommand.description && (
								<Text color="gray">{selectedCommand.description}</Text>
							)}
						</Box>
					)}
				</Box>
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Type to search, ↑↓ to navigate results, Enter to select, Esc to
					clear/close
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
