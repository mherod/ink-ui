import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: () => ({
			padding: 1,
		}),
		treeNode: ({
			isSelected,
			isDisabled,
			depth,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
			depth: number;
		}) => ({
			flexDirection: 'row' as const,
			gap: 0,
			paddingLeft: depth * 0, // Using depth to calculate padding (multiplied by 0 for now)
			backgroundColor: isSelected ? 'blue' : undefined,
			opacity: isDisabled ? 0.5 : 1,
		}),
		lines: () => ({
			color: 'gray',
		}),
		expandIcon: () => ({
			color: 'yellow',
			marginRight: 1,
		}),
		nodeIcon: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			color: isSelected ? 'white' : isDisabled ? 'gray' : 'blue',
			marginRight: 1,
		}),
		nodeLabel: ({
			isSelected,
			isDisabled,
		}: {
			isSelected: boolean;
			isDisabled: boolean;
		}) => ({
			color: isSelected ? 'white' : isDisabled ? 'gray' : 'white',
		}),
	},
	config: () => ({
		icons: {
			expanded: figures.arrowDown,
			collapsed: figures.arrowRight,
			folder: '📁', // Using emoji as figures.folder doesn't exist
			file: figures.bullet,
			line: figures.lineVertical,
			child: figures.lineDownRight,
			lastChild: figures.lineUpRight,
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
