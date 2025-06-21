import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: ({isDisabled}: {isDisabled: boolean}) => ({
			padding: 1,
			opacity: isDisabled ? 0.5 : 1,
		}),
		label: () => ({
			color: 'white',
			bold: true,
			marginBottom: 1,
		}),
		sliderContainer: () => ({
			// Layout handled by parent Box
		}),
		track({
			isDisabled,
			variant,
		}: {
			isDisabled: boolean;
			variant: 'primary' | 'success' | 'warning' | 'danger';
		}) {
			const variantColors = {
				primary: 'blue',
				success: 'green',
				warning: 'yellow',
				danger: 'red',
			};

			return {
				color: isDisabled ? 'gray' : variantColors[variant],
				backgroundColor: undefined,
			};
		},
		ticks: () => ({
			color: 'gray',
			marginTop: 0,
		}),
		minMaxLabel: () => ({
			color: 'gray',
			fontSize: 'small',
		}),
		valueDisplay({
			variant,
		}: {
			variant: 'primary' | 'success' | 'warning' | 'danger';
		}) {
			const variantColors = {
				primary: 'blue',
				success: 'green',
				warning: 'yellow',
				danger: 'red',
			};

			return {
				color: variantColors[variant],
				bold: true,
				marginLeft: 2,
			};
		},
	},
	config: () => ({
		icons: {
			track: '─',
			thumb: '●',
			tick: '|',
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
