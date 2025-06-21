import React from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type CheckboxProps = {
	/**
	 * Whether the checkbox is checked.
	 */
	readonly isChecked?: boolean;

	/**
	 * Whether the checkbox is in an indeterminate state.
	 */
	readonly isIndeterminate?: boolean;

	/**
	 * Whether the checkbox is disabled.
	 */
	readonly isDisabled?: boolean;

	/**
	 * Label text for the checkbox.
	 */
	readonly label?: string;

	/**
	 * Callback fired when the checkbox state changes.
	 */
	readonly onChange?: (checked: boolean) => void;
};

export function Checkbox({
	isChecked = false,
	isIndeterminate = false,
	isDisabled = false,
	label,
	onChange,
}: CheckboxProps) {
	const {styles, config} = useComponentTheme<Theme>('Checkbox');
	const {checkedIcon, uncheckedIcon, indeterminateIcon} = config();

	useInput(
		(input, key) => {
			if ((input === ' ' || key.return) && !isDisabled) {
				onChange?.(!isChecked);
			}
		},
		{isActive: !isDisabled},
	);

	const getIcon = () => {
		if (isIndeterminate) {
			return indeterminateIcon;
		}

		return isChecked ? checkedIcon : uncheckedIcon;
	};

	const iconColor = isIndeterminate || isChecked ? 'green' : 'gray';

	return (
		<Box {...styles.container()}>
			<Text {...styles.icon()} color={iconColor}>
				{getIcon()}
			</Text>
			{label && <Text {...styles.label()}>{label}</Text>}
		</Box>
	);
}
