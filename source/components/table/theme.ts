import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: ({compact}: {bordered?: boolean; compact?: boolean}) => ({
			padding: compact ? 0 : 1,
		}),
		headerRow: () => ({
			borderBottom: true,
			borderStyle: 'single' as const,
			paddingBottom: 0,
			marginBottom: 0,
		}),
		dataRow: ({isEven, striped}: {isEven: boolean; striped: boolean}) => ({
			backgroundColor: striped && isEven ? 'gray' : undefined,
		}),
		cell: () => ({
			textWrap: 'truncate' as const,
		}),
	},
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
