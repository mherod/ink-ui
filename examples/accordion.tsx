/**
 * Run this example:
 *   npm run example examples/accordion.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Accordion, type AccordionItem} from '../source/index.js';

const faqItems: AccordionItem[] = [
	{
		key: 'what-is-ink',
		title: 'What is Ink?',
		content:
			'Ink is a React renderer for CLI apps. Build and test your CLI output using components.',
		icon: '❓',
	},
	{
		key: 'getting-started',
		title: 'How do I get started?',
		content: (
			<Box flexDirection="column" gap={1}>
				<Text>1. Install Ink: npm install ink</Text>
				<Text>2. Create your component</Text>
				<Text>3. Use render() to display it</Text>
				<Text color="green">Happy coding! 🎉</Text>
			</Box>
		),
		icon: '🚀',
		isDefaultExpanded: true,
	},
	{
		key: 'components',
		title: 'What components are available?',
		content:
			'Ink provides Box, Text, and many other components. You can also create custom ones!',
		icon: '🧩',
	},
	{
		key: 'styling',
		title: 'How do I style components?',
		content:
			'Use props like color, backgroundColor, padding, margin, etc. on Box and Text components.',
		icon: '🎨',
	},
	{
		key: 'disabled',
		title: 'This item is disabled',
		content: 'You should not see this content.',
		isDisabled: true,
		icon: '🚫',
	},
];

const settingsItems: AccordionItem[] = [
	{
		key: 'general',
		title: 'General Settings',
		content: (
			<Box flexDirection="column" gap={1}>
				<Text>• Theme: Dark Mode</Text>
				<Text>• Language: English</Text>
				<Text>• Auto-save: Enabled</Text>
			</Box>
		),
	},
	{
		key: 'advanced',
		title: 'Advanced Settings',
		content: (
			<Box flexDirection="column" gap={1}>
				<Text>• Debug mode: Off</Text>
				<Text>• Performance monitoring: On</Text>
				<Text>• Error reporting: Enabled</Text>
			</Box>
		),
	},
	{
		key: 'privacy',
		title: 'Privacy & Security',
		content: (
			<Box flexDirection="column" gap={1}>
				<Text>• Data collection: Minimal</Text>
				<Text>• Analytics: Opt-in only</Text>
				<Text>• Encryption: AES-256</Text>
			</Box>
		),
	},
];

function Example() {
	const [expandedFaqItems, setExpandedFaqItems] = useState<string[]>([]);

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Accordion Component Examples
			</Text>

			<Box flexDirection="row" gap={4}>
				<Box flexDirection="column" gap={2} width={50}>
					<Text bold>FAQ (Single Expand):</Text>
					<Accordion
						items={faqItems}
						hasMultiple={false}
						onToggle={(item, isExpanded) => {
							console.log(
								`${item.title} ${isExpanded ? 'expanded' : 'collapsed'}`,
							);
						}}
					/>

					<Text bold marginTop={2}>
						Settings (Multiple Expand):
					</Text>
					<Accordion
						hasMultiple
						items={settingsItems}
						expandedItems={expandedFaqItems}
						onToggle={(item, isExpanded) => {
							if (isExpanded) {
								setExpandedFaqItems([...expandedFaqItems, item.key]);
							} else {
								setExpandedFaqItems(
									expandedFaqItems.filter(key => key !== item.key),
								);
							}
						}}
					/>
				</Box>

				<Box flexDirection="column" gap={2} width={40}>
					<Text bold>Compact Size:</Text>
					<Accordion
						hasMultiple
						items={settingsItems.slice(0, 2)}
						size="small"
					/>

					<Text bold marginTop={2}>
						Large Size:
					</Text>
					<Accordion hasMultiple items={faqItems.slice(0, 2)} size="large" />

					<Text bold marginTop={2}>
						No Borders:
					</Text>
					<Accordion
						hasMultiple
						items={settingsItems.slice(0, 2)}
						hasBorders={false}
					/>

					<Text bold marginTop={2}>
						No Icons:
					</Text>
					<Accordion
						hasMultiple
						items={faqItems.slice(0, 2)}
						hasIcons={false}
					/>
				</Box>
			</Box>

			<Box flexDirection="column" gap={1} marginTop={2}>
				<Text bold>Current Controlled State:</Text>
				<Text>
					Expanded FAQ items:{' '}
					<Text color="green">{expandedFaqItems.length}</Text>
				</Text>
				{expandedFaqItems.length > 0 && (
					<Text color="cyan">• {expandedFaqItems.join(', ')}</Text>
				)}
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Use ↑↓ to navigate, Space/Enter to expand/collapse items
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
