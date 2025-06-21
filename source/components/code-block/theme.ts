import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: ({hasBorders}: {hasBorders: boolean}) => ({
			flexDirection: 'column' as const,
			borderStyle: hasBorders ? ('single' as const) : undefined,
			borderColor: 'gray',
		}),
		header: () => ({
			flexDirection: 'row' as const,
			justifyContent: 'space-between' as const,
			paddingBottom: 1,
			borderBottomStyle: 'single' as const,
			borderColor: 'gray',
		}),
		title: () => ({
			color: 'white',
			bold: true,
		}),
		language: () => ({
			color: 'gray',
			italic: true,
		}),
		codeContainer: () => ({
			padding: 1,
		}),
		codeLine: () => ({
			flexDirection: 'row' as const,
		}),
		lineNumber: () => ({
			color: 'gray',
			marginRight: 2,
		}),
		codeContent({language}: {language: string}) {
			const languageColors = {
				javascript: 'yellow',
				typescript: 'blue',
				python: 'green',
				json: 'cyan',
				bash: 'white',
				css: 'magenta',
				html: 'red',
			};

			return {
				color:
					languageColors[language as keyof typeof languageColors] || 'white',
			};
		},
	},
	config: () => ({
		colors: {
			javascript: 'yellow',
			typescript: 'blue',
			python: 'green',
			json: 'cyan',
			bash: 'white',
			css: 'magenta',
			html: 'red',
			default: 'white',
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
