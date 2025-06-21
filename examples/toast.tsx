/**
 * Run this example:
 *   npm run example examples/toast.tsx
 */

import React, {useState, useCallback} from 'react';
import {render, Box, Text} from 'ink';
import {Toast, ToastManager} from '../source/index.js';

type ToastItem = {
	id: string;
	variant: 'success' | 'error' | 'warning' | 'info';
	message: React.ReactNode;
	duration?: number;
};

function Example() {
	const [toasts, setToasts] = useState<ToastItem[]>([]);
	const [showSingleToast, setShowSingleToast] = useState(false);

	const addToast = useCallback(
		(variant: ToastItem['variant'], message: string, duration?: number) => {
			const id = Math.random().toString(36).slice(2);
			setToasts(prev => [...prev, {id, variant, message, duration}]);
		},
		[],
	);

	const removeToast = useCallback((id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	const showSuccessToast = () => {
		addToast('success', 'Operation completed successfully!');
	};

	const showErrorToast = () => {
		addToast('error', 'Something went wrong. Please try again.');
	};

	const showWarningToast = () => {
		addToast('warning', 'This action cannot be undone.');
	};

	const showInfoToast = () => {
		addToast('info', 'New update available. Click to download.');
	};

	const showPersistentToast = () => {
		addToast('info', 'This toast will not auto-close.', 0);
	};

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Toast Examples
			</Text>

			<Box flexDirection="column" gap={1}>
				<Text bold>Individual Toasts:</Text>

				<Box flexDirection="column" gap={1}>
					<Toast variant="success">File saved successfully!</Toast>

					<Toast variant="error">Failed to connect to server</Toast>

					<Toast variant="warning">Low disk space detected</Toast>

					<Toast variant="info">System update available</Toast>
				</Box>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Toast without icon:</Text>
				<Toast variant="success" hasIcon={false}>
					Clean message without icon
				</Toast>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Interactive Toast:</Text>
				<Toast
					variant="info"
					isVisible={showSingleToast}
					duration={3000}
					onClose={() => {
						setShowSingleToast(false);
					}}
				>
					This toast will auto-close in 3 seconds
				</Toast>

				<Text dimColor>Press 's' to show interactive toast</Text>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Toast Manager Demo:</Text>
				<Text dimColor>
					Press keys to trigger toasts: 1=success, 2=error, 3=warning, 4=info,
					5=persistent
				</Text>
			</Box>

			{/* Toast Manager */}
			<ToastManager toasts={toasts} position="top" onDismiss={removeToast} />

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Interactive keys: s=show toast, 1=success, 2=error, 3=warning, 4=info,
					5=persistent
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
