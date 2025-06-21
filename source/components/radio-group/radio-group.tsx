import React, {useState, useCallback} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type RadioOption = {
	/**
	 * Unique value for the radio option.
	 */
	value: string;

	/**
	 * Label to display for the radio option.
	 */
	label: string;

	/**
	 * Whether the option is disabled.
	 */
	isDisabled?: boolean;

	/**
	 * Additional description text.
	 */
	description?: string;
};

export type RadioGroupProps = {
	/**
	 * Array of radio options.
	 */
	readonly options: RadioOption[];

	/**
	 * Callback when a radio option is selected.
	 */
	readonly onChange?: (value: string) => void;

	/**
	 * Default selected value.
	 */
	readonly defaultValue?: string;

	/**
	 * Controlled selected value.
	 */
	readonly value?: string;

	/**
	 * Label for the radio group.
	 */
	readonly label?: string;

	/**
	 * Whether the radio group is disabled.
	 */
	readonly isDisabled?: boolean;

	/**
	 * Layout direction for radio options.
	 */
	readonly direction?: 'vertical' | 'horizontal';

	/**
	 * Whether to show radio button indicators.
	 */
	readonly hasIndicators?: boolean;
};

export function RadioGroup({
	options,
	onChange,
	defaultValue,
	value: controlledValue,
	label,
	isDisabled = false,
	direction = 'vertical',
	hasIndicators = true,
}: RadioGroupProps) {
	const {styles, config} = useComponentTheme<Theme>('RadioGroup');
	const icons = config()?.icons as {
		selected: string;
		unselected: string;
	};

	const [internalValue, setInternalValue] = useState(defaultValue ?? '');
	const selectedValue = controlledValue ?? internalValue;

	const selectableOptions = options.filter(option => !option.isDisabled);
	const selectedIndex = selectableOptions.findIndex(
		option => option.value === selectedValue,
	);

	const selectOption = useCallback(
		(option: RadioOption) => {
			if (isDisabled || option.isDisabled) return;

			if (!controlledValue) {
				setInternalValue(option.value);
			}

			onChange?.(option.value);
		},
		[controlledValue, onChange, isDisabled],
	);

	const navigateOptions = useCallback(
		(direction: 'up' | 'down' | 'left' | 'right') => {
			if (selectableOptions.length === 0) return;

			let nextIndex;
			if (direction === 'up' || direction === 'left') {
				nextIndex =
					selectedIndex <= 0 ? selectableOptions.length - 1 : selectedIndex - 1;
			} else {
				nextIndex =
					selectedIndex >= selectableOptions.length - 1 ? 0 : selectedIndex + 1;
			}

			const nextOption = selectableOptions[nextIndex];
			if (nextOption) {
				selectOption(nextOption);
			}
		},
		[selectedIndex, selectableOptions, selectOption],
	);

	useInput((input, key) => {
		if (isDisabled) return;

		if (key.upArrow) {
			navigateOptions('up');
		} else if (key.downArrow) {
			navigateOptions('down');
		} else if (key.leftArrow) {
			navigateOptions('left');
		} else if (key.rightArrow) {
			navigateOptions('right');
		} else if (key.return || input === ' ') {
			const selectedOption = options.find(
				option => option.value === selectedValue,
			);
			if (selectedOption) {
				selectOption(selectedOption);
			}
		}
	});

	const renderRadioOption = (option: RadioOption) => {
		const isSelected = option.value === selectedValue;
		const isOptionDisabled = isDisabled || option.isDisabled;

		return (
			<Box
				key={option.value}
				{...styles.radioOption({
					isSelected,
					isDisabled: Boolean(isOptionDisabled),
				})}
				flexDirection="row"
			>
				{hasIndicators && (
					<Text
						{...styles.radioIndicator({
							isSelected,
							isDisabled: Boolean(isOptionDisabled),
						})}
					>
						{isSelected ? icons.selected : icons.unselected}
					</Text>
				)}

				<Box flexDirection="column">
					<Text
						{...styles.radioLabel({
							isSelected,
							isDisabled: Boolean(isOptionDisabled),
						})}
					>
						{option.label}
					</Text>

					{option.description && (
						<Text
							{...styles.radioDescription({
								isSelected,
								isDisabled: Boolean(isOptionDisabled),
							})}
						>
							{option.description}
						</Text>
					)}
				</Box>
			</Box>
		);
	};

	return (
		<Box
			{...styles.container()}
			flexDirection="column"
			gap={direction === 'vertical' ? 1 : 0}
		>
			{label && <Text {...styles.groupLabel()}>{label}</Text>}

			<Box
				{...styles.optionsContainer()}
				flexDirection={direction === 'vertical' ? 'column' : 'row'}
				gap={direction === 'vertical' ? 1 : 3}
			>
				{options.map(option => renderRadioOption(option))}
			</Box>
		</Box>
	);
}
