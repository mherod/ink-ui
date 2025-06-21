import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: ({hasBorders}: {hasBorders: boolean}) => ({
			padding: hasBorders ? 1 : 0,
		}),
		accordionItem: ({
			isExpanded,
			isDisabled,
			hasBorders,
			size,
		}: {
			isExpanded: boolean;
			isDisabled: boolean;
			hasBorders: boolean;
			size: 'small' | 'medium' | 'large';
		}) => ({
			borderStyle: hasBorders ? ('single' as const) : undefined,
			borderColor: isExpanded ? 'blue' : 'gray',
			marginBottom: size === 'small' ? 0 : size === 'large' ? 2 : 1,
			opacity: isDisabled ? 0.5 : 1,
		}),
		accordionHeader: ({
			isExpanded,
			isDisabled,
			isSelected,
			size,
		}: {
			isExpanded: boolean;
			isDisabled: boolean;
			isSelected: boolean;
			size: 'small' | 'medium' | 'large';
		}) => ({
			padding: size === 'small' ? 1 : size === 'large' ? 2 : 1,
			backgroundColor: isSelected ? 'blue' : isExpanded ? 'gray' : undefined,
			cursor: isDisabled ? 'not-allowed' : 'pointer',
		}),
		expandIcon: ({
			isExpanded,
			isDisabled,
		}: {
			isExpanded: boolean;
			isDisabled: boolean;
		}) => ({
			color: isDisabled ? 'gray' : isExpanded ? 'blue' : 'white',
			marginRight: 1,
		}),
		itemIcon: ({isDisabled}: {isDisabled: boolean}) => ({
			color: isDisabled ? 'gray' : 'cyan',
			marginRight: 1,
		}),
		title: ({
			isExpanded,
			isDisabled,
			isSelected,
		}: {
			isExpanded: boolean;
			isDisabled: boolean;
			isSelected: boolean;
		}) => ({
			color: isSelected
				? 'white'
				: isDisabled
					? 'gray'
					: isExpanded
						? 'white'
						: 'white',
			bold: isExpanded || isSelected,
			flex: 1,
		}),
		accordionContent: ({size}: {size: 'small' | 'medium' | 'large'}) => ({
			padding: size === 'small' ? 1 : size === 'large' ? 2 : 1,
			paddingTop: 0,
		}),
		contentText: () => ({
			color: 'white',
		}),
	},
	config: () => ({
		icons: {
			expanded: figures.arrowDown,
			collapsed: figures.arrowRight,
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
