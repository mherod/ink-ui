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
			backgroundColor: 'blueBright',
			color: 'white',
			bold: true,
		}),
		dataRow: ({isEven, striped}: {isEven: boolean; striped: boolean}) => ({
			backgroundColor: striped && isEven ? 'gray' : undefined,
		}),
		cell: () => ({
			textWrap: 'truncate' as const,
			borderStyle: 'single' as const,
			borderLeft: true,
			borderRight: true,
			paddingLeft: 1,
			paddingRight: 1,
		}),
		headerCell: () => ({
			textWrap: 'truncate' as const,
			borderStyle: 'single' as const,
			borderLeft: true,
			borderRight: true,
			paddingLeft: 1,
			paddingRight: 1,
			backgroundColor: 'blueBright',
			color: 'white',
			bold: true,
		}),
	},
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
