import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		overlay: () => ({
			position: 'absolute' as const,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'black',
			justifyContent: 'center' as const,
			alignItems: 'center' as const,
		}),
		container: ({width, height}: {width?: number; height?: number}) => ({
			width,
			height,
			backgroundColor: 'black',
			borderStyle: 'single' as const,
			borderColor: 'white',
			flexDirection: 'column' as const,
		}),
		header: () => ({
			borderBottom: true,
			borderStyle: 'single' as const,
			paddingX: 2,
			paddingY: 1,
		}),
		title: () => ({
			bold: true,
			color: 'white',
		}),
		content: () => ({
			padding: 2,
			flexGrow: 1,
		}),
		dialogActions: () => ({
			flexDirection: 'row' as const,
			gap: 2,
			justifyContent: 'flex-end' as const,
		}),
		dialogButton({variant}: {variant: 'default' | 'destructive' | 'cancel'}) {
			const colors = {
				default: 'blue',
				destructive: 'red',
				cancel: 'gray',
			};

			return {
				color: colors[variant] || 'white',
				bold: variant !== 'cancel',
			};
		},
	},
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
