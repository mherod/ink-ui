import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type ToastProps = {
	/**
	 * Toast variant affecting color and icon.
	 */
	readonly variant?: ToastVariant;

	/**
	 * Toast message content.
	 */
	readonly children: React.ReactNode;

	/**
	 * Whether to show an icon.
	 */
	readonly hasIcon?: boolean;

	/**
	 * Auto-close duration in milliseconds. Set to 0 to disable auto-close.
	 */
	readonly duration?: number;

	/**
	 * Callback when toast is closed.
	 */
	readonly onClose?: () => void;

	/**
	 * Whether the toast is visible.
	 */
	readonly isVisible?: boolean;
};

export function Toast({
	variant = 'info',
	children,
	hasIcon = true,
	duration = 4000,
	onClose,
	isVisible = true,
}: ToastProps) {
	const {styles, config} = useComponentTheme<Theme>('Toast');
	const {icons} = config();

	const [internalIsVisible, setInternalIsVisible] = useState(isVisible);

	useEffect(() => {
		setInternalIsVisible(isVisible);
	}, [isVisible]);

	useEffect(() => {
		if (duration > 0 && internalIsVisible) {
			const timer = globalThis.setTimeout(() => {
				setInternalIsVisible(false);
				onClose?.();
			}, duration);

			return () => {
				globalThis.clearTimeout(timer);
			};
		}

		return undefined;
	}, [duration, internalIsVisible, onClose]);

	if (!internalIsVisible) {
		return null;
	}

	const icon = icons[variant];

	return (
		<Box {...styles.container({variant})}>
			{hasIcon && <Text {...styles.icon({variant})}>{icon}</Text>}
			<Text {...styles.message({variant})}>{children}</Text>
		</Box>
	);
}

export type ToastManagerProps = {
	/**
	 * Array of toasts to display.
	 */
	readonly toasts: Array<{
		id: string;
		variant?: ToastVariant;
		message: React.ReactNode;
		duration?: number;
	}>;

	/**
	 * Callback when a toast is dismissed.
	 */
	readonly onDismiss?: (id: string) => void;

	/**
	 * Position of the toast container.
	 */
	readonly position?: 'top' | 'bottom';
};

export function ToastManager({
	toasts,
	onDismiss,
	position = 'top',
}: ToastManagerProps) {
	const {styles} = useComponentTheme<Theme>('Toast');

	return (
		<Box {...styles.manager({position})}>
			{toasts.map(toast => (
				<Toast
					key={toast.id}
					variant={toast.variant}
					duration={toast.duration}
					onClose={() => onDismiss?.(toast.id)}
				>
					{toast.message}
				</Toast>
			))}
		</Box>
	);
}
