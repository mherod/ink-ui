/**
 * Interactive preview for all Ink UI components
 * Run this example:
 *   npm run example preview.tsx
 */

import React, {useState, useCallback} from 'react';
import {render, Box, Text, useInput} from 'ink';
import {
	Accordion,
	Alert,
	Badge,
	Breadcrumb,
	Checkbox,
	CodeBlock,
	ConfirmInput,
	DatePicker,
	EmailInput,
	FileInput,
	Menu,
	Modal,
	MultiSelect,
	OrderedList,
	PasswordInput,
	ProgressBar,
	RadioGroup,
	SearchInput,
	Select,
	Slider,
	Spinner,
	StatusMessage,
	Switch,
	Table,
	Tabs,
	TextInput,
	Toast,
	Tree,
	UnorderedList,
} from './source/index.js';

type ComponentName =
	| 'Accordion'
	| 'Alert'
	| 'Badge'
	| 'Breadcrumb'
	| 'Checkbox'
	| 'CodeBlock'
	| 'ConfirmInput'
	| 'DatePicker'
	| 'EmailInput'
	| 'FileInput'
	| 'Menu'
	| 'Modal'
	| 'MultiSelect'
	| 'OrderedList'
	| 'PasswordInput'
	| 'ProgressBar'
	| 'RadioGroup'
	| 'SearchInput'
	| 'Select'
	| 'Slider'
	| 'Spinner'
	| 'StatusMessage'
	| 'Switch'
	| 'Table'
	| 'Tabs'
	| 'TextInput'
	| 'Toast'
	| 'Tree'
	| 'UnorderedList';

const components: ComponentName[] = [
	'Accordion',
	'Alert',
	'Badge',
	'Breadcrumb',
	'Checkbox',
	'CodeBlock',
	'ConfirmInput',
	'DatePicker',
	'EmailInput',
	'FileInput',
	'Menu',
	'Modal',
	'MultiSelect',
	'OrderedList',
	'PasswordInput',
	'ProgressBar',
	'RadioGroup',
	'SearchInput',
	'Select',
	'Slider',
	'Spinner',
	'StatusMessage',
	'Switch',
	'Table',
	'Tabs',
	'TextInput',
	'Toast',
	'Tree',
	'UnorderedList',
];

function ComponentMenu({selectedIndex}: {readonly selectedIndex: number}) {
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

function AccordionPreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Accordion Component
			</Text>
			<Accordion
				hasMultiple
				hasBorders
				items={[
					{
						key: 'item1',
						title: 'Section 1',
						content: <Text>This is the content for section 1</Text>,
						isDefaultExpanded: true,
					},
					{
						key: 'item2',
						title: 'Section 2',
						content: <Text>This is the content for section 2</Text>,
					},
					{
						key: 'item3',
						title: 'Section 3',
						content: <Text>This is the content for section 3</Text>,
					},
				]}
			/>
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

function CheckboxPreview() {
	const [checked, setChecked] = useState(false);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Checkbox Component
			</Text>
			<Checkbox
				label="Enable notifications"
				isChecked={checked}
				onChange={setChecked}
			/>
			<Text>Status: {checked ? 'Checked' : 'Unchecked'}</Text>
		</Box>
	);
}

function CodeBlockPreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				CodeBlock Component
			</Text>
			<CodeBlock language="javascript">
				{`function hello(name) {
  console.log('Hello, ' + name);
}`}
			</CodeBlock>
		</Box>
	);
}

function FileInputPreview() {
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				FileInput Component
			</Text>
			<FileInput
				placeholder="Select files..."
				onFilesChange={setSelectedFiles}
			/>
			<Text>Selected: {selectedFiles.join(', ')}</Text>
		</Box>
	);
}

function MenuPreview() {
	const [selectedItem, setSelectedItem] = useState('');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Menu Component
			</Text>
			<Menu
				items={[
					{key: 'new', label: 'New File'},
					{key: 'open', label: 'Open File'},
					{key: 'save', label: 'Save File'},
					{key: 'exit', label: 'Exit'},
				]}
				onSelect={item => {
					setSelectedItem(item.label);
				}}
			/>
			<Text>Selected: {selectedItem}</Text>
		</Box>
	);
}

function ModalPreview() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Modal Component
			</Text>
			<Text>Press 'm' to open modal</Text>
			<Modal
				isOpen={isOpen}
				title="Example Modal"
				onClose={() => {
					setIsOpen(false);
				}}
			>
				<Text>This is a modal dialog!</Text>
			</Modal>
		</Box>
	);
}

function RadioGroupPreview() {
	const [selectedValue, setSelectedValue] = useState('');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				RadioGroup Component
			</Text>
			<RadioGroup
				options={[
					{label: 'Option 1', value: 'option1'},
					{label: 'Option 2', value: 'option2'},
					{label: 'Option 3', value: 'option3'},
				]}
				value={selectedValue}
				onChange={setSelectedValue}
			/>
			<Text>Selected: {selectedValue}</Text>
		</Box>
	);
}

function SwitchPreview() {
	const [enabled, setEnabled] = useState(false);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Switch Component
			</Text>
			<Switch
				label="Enable feature"
				isChecked={enabled}
				onChange={setEnabled}
			/>
			<Text>Status: {enabled ? 'Enabled' : 'Disabled'}</Text>
		</Box>
	);
}

function TablePreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Table Component
			</Text>
			<Table
				columns={[
					{key: 'name', title: 'Name'},
					{key: 'age', title: 'Age'},
					{key: 'city', title: 'City'},
				]}
				data={[
					{name: 'Alice', age: 25, city: 'New York'},
					{name: 'Bob', age: 30, city: 'San Francisco'},
					{name: 'Charlie', age: 35, city: 'Chicago'},
				]}
			/>
		</Box>
	);
}

function TabsPreview() {
	const [activeTab, setActiveTab] = useState('tab1');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Tabs Component
			</Text>
			<Tabs
				items={[
					{
						key: 'tab1',
						label: 'Tab 1',
						children: <Text>Content for Tab 1</Text>,
					},
					{
						key: 'tab2',
						label: 'Tab 2',
						children: <Text>Content for Tab 2</Text>,
					},
					{
						key: 'tab3',
						label: 'Tab 3',
						children: <Text>Content for Tab 3</Text>,
					},
				]}
				activeKey={activeTab}
				onChange={setActiveTab}
			/>
		</Box>
	);
}

function ToastPreview() {
	const [showToast, setShowToast] = useState(false);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Toast Component
			</Text>
			<Text>Press 't' to show toast</Text>
			{showToast && (
				<Toast
					variant="success"
					onClose={() => {
						setShowToast(false);
					}}
				>
					This is a toast message!
				</Toast>
			)}
		</Box>
	);
}

function SearchInputPreview() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				SearchInput Component
			</Text>
			<SearchInput
				hasInstantResults
				placeholder="Search for files..."
				results={[
					{
						id: '1',
						label: 'package.json',
						description: 'Project configuration',
					},
					{id: '2', label: 'src/app.tsx', description: 'Main application file'},
					{id: '3', label: 'README.md', description: 'Project documentation'},
				]}
				maxResults={5}
				onSearch={setSearchValue}
			/>
			<Text>Search query: "{searchValue}"</Text>
		</Box>
	);
}

function TreePreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Tree Component
			</Text>
			<Tree
				nodes={[
					{
						key: 'root',
						label: 'Root',
						children: [
							{key: 'child1', label: 'Child 1'},
							{
								key: 'child2',
								label: 'Child 2',
								children: [{key: 'grandchild', label: 'Grandchild'}],
							},
						],
					},
				]}
			/>
		</Box>
	);
}

function BreadcrumbPreview() {
	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Breadcrumb Component
			</Text>
			<Breadcrumb
				items={[
					{label: 'Home', icon: '🏠'},
					{label: 'Projects', icon: '📁'},
					{label: 'Web Development', icon: '💻'},
					{label: 'ink-ui', icon: '🎨'},
					{label: 'Components', icon: '🧩'},
				]}
			/>
		</Box>
	);
}

function SliderPreview() {
	const [value, setValue] = useState(50);

	return (
		<Box flexDirection="column" gap={1}>
			<Text bold color="blue">
				Slider Component
			</Text>
			<Slider
				hasValueDisplay
				hasMinMaxLabels
				label="Volume"
				min={0}
				max={100}
				value={value}
				formatValue={val => `${val}%`}
				onChange={setValue}
			/>
			<Text>Current value: {value}</Text>
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
			case 'Accordion': {
				return <AccordionPreview />;
			}

			case 'Alert': {
				return <AlertPreview />;
			}

			case 'Badge': {
				return <BadgePreview />;
			}

			case 'Breadcrumb': {
				return <BreadcrumbPreview />;
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

			case 'Slider': {
				return <SliderPreview />;
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

			case 'Checkbox': {
				return <CheckboxPreview />;
			}

			case 'CodeBlock': {
				return <CodeBlockPreview />;
			}

			case 'FileInput': {
				return <FileInputPreview />;
			}

			case 'Menu': {
				return <MenuPreview />;
			}

			case 'Modal': {
				return <ModalPreview />;
			}

			case 'RadioGroup': {
				return <RadioGroupPreview />;
			}

			case 'Switch': {
				return <SwitchPreview />;
			}

			case 'Table': {
				return <TablePreview />;
			}

			case 'Tabs': {
				return <TabsPreview />;
			}

			case 'Toast': {
				return <ToastPreview />;
			}

			case 'Tree': {
				return <TreePreview />;
			}

			case 'SearchInput': {
				return <SearchInputPreview />;
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
				<ComponentMenu selectedIndex={selectedIndex} />
			)}
		</Box>
	);
}

render(<App />);
