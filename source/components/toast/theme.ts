import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';
import {type ToastVariant} from './toast.js';

const colorByVariant: Record<ToastVariant, string> = {
	success: 'green',
	error: 'red',
	warning: 'yellow',
	info: 'blue',
};

const theme = {
	styles: {
		container: ({variant}: {variant: ToastVariant}) => ({
			flexDirection: 'row' as const,
			gap: 1,
			padding: 1,
			borderStyle: 'single' as const,
			borderColor: colorByVariant[variant],
		}),
		icon: ({variant}: {variant: ToastVariant}) => ({
			color: colorByVariant[variant],
		}),
		message: ({variant}: {variant: ToastVariant}) => ({
			color: colorByVariant[variant],
		}),
		manager: ({position}: {position: 'top' | 'bottom'}) => ({
			position: 'absolute' as const,
			top: position === 'top' ? 0 : undefined,
			bottom: position === 'bottom' ? 0 : undefined,
			left: 0,
			right: 0,
			flexDirection: 'column' as const,
			gap: 1,
			padding: 1,
		}),
	},
	config: () => ({
		icons: {
			success: figures.tick,
			error: figures.cross,
			warning: figures.warning,
			info: figures.info,
		} satisfies Record<ToastVariant, string>,
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
