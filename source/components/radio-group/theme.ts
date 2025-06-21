import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: () => ({
			padding: 1,
		}),
		groupLabel: () => ({
			color: 'white',
			bold: true,
			marginBottom: 1,
		}),
		optionsContainer: () => ({
			// Layout handled by parent Box
		}),
		radioOption: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			flexDirection: 'row' as const,
			gap: 1,
			padding: 0,
			backgroundColor: isSelected ? 'blue' : undefined,
			opacity: isDisabled ? 0.5 : 1,
		}),
		radioIndicator: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			color: isSelected ? 'green' : isDisabled ? 'gray' : 'blue',
			marginRight: 1,
		}),
		radioLabel: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			color: isSelected ? 'white' : isDisabled ? 'gray' : 'white',
		}),
		radioDescription: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			color: isSelected ? 'white' : isDisabled ? 'gray' : 'gray',
			dimColor: true,
		}),
	},
	config: () => ({
		icons: {
			selected: figures.radioOn,
			unselected: figures.radioOff,
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
