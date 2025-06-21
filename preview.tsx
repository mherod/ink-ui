/**
 * Interactive preview for all Ink UI components
 * Run this example:
 *   npm run example preview.tsx
 */

import React, {useState, useCallback} from 'react';
import {render, Box, Text, useInput} from 'ink';
import {
	Alert,
	Badge,
	ConfirmInput,
	DatePicker,
	EmailInput,
	MultiSelect,
	OrderedList,
	PasswordInput,
	ProgressBar,
	Select,
	Spinner,
	StatusMessage,
	TextInput,
	UnorderedList,
} from './source/index.js';

type ComponentName =
	| 'Alert'
	| 'Badge'
	| 'ConfirmInput'
	| 'DatePicker'
	| 'EmailInput'
	| 'MultiSelect'
	| 'OrderedList'
	| 'PasswordInput'
	| 'ProgressBar'
	| 'Select'
	| 'Spinner'
	| 'StatusMessage'
	| 'TextInput'
	| 'UnorderedList';

const components: ComponentName[] = [
	'Alert',
	'Badge',
	'ConfirmInput',
	'DatePicker',
	'EmailInput',
	'MultiSelect',
	'OrderedList',
	'PasswordInput',
	'ProgressBar',
	'Select',
	'Spinner',
	'StatusMessage',
	'TextInput',
	'UnorderedList',
];

function ComponentMenu({
	selectedIndex,
	onSelect,
}: {
	readonly selectedIndex: number;
	readonly onSelect: (component: ComponentName) => void;
}) {
	// Navigation handled in parent component

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				🎨 Ink UI Component Preview
			</Text>
			<Text dimColor>
				Use ↑/↓ arrows to navigate, Enter to select, Esc to go back
			</Text>
			<Box flexDirection="column" marginTop={1}>
				{components.map((component, index) => (
					<Text
						key={component}
						color={index === selectedIndex ? 'blue' : undefined}
						backgroundColor={index === selectedIndex ? 'white' : undefined}
						bold={index === selectedIndex}
					>
						{index === selectedIndex ? '▶ ' : '  '}
						{component}
					</Text>
				))}
			</Box>
		</Box>
	);
}

function AlertPreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Alert Component
			</Text>
			<Alert variant="success">A new version of this CLI is available</Alert>
			<Alert variant="error">Your license is expired</Alert>
			<Alert variant="warning">
				Current version of this CLI has been deprecated
			</Alert>
			<Alert variant="info">API won't be available tomorrow night</Alert>
		</Box>
	);
}

function BadgePreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Badge Component
			</Text>
			<Box gap={2}>
				<Badge color="green">Pass</Badge>
				<Badge color="red">Fail</Badge>
				<Badge color="yellow">Warn</Badge>
				<Badge color="blue">Todo</Badge>
			</Box>
		</Box>
	);
}

function ConfirmInputPreview() {
	const [result, setResult] = useState<string>('');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				ConfirmInput Component
			</Text>
			<ConfirmInput
				onConfirm={() => {
					setResult('Confirmed!');
				}}
				onCancel={() => {
					setResult('Cancelled!');
				}}
			/>
			{result && <Text color="green">{result}</Text>}
		</Box>
	);
}

function DatePickerPreview() {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				DatePicker Component
			</Text>
			<DatePicker onSelect={setSelectedDate} />
			{selectedDate && (
				<Text color="green">Selected: {selectedDate.toLocaleDateString()}</Text>
			)}
		</Box>
	);
}

function EmailInputPreview() {
	const [email, setEmail] = useState('');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				EmailInput Component
			</Text>
			<EmailInput placeholder="Enter your email..." onChange={setEmail} />
			<Text>Email: "{email}"</Text>
		</Box>
	);
}

function MultiSelectPreview() {
	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				MultiSelect Component
			</Text>
			<MultiSelect
				options={[
					{label: 'Red', value: 'red'},
					{label: 'Green', value: 'green'},
					{label: 'Blue', value: 'blue'},
					{label: 'Yellow', value: 'yellow'},
					{label: 'Magenta', value: 'magenta'},
				]}
				onChange={setSelectedValues}
			/>
			<Text>Selected: {selectedValues.join(', ')}</Text>
		</Box>
	);
}

function OrderedListPreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				OrderedList Component
			</Text>
			<OrderedList>
				<OrderedList.Item>
					<Text>First item</Text>
				</OrderedList.Item>
				<OrderedList.Item>
					<Text>Second item</Text>
					<OrderedList>
						<OrderedList.Item>
							<Text>Nested item 1</Text>
						</OrderedList.Item>
						<OrderedList.Item>
							<Text>Nested item 2</Text>
						</OrderedList.Item>
					</OrderedList>
				</OrderedList.Item>
				<OrderedList.Item>
					<Text>Third item</Text>
				</OrderedList.Item>
			</OrderedList>
		</Box>
	);
}

function PasswordInputPreview() {
	const [password, setPassword] = useState('');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				PasswordInput Component
			</Text>
			<PasswordInput placeholder="Enter password..." onChange={setPassword} />
			<Text>Password length: {password.length}</Text>
		</Box>
	);
}

function ProgressBarPreview() {
	const [progress, setProgress] = useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setProgress(p => (p >= 100 ? 0 : p + 10));
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				ProgressBar Component
			</Text>
			<ProgressBar value={progress} />
			<Text>Progress: {progress}%</Text>
		</Box>
	);
}

function SelectPreview() {
	const [selectedValue, setSelectedValue] = useState<string | undefined>();

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Select Component
			</Text>
			<Select
				options={[
					{label: 'Red', value: 'red'},
					{label: 'Green', value: 'green'},
					{label: 'Blue', value: 'blue'},
					{label: 'Yellow', value: 'yellow'},
					{label: 'Magenta', value: 'magenta'},
				]}
				onChange={setSelectedValue}
			/>
			<Text>Selected: {selectedValue}</Text>
		</Box>
	);
}

function SpinnerPreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Spinner Component
			</Text>
			<Spinner label="Loading..." />
		</Box>
	);
}

function StatusMessagePreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				StatusMessage Component
			</Text>
			<StatusMessage variant="success">
				New version is deployed to production
			</StatusMessage>
			<StatusMessage variant="error">
				Failed to deploy a new version of this app
			</StatusMessage>
			<StatusMessage variant="warning">
				Health checks aren't configured
			</StatusMessage>
			<StatusMessage variant="info">
				This version is already deployed
			</StatusMessage>
		</Box>
	);
}

function TextInputPreview() {
	const [text, setText] = useState('');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				TextInput Component
			</Text>
			<TextInput placeholder="Start typing..." onChange={setText} />
			<Text>Input: "{text}"</Text>
		</Box>
	);
}

function UnorderedListPreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				UnorderedList Component
			</Text>
			<UnorderedList>
				<UnorderedList.Item>
					<Text>First item</Text>
				</UnorderedList.Item>
				<UnorderedList.Item>
					<Text>Second item</Text>
					<UnorderedList>
						<UnorderedList.Item>
							<Text>Nested item 1</Text>
						</UnorderedList.Item>
						<UnorderedList.Item>
							<Text>Nested item 2</Text>
						</UnorderedList.Item>
					</UnorderedList>
				</UnorderedList.Item>
				<UnorderedList.Item>
					<Text>Third item</Text>
				</UnorderedList.Item>
			</UnorderedList>
		</Box>
	);
}

function ComponentPreview({
	component,
	onBack,
}: {
	readonly component: ComponentName;
	readonly onBack: () => void;
}) {
	useInput((_input, key) => {
		if (key.escape) {
			onBack();
		}
	});

	const renderComponent = () => {
		switch (component) {
			case 'Alert': {
				return <AlertPreview />;
			}

			case 'Badge': {
				return <BadgePreview />;
			}

			case 'ConfirmInput': {
				return <ConfirmInputPreview />;
			}

			case 'DatePicker': {
				return <DatePickerPreview />;
			}

			case 'EmailInput': {
				return <EmailInputPreview />;
			}

			case 'MultiSelect': {
				return <MultiSelectPreview />;
			}

			case 'OrderedList': {
				return <OrderedListPreview />;
			}

			case 'PasswordInput': {
				return <PasswordInputPreview />;
			}

			case 'ProgressBar': {
				return <ProgressBarPreview />;
			}

			case 'Select': {
				return <SelectPreview />;
			}

			case 'Spinner': {
				return <SpinnerPreview />;
			}

			case 'StatusMessage': {
				return <StatusMessagePreview />;
			}

			case 'TextInput': {
				return <TextInputPreview />;
			}

			case 'UnorderedList': {
				return <UnorderedListPreview />;
			}
		}
	};

	return (
		<Box flexDirection="column" gap={1}>
			{renderComponent()}
			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>Press Esc to go back to menu</Text>
			</Box>
		</Box>
	);
}

function App() {
	const [selectedComponent, setSelectedComponent] = useState<
		ComponentName | undefined
	>();
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleBack = useCallback(() => {
		setSelectedComponent(undefined);
	}, []);

	const handleSelect = useCallback((component: ComponentName) => {
		setSelectedComponent(component);
	}, []);

	useInput((_input, key) => {
		if (selectedComponent) {
			return; // Let component handle its own input
		}

		if (key.upArrow && selectedIndex > 0) {
			setSelectedIndex(selectedIndex - 1);
		} else if (key.downArrow && selectedIndex < components.length - 1) {
			setSelectedIndex(selectedIndex + 1);
		} else if (key.return) {
			handleSelect(components[selectedIndex]!);
		}
	});

	return (
		<Box padding={2}>
			{selectedComponent ? (
				<ComponentPreview component={selectedComponent} onBack={handleBack} />
			) : (
				<ComponentMenu selectedIndex={selectedIndex} onSelect={handleSelect} />
			)}
		</Box>
	);
}

render(<App />);
