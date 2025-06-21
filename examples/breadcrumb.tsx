/**
 * Run this example:
 *   npm run example examples/breadcrumb.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Breadcrumb, type BreadcrumbItem} from '../source/index.js';

const navigationItems: BreadcrumbItem[] = [
	{label: 'Home', href: '/', icon: '🏠', isClickable: true},
	{label: 'Projects', href: '/projects', icon: '📁', isClickable: true},
	{
		label: 'Web Development',
		href: '/projects/web',
		icon: '💻',
		isClickable: true,
	},
	{
		label: 'React Apps',
		href: '/projects/web/react',
		icon: '⚛️',
		isClickable: true,
	},
	{
		label: 'ink-ui',
		href: '/projects/web/react/ink-ui',
		icon: '🎨',
		isClickable: true,
	},
	{
		label: 'Components',
		href: '/projects/web/react/ink-ui/components',
		icon: '🧩',
	},
];

const fileSystemItems: BreadcrumbItem[] = [
	{label: 'usr', href: '/usr', isClickable: true},
	{label: 'local', href: '/usr/local', isClickable: true},
	{label: 'bin', href: '/usr/local/bin', isClickable: true},
	{label: 'node', href: '/usr/local/bin/node'},
];

const docsItems: BreadcrumbItem[] = [
	{label: 'Documentation', icon: '📚', isClickable: true},
	{label: 'API Reference', icon: '📖', isClickable: true},
	{label: 'Components', icon: '🧩', isClickable: true},
	{label: 'Breadcrumb', icon: '🍞'},
];

function Example() {
	const [clickedItem, setClickedItem] = useState<string | undefined>(null);

	const handleItemClick = (item: BreadcrumbItem, index: number) => {
		setClickedItem(`${item.label} (index: ${index})`);
	};

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Breadcrumb Component Examples
			</Text>

			<Box flexDirection="column" gap={2}>
				<Text bold>Navigation Breadcrumb:</Text>
				<Breadcrumb items={navigationItems} onItemClick={handleItemClick} />

				<Text bold>File System Path:</Text>
				<Breadcrumb
					items={fileSystemItems}
					separator="/"
					hasIcons={false}
					onItemClick={handleItemClick}
				/>

				<Text bold>Documentation Path:</Text>
				<Breadcrumb
					items={docsItems}
					size="large"
					onItemClick={handleItemClick}
				/>

				<Text bold>Truncated Breadcrumb (max 4 items):</Text>
				<Breadcrumb
					items={navigationItems}
					maxItems={4}
					onItemClick={handleItemClick}
				/>

				<Text bold>Small Size with Custom Separator:</Text>
				<Breadcrumb
					items={fileSystemItems.slice(0, 3)}
					separator=" • "
					size="small"
					hasIcons={false}
					onItemClick={handleItemClick}
				/>

				<Text bold>No Current Highlight:</Text>
				<Breadcrumb
					items={docsItems}
					hasCurrentHighlight={false}
					onItemClick={handleItemClick}
				/>

				<Text bold>Without Icons:</Text>
				<Breadcrumb
					items={navigationItems.slice(0, 4)}
					hasIcons={false}
					onItemClick={handleItemClick}
				/>
			</Box>

			<Box flexDirection="column" gap={1} marginTop={2}>
				<Text bold>Interaction:</Text>
				{clickedItem ? (
					<Text>
						Last clicked: <Text color="green">{clickedItem}</Text>
					</Text>
				) : (
					<Text color="gray">Click on any breadcrumb item above</Text>
				)}
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Breadcrumbs show navigation hierarchy. Click items to navigate back.
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
