import {type BoxProps, type TextProps} from 'ink';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: (): BoxProps => ({
			flexDirection: 'column',
			borderStyle: 'round',
			paddingX: 1,
			paddingY: 0,
		}),
		header: (): BoxProps => ({
			justifyContent: 'space-between',
			marginBottom: 1,
		}),
		monthYear: (): TextProps => ({
			bold: true,
			color: 'blue',
		}),
		navigationButton: ({isDisabled}): TextProps => ({
			color: isDisabled ? 'gray' : 'cyan',
			bold: true,
		}),
		weekdaysHeader: (): BoxProps => ({
			justifyContent: 'space-around',
			marginBottom: 1,
		}),
		weekday: (): TextProps => ({
			color: 'gray',
			bold: true,
		}),
		calendar: (): BoxProps => ({
			flexDirection: 'column',
		}),
		week: (): BoxProps => ({
			justifyContent: 'space-around',
		}),
		day({
			isToday,
			isSelected,
			isFocused,
			isDisabled,
			isOtherMonth,
		}): BoxProps & TextProps {
			let backgroundColor: string | undefined;
			let color: string | undefined;

			if (isDisabled || isOtherMonth) {
				color = 'gray';
			} else if (isSelected) {
				backgroundColor = 'blue';
				color = 'white';
			} else if (isFocused) {
				backgroundColor = 'cyan';
				color = 'black';
			} else if (isToday) {
				color = 'yellow';
			}

			return {
				backgroundColor,
				color,
				width: 3,
				justifyContent: 'center',
				alignItems: 'center',
			};
		},
		footer: (): BoxProps => ({
			marginTop: 1,
			justifyContent: 'center',
		}),
		instructions: (): TextProps => ({
			color: 'gray',
			dimColor: true,
		}),
	},
	config: () => ({
		weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		monthNames: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
	}),
} satisfies ComponentTheme;

export default theme;
export type Theme = typeof theme;
