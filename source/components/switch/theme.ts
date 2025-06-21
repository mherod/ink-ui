import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: ({isDisabled}: {isDisabled: boolean}) => ({
			padding: 0,
			opacity: isDisabled ? 0.5 : 1,
		}),
		switchTrack({
			isChecked,
			size,
			variant,
		}: {
			isChecked: boolean;
			isDisabled: boolean;
			size: 'small' | 'medium' | 'large';
			variant: 'primary' | 'success' | 'warning' | 'danger';
		}) {
			const variantColors = {
				primary: isChecked ? 'blue' : 'gray',
				success: isChecked ? 'green' : 'gray',
				warning: isChecked ? 'yellow' : 'gray',
				danger: isChecked ? 'red' : 'gray',
			};

			return {
				borderStyle: 'round' as const,
				borderColor: variantColors[variant],
				backgroundColor: isChecked ? variantColors[variant] : undefined,
				padding: size === 'small' ? 0 : size === 'large' ? 1 : 0,
				minWidth: size === 'small' ? 3 : size === 'large' ? 7 : 5,
			};
		},
		switchIndicator({
			isChecked,
			isDisabled,
			variant,
		}: {
			isChecked: boolean;
			isDisabled: boolean;
			size: 'small' | 'medium' | 'large';
			variant: 'primary' | 'success' | 'warning' | 'danger';
		}) {
			const variantColors = {
				primary: 'blue',
				success: 'green',
				warning: 'yellow',
				danger: 'red',
			};

			return {
				color: isChecked
					? 'white'
					: isDisabled
						? 'gray'
						: variantColors[variant],
				bold: isChecked,
			};
		},
		stateText: ({
			isChecked,
			isDisabled,
			size,
		}: {
			isChecked: boolean;
			isDisabled: boolean;
			size: 'small' | 'medium' | 'large';
		}) => ({
			color: isChecked ? 'white' : isDisabled ? 'gray' : 'white',
			marginLeft: 1,
			fontSize:
				size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium',
		}),
		label: ({isDisabled}: {isDisabled: boolean}) => ({
			color: isDisabled ? 'gray' : 'white',
			marginLeft: 1,
		}),
		description: ({isDisabled}: {isDisabled: boolean}) => ({
			color: isDisabled ? 'gray' : 'gray',
			marginLeft: 1,
			dimColor: true,
		}),
	},
	config: () => ({
		icons: {
			track: '───',
			thumb: '●',
			trackFilled: '███',
		},
	}),
} satisfies ComponentTheme;

export type Theme = typeof theme;

export default theme;
