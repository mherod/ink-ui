import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: () => ({
			padding: 1,
		}),
		menuItem: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			flexDirection: 'row' as const,
			gap: 1,
			paddingX: 1,
			backgroundColor: isSelected ? 'blue' : undefined,
			opacity: isDisabled ? 0.5 : 1,
		}),
		icon: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			color: isSelected ? 'white' : isDisabled ? 'gray' : 'green',
		}),
		label: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			color: isSelected ? 'white' : isDisabled ? 'gray' : 'white',
		}),
		submenuIndicator: () => ({
			color: 'gray',
		}),
		separator: () => ({
			paddingY: 0,
			marginY: 1,
		}),
		separatorText: () => ({
			color: 'gray',
		}),
	},
	config: () => ({
		icons: {
			selected: figures.radioOn,
			unselected: figures.radioOff,
			submenu: figures.arrowRight,
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
