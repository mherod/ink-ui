import React, {useState, useCallback} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type SwitchProps = {
	/**
	 * Callback when the switch state changes.
	 */
	readonly onChange?: (checked: boolean) => void;

	/**
	 * Default checked state.
	 */
	readonly isDefaultChecked?: boolean;

	/**
	 * Controlled checked state.
	 */
	readonly isChecked?: boolean;

	/**
	 * Whether the switch is disabled.
	 */
	readonly isDisabled?: boolean;

	/**
	 * Label for the switch.
	 */
	readonly label?: string;

	/**
	 * Description text.
	 */
	readonly description?: string;

	/**
	 * Size of the switch.
	 */
	readonly size?: 'small' | 'medium' | 'large';

	/**
	 * Color variant when checked.
	 */
	readonly variant?: 'primary' | 'success' | 'warning' | 'danger';

	/**
	 * Whether to show the switch state as text.
	 */
	readonly hasStateText?: boolean;

	/**
	 * Custom text for checked state.
	 */
	readonly checkedText?: string;

	/**
	 * Custom text for unchecked state.
	 */
	readonly uncheckedText?: string;
};

export function Switch({
	onChange,
	isDefaultChecked = false,
	isChecked: controlledChecked,
	isDisabled = false,
	label,
	description,
	size = 'medium',
	variant = 'primary',
	hasStateText = false,
	checkedText = 'ON',
	uncheckedText = 'OFF',
}: SwitchProps) {
	const {styles, config} = useComponentTheme<Theme>('Switch');
	const icons = config()?.icons as {
		track: string;
		thumb: string;
		trackFilled: string;
	};

	const [internalChecked, setInternalChecked] = useState(isDefaultChecked);
	const checked = controlledChecked ?? internalChecked;

	const toggle = useCallback(() => {
		if (isDisabled) return;

		const newChecked = !checked;

		if (!controlledChecked) {
			setInternalChecked(newChecked);
		}

		onChange?.(newChecked);
	}, [checked, controlledChecked, onChange, isDisabled]);

	useInput((input, key) => {
		if (isDisabled) return;

		if (key.return || input === ' ') {
			toggle();
		}
	});

	const getSwitchIndicator = () => {
		if (size === 'small') {
			return checked ? '●' : '○';
		}

		if (size === 'large') {
			return checked
				? (icons.trackFilled ?? '█████')
				: (icons.track ?? '─────');
		}

		// Medium size (default)
		return checked ? (icons.trackFilled ?? '███') : (icons.track ?? '───');
	};

	const getStateText = () => {
		if (!hasStateText) return null;
		return checked ? checkedText : uncheckedText;
	};

	return (
		<Box
			{...styles.container({
				isDisabled,
			})}
			flexDirection="row"
			gap={1}
		>
			<Box
				{...styles.switchTrack({
					isChecked: checked,
					isDisabled,
					size,
					variant,
				})}
				flexDirection="row"
				alignItems="center"
			>
				<Text
					{...styles.switchIndicator({
						isChecked: checked,
						isDisabled,
						size,
						variant,
					})}
				>
					{getSwitchIndicator()}
				</Text>

				{hasStateText && (
					<Text
						{...styles.stateText({
							isChecked: checked,
							isDisabled,
							size,
						})}
					>
						{getStateText()}
					</Text>
				)}
			</Box>

			{(label ?? description) && (
				<Box flexDirection="column">
					{label && (
						<Text
							{...styles.label({
								isDisabled,
							})}
						>
							{label}
						</Text>
					)}

					{description && (
						<Text
							{...styles.description({
								isDisabled,
							})}
						>
							{description}
						</Text>
					)}
				</Box>
			)}
		</Box>
	);
}
