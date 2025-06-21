import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: ({size}: {size: 'small' | 'medium' | 'large'}) => ({
			padding: size === 'small' ? 0 : size === 'large' ? 1 : 0,
		}),
		breadcrumbItem: ({
			isLast,
			isClickable,
			isEllipsis,
			size,
			hasCurrentHighlight,
		}: {
			isLast: boolean;
			isClickable: boolean;
			isEllipsis: boolean;
			size: 'small' | 'medium' | 'large';
			hasCurrentHighlight: boolean;
		}) => ({
			padding: size === 'small' ? 0 : size === 'large' ? 1 : 0,
			cursor: isClickable ? 'pointer' : 'default',
			backgroundColor:
				isLast && hasCurrentHighlight && !isEllipsis ? 'blue' : undefined,
		}),
		itemIcon: ({size}: {size: 'small' | 'medium' | 'large'}) => ({
			color: 'cyan',
			marginRight: size === 'small' ? 0 : 1,
		}),
		itemText: ({
			isLast,
			isClickable,
			isEllipsis,
			size,
			hasCurrentHighlight,
		}: {
			isLast: boolean;
			isClickable: boolean;
			isEllipsis: boolean;
			size: 'small' | 'medium' | 'large';
			hasCurrentHighlight: boolean;
		}) => ({
			color: isEllipsis
				? 'gray'
				: isLast && hasCurrentHighlight
					? 'white'
					: isClickable
						? 'blue'
						: 'white',
			bold: isLast && hasCurrentHighlight,
			underline: isClickable && !isLast,
			fontSize:
				size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium',
		}),
		separator: ({size}: {size: 'small' | 'medium' | 'large'}) => ({
			color: 'gray',
			marginX: size === 'small' ? 1 : size === 'large' ? 2 : 1,
		}),
	},
	config: () => ({
		separator: figures.arrowRight || '>',
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
