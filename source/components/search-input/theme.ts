import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: () => ({
			padding: 1,
		}),
		label: () => ({
			color: 'white',
			bold: true,
			marginBottom: 1,
		}),
		inputContainer: ({
			isDisabled,
			isActive,
		}: {
			isDisabled: boolean;
			isActive: boolean;
		}) => ({
			borderStyle: 'single' as const,
			borderColor: isActive ? 'blue' : isDisabled ? 'gray' : 'white',
			padding: 1,
			backgroundColor: isDisabled ? 'gray' : undefined,
			opacity: isDisabled ? 0.5 : 1,
		}),
		searchIcon: ({isDisabled}: {isDisabled: boolean}) => ({
			color: isDisabled ? 'gray' : 'blue',
			marginRight: 1,
		}),
		input: ({
			isDisabled,
			hasValue,
		}: {
			isDisabled: boolean;
			hasValue: boolean;
		}) => ({
			color: isDisabled ? 'gray' : hasValue ? 'white' : 'gray',
			flex: 1,
		}),
		clearButton: () => ({
			color: 'red',
			marginLeft: 1,
		}),
		resultsContainer: () => ({
			borderColor: 'blue',
			backgroundColor: 'black',
			padding: 1,
			maxHeight: 10,
		}),
		categoryHeader: () => ({
			color: 'cyan',
			bold: true,
			marginBottom: 1,
		}),
		resultItem: ({isSelected}: {isSelected: boolean}) => ({
			color: isSelected ? 'black' : 'white',
			backgroundColor: isSelected ? 'blue' : undefined,
			paddingLeft: 1,
		}),
		resultDescription: () => ({
			color: 'gray',
			dimColor: true,
			paddingLeft: 2,
		}),
		resultsFooter: () => ({
			color: 'gray',
			dimColor: true,
		}),
	},
	config: () => ({
		icons: {
			search: '🔍',
			clear: figures.cross || '✕',
			result: figures.pointer || '•',
			category: figures.arrowRight || '▶',
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
