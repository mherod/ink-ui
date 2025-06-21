import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		horizontalContainer: () => ({
			flexDirection: 'row' as const,
		}),
		verticalContainer: () => ({
			flexDirection: 'column' as const,
		}),
		horizontalLine: ({
			variant,
		}: {
			variant: 'solid' | 'dashed' | 'dotted' | 'double';
		}) => ({
			color:
				variant === 'dotted' ? 'gray' : variant === 'dashed' ? 'cyan' : 'white',
		}),
		verticalLine: ({
			variant,
		}: {
			variant: 'solid' | 'dashed' | 'dotted' | 'double';
		}) => ({
			color:
				variant === 'dotted' ? 'gray' : variant === 'dashed' ? 'cyan' : 'white',
		}),
	},
	config: () => ({
		horizontal: {
			solid: figures.line || '-',
			dashed: '-',
			dotted: '·',
			double: figures.lineDouble || '=',
		},
		vertical: {
			solid: figures.lineVertical || '|',
			dashed: '¦',
			dotted: '⋮',
			double: '‖',
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
