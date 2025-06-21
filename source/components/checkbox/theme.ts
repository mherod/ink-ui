import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: () => ({
			flexDirection: 'row' as const,
			gap: 1,
		}),
		icon: () => ({}),
		label: () => ({}),
	},
	config: () => ({
		checkedIcon: figures.radioOn,
		uncheckedIcon: figures.radioOff,
		indeterminateIcon: figures.line,
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
