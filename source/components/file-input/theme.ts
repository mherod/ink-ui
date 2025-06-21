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
		inputArea: ({
			isDisabled,
			isBrowsing,
			hasFiles,
		}: {
			isDisabled: boolean;
			isBrowsing: boolean;
			hasFiles: boolean;
		}) => ({
			borderStyle: 'single' as const,
			borderColor: isBrowsing ? 'blue' : hasFiles ? 'green' : 'gray',
			padding: 1,
			backgroundColor: isDisabled ? 'gray' : undefined,
			opacity: isDisabled ? 0.5 : 1,
		}),
		inputText: ({
			isDisabled,
			hasFiles,
		}: {
			isDisabled: boolean;
			hasFiles: boolean;
		}) => ({
			color: isDisabled ? 'gray' : hasFiles ? 'green' : 'white',
			flex: 1,
		}),
		browseButton: ({isDisabled}: {isDisabled: boolean}) => ({
			color: isDisabled ? 'gray' : 'blue',
			marginLeft: 2,
		}),
		selectedFiles: () => ({
			borderStyle: 'round' as const,
			borderColor: 'green',
			padding: 1,
		}),
		selectedFilesHeader: () => ({
			color: 'green',
			bold: true,
			marginBottom: 1,
		}),
		selectedFile: () => ({
			color: 'green',
		}),
		removeButton: () => ({
			color: 'red',
			marginLeft: 1,
		}),
		browser: () => ({
			borderColor: 'blue',
			backgroundColor: 'black',
		}),
		browserHeader: () => ({
			color: 'blue',
			bold: true,
		}),
		browserItem: ({
			isSelected,
			isDirectory,
			isFileSelected,
		}: {
			isSelected: boolean;
			isDirectory: boolean;
			isFileSelected: boolean;
		}) => ({
			color: isSelected
				? 'black'
				: isFileSelected
					? 'green'
					: isDirectory
						? 'cyan'
						: 'white',
			backgroundColor: isSelected ? 'blue' : undefined,
		}),
		browserFooter: () => ({
			color: 'gray',
			dimColor: true,
		}),
	},
	config: () => ({
		icons: {
			folder: '📁',
			file: figures.bullet || '📄',
			selectedFile: figures.tick || '✓',
			back: figures.arrowLeft || '←',
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
