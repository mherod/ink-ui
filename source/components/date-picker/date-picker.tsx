import React from 'react';
import {Box, Text} from 'ink';
import {format} from 'date-fns';
import {useComponentTheme} from '../../theme.js';
import {useDatePicker, type UseDatePickerOptions} from './use-date-picker.js';
import {type Theme} from './theme.js';

export type DatePickerProps = UseDatePickerOptions & {
	/**
	 * Show navigation instructions at the bottom
	 * @default true
	 */
	readonly showInstructions?: boolean;
};

export function DatePicker({
	showInstructions = true,
	isDisabled = false,
	...options
}: DatePickerProps = {}) {
	const {styles, config} = useComponentTheme<Theme>('DatePicker');
	const {weekdays} = config();

	const {currentMonthYear, weeks, selectedDate} = useDatePicker({
		isDisabled,
		...options,
	});

	return (
		<Box {...styles.container()}>
			{/* Header with month/year and navigation */}
			<Box {...styles.header()}>
				<Text {...styles.navigationButton({isDisabled})}>◀</Text>
				<Text {...styles.monthYear()}>{currentMonthYear}</Text>
				<Text {...styles.navigationButton({isDisabled})}>▶</Text>
			</Box>

			{/* Weekdays header */}
			<Box {...styles.weekdaysHeader()}>
				{weekdays.map(weekday => (
					<Text key={weekday} {...styles.weekday()}>
						{weekday}
					</Text>
				))}
			</Box>

			{/* Calendar grid */}
			<Box {...styles.calendar()}>
				{weeks.map(week => (
					<Box key={week[0]?.date.toISOString()} {...styles.week()}>
						{week.map(day => {
							const dayProps = {
								isToday: day.isToday,
								isSelected: day.isSelected,
								isFocused: day.isFocused,
								isDisabled: day.isDisabled,
								isOtherMonth: !day.isCurrentMonth,
							};

							return (
								<Box key={day.date.toISOString()} {...styles.day(dayProps)}>
									<Text {...styles.day(dayProps)}>{format(day.date, 'd')}</Text>
								</Box>
							);
						})}
					</Box>
				))}
			</Box>

			{/* Instructions */}
			{showInstructions && (
				<Box {...styles.footer()}>
					<Text {...styles.instructions()}>
						Arrow keys: Navigate • Space/Enter: Select • P/N: Previous/Next
						month • T: Today
					</Text>
				</Box>
			)}

			{/* Selected date display */}
			{selectedDate && (
				<Box {...styles.footer()}>
					<Text>Selected: {format(selectedDate, 'EEEE, MMMM d, yyyy')}</Text>
				</Box>
			)}
		</Box>
	);
}
