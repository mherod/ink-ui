import React, {useState, useCallback} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type SliderProps = {
	/**
	 * Callback when the slider value changes.
	 */
	readonly onChange?: (value: number) => void;

	/**
	 * Minimum value.
	 */
	readonly min?: number;

	/**
	 * Maximum value.
	 */
	readonly max?: number;

	/**
	 * Step increment.
	 */
	readonly step?: number;

	/**
	 * Default value.
	 */
	readonly defaultValue?: number;

	/**
	 * Controlled value.
	 */
	readonly value?: number;

	/**
	 * Whether the slider is disabled.
	 */
	readonly isDisabled?: boolean;

	/**
	 * Label for the slider.
	 */
	readonly label?: string;

	/**
	 * Whether to show the current value.
	 */
	readonly hasValueDisplay?: boolean;

	/**
	 * Width of the slider track.
	 */
	readonly width?: number;

	/**
	 * Whether to show tick marks.
	 */
	readonly hasTicks?: boolean;

	/**
	 * Custom tick positions (array of values).
	 */
	readonly tickPositions?: number[];

	/**
	 * Whether to show min/max labels.
	 */
	readonly hasMinMaxLabels?: boolean;

	/**
	 * Custom formatter for displaying values.
	 */
	readonly formatValue?: (value: number) => string;

	/**
	 * Color variant for the slider.
	 */
	readonly variant?: 'primary' | 'success' | 'warning' | 'danger';
};

export function Slider({
	onChange,
	min = 0,
	max = 100,
	step = 1,
	defaultValue,
	value: controlledValue,
	isDisabled = false,
	label,
	hasValueDisplay = true,
	width = 20,
	hasTicks = false,
	tickPositions,
	hasMinMaxLabels = false,
	formatValue = (value: number) => value.toString(),
	variant = 'primary',
}: SliderProps) {
	const {styles, config} = useComponentTheme<Theme>('Slider');
	const icons = config()?.icons as {
		track: string;
		thumb: string;
		tick: string;
	};

	const [internalValue, setInternalValue] = useState(
		defaultValue ?? Math.max(min, Math.min(max, min + (max - min) / 2)),
	);

	const currentValue = controlledValue ?? internalValue;

	const updateValue = useCallback(
		(newValue: number) => {
			const clampedValue = Math.max(min, Math.min(max, newValue));
			const steppedValue = Math.round(clampedValue / step) * step;

			if (!controlledValue) {
				setInternalValue(steppedValue);
			}

			onChange?.(steppedValue);
		},
		[controlledValue, onChange, min, max, step],
	);

	const moveSlider = useCallback(
		(direction: 'left' | 'right') => {
			if (isDisabled) return;

			const increment = direction === 'right' ? step : -step;
			updateValue(currentValue + increment);
		},
		[currentValue, step, updateValue, isDisabled],
	);

	useInput((input, key) => {
		if (isDisabled) return;

		if (key.leftArrow) {
			moveSlider('left');
		} else if (key.rightArrow) {
			moveSlider('right');
		} else if (input === 'h') {
			moveSlider('left');
		} else if (input === 'l') {
			moveSlider('right');
		} else if (/^\d$/.test(input)) {
			// Allow quick jumps with numbers 0-9
			const digit = Number.parseInt(input, 10);
			const percentage = digit / 9; // 0-9 maps to 0-100%
			const newValue = min + percentage * (max - min);
			updateValue(newValue);
		}
	});

	const renderTrack = () => {
		const percentage = (currentValue - min) / (max - min);
		const thumbPosition = Math.round(percentage * width);

		const trackCharacters = [];

		for (let i = 0; i < width; i++) {
			if (i === thumbPosition) {
				trackCharacters.push(icons.thumb);
			} else if (i < thumbPosition) {
				trackCharacters.push('█'); // Filled portion
			} else {
				trackCharacters.push(icons.track);
			}
		}

		return trackCharacters.join('');
	};

	const renderTicks = () => {
		if (!hasTicks) return null;

		const positions = tickPositions ?? [];
		if (positions.length === 0) {
			// Generate default ticks at 25%, 50%, 75%
			positions.push(
				min + (max - min) * 0.25,
				min + (max - min) * 0.5,
				min + (max - min) * 0.75,
			);
		}

		const ticksDisplay = [];
		for (let i = 0; i < width; i++) {
			const value = min + (i / width) * (max - min);
			const hasTick = positions.some(
				pos => Math.abs(value - pos) < (max - min) / width,
			);
			ticksDisplay.push(hasTick ? icons.tick : ' ');
		}

		return <Text {...styles.ticks()}>{ticksDisplay.join('')}</Text>;
	};

	return (
		<Box
			{...styles.container({
				isDisabled,
			})}
			flexDirection="column"
		>
			{label && <Text {...styles.label()}>{label}</Text>}

			<Box
				{...styles.sliderContainer()}
				flexDirection="row"
				alignItems="center"
				gap={1}
			>
				{hasMinMaxLabels && (
					<Text {...styles.minMaxLabel()}>{formatValue(min)}</Text>
				)}

				<Box flexDirection="column">
					<Text
						{...styles.track({
							isDisabled,
							variant,
						})}
					>
						{renderTrack()}
					</Text>

					{renderTicks()}
				</Box>

				{hasMinMaxLabels && (
					<Text {...styles.minMaxLabel()}>{formatValue(max)}</Text>
				)}

				{hasValueDisplay && (
					<Text
						{...styles.valueDisplay({
							variant,
						})}
					>
						{formatValue(currentValue)}
					</Text>
				)}
			</Box>
		</Box>
	);
}
