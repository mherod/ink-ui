import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: () => ({
			flexDirection: 'column' as const,
		}),
		tabList: () => ({
			flexDirection: 'row' as const,
			borderBottom: true,
			borderStyle: 'single' as const,
		}),
		tab: ({
			fullWidth,
		}: {
			isActive: boolean;
			isDisabled: boolean;
			fullWidth: boolean;
		}) => ({
			paddingX: 2,
			paddingY: 0,
			flexGrow: fullWidth ? 1 : 0,
		}),
		tabLabel: ({
			isActive,
			isDisabled,
		}: {
			isActive: boolean;
			isDisabled: boolean;
		}) => ({
			color: isDisabled ? 'gray' : isActive ? 'blue' : 'white',
			bold: isActive,
		}),
		tabContent: () => ({
			padding: 1,
		}),
	},
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
