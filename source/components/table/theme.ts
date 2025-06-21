import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: ({compact}: {bordered?: boolean; compact?: boolean}) => ({
			padding: compact ? 0 : 1,
		}),
		headerRow: () => ({
			paddingBottom: 0,
			marginBottom: 0,
		}),
		dataRow: ({isEven, striped}: {isEven: boolean; striped: boolean}) => ({
			backgroundColor: striped && isEven ? 'gray' : undefined,
		}),
		cell: () => ({}),
		headerCell: () => ({
			backgroundColor: 'blueBright',
			color: 'white',
			bold: true,
		}),
	},
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
