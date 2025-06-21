import React from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type ModalProps = {
	/**
	 * Whether the modal is open.
	 */
	readonly isOpen: boolean;

	/**
	 * Modal title.
	 */
	readonly title?: string;

	/**
	 * Modal content.
	 */
	readonly children: React.ReactNode;

	/**
	 * Callback when modal should be closed.
	 */
	readonly onClose?: () => void;

	/**
	 * Whether pressing Escape closes the modal.
	 */
	readonly hasEscapeClose?: boolean;

	/**
	 * Width of the modal.
	 */
	readonly width?: number;

	/**
	 * Height of the modal.
	 */
	readonly height?: number;
};

export function Modal({
	isOpen,
	title,
	children,
	onClose,
	hasEscapeClose = true,
	width = 60,
	height,
}: ModalProps) {
	const {styles} = useComponentTheme<Theme>('Modal');

	useInput(
		(_input, key) => {
			if (key.escape && hasEscapeClose) {
				onClose?.();
			}
		},
		{isActive: isOpen},
	);

	if (!isOpen) {
		return null;
	}

	return (
		<Box {...styles.overlay()}>
			<Box {...styles.container({width, height})}>
				{title && (
					<Box {...styles.header()}>
						<Text {...styles.title()}>{title}</Text>
					</Box>
				)}
				<Box {...styles.content()}>{children}</Box>
			</Box>
		</Box>
	);
}

export type ConfirmDialogProps = {
	/**
	 * Whether the dialog is open.
	 */
	readonly isOpen: boolean;

	/**
	 * Dialog title.
	 */
	readonly title?: string;

	/**
	 * Dialog message.
	 */
	readonly message: string;

	/**
	 * Text for the confirm button.
	 */
	readonly confirmText?: string;

	/**
	 * Text for the cancel button.
	 */
	readonly cancelText?: string;

	/**
	 * Callback when confirmed.
	 */
	readonly onConfirm?: () => void;

	/**
	 * Callback when cancelled.
	 */
	readonly onCancel?: () => void;

	/**
	 * Variant affecting the confirm button color.
	 */
	readonly variant?: 'default' | 'destructive';
};

export function ConfirmDialog({
	isOpen,
	title = 'Confirm',
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	onConfirm,
	onCancel,
	variant = 'default',
}: ConfirmDialogProps) {
	const {styles} = useComponentTheme<Theme>('Modal');

	useInput(
		(_input, key) => {
			if (key.escape) {
				onCancel?.();
			} else if (key.return) {
				onConfirm?.();
			}
		},
		{isActive: isOpen},
	);

	if (!isOpen) {
		return null;
	}

	return (
		<Modal isOpen={isOpen} title={title} width={50} onClose={onCancel}>
			<Box flexDirection="column" gap={2}>
				<Text>{message}</Text>
				<Box {...styles.dialogActions()}>
					<Text {...styles.dialogButton({variant: 'cancel'})}>
						{cancelText} (Esc)
					</Text>
					<Text {...styles.dialogButton({variant})}>{confirmText} (Enter)</Text>
				</Box>
			</Box>
		</Modal>
	);
}
