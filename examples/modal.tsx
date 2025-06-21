/**
 * Run this example:
 *   npm run example examples/modal.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text, useInput} from 'ink';
import {Modal, ConfirmDialog, Badge} from '../source/index.js';

function Example() {
	const [showBasicModal, setShowBasicModal] = useState(false);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [showDestructiveDialog, setShowDestructiveDialog] = useState(false);
	const [lastAction, setLastAction] = useState('');

	useInput(input => {
		switch (input) {
			case '1': {
				setShowBasicModal(true);

				break;
			}

			case '2': {
				setShowConfirmDialog(true);

				break;
			}

			case '3': {
				setShowDestructiveDialog(true);

				break;
			}

			default: {
				// No action for other keys
				break;
			}
		}
	});

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Modal & Dialog Examples
			</Text>

			<Box flexDirection="column" gap={1}>
				<Text bold>Available Examples:</Text>
				<Text>Press '1' for Basic Modal</Text>
				<Text>Press '2' for Confirm Dialog</Text>
				<Text>Press '3' for Destructive Dialog</Text>
			</Box>

			{lastAction && (
				<Box>
					<Text>Last action: </Text>
					<Badge color="green">{lastAction}</Badge>
				</Box>
			)}

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Press Escape to close modals, Enter to confirm dialogs
				</Text>
			</Box>

			{/* Basic Modal */}
			<Modal
				isOpen={showBasicModal}
				title="User Profile"
				width={60}
				onClose={() => {
					setShowBasicModal(false);
				}}
			>
				<Box flexDirection="column" gap={2}>
					<Box flexDirection="column" gap={1}>
						<Text bold>Personal Information</Text>
						<Text>Name: John Doe</Text>
						<Text>Email: john.doe@example.com</Text>
						<Text>Role: Developer</Text>
					</Box>

					<Box flexDirection="column" gap={1}>
						<Text bold>Account Status</Text>
						<Box gap={1}>
							<Text>Status:</Text>
							<Badge color="green">Active</Badge>
						</Box>
						<Text>Last login: 2 hours ago</Text>
					</Box>

					<Box borderTop paddingTop={1} marginTop={1}>
						<Text dimColor>Press Escape to close this modal</Text>
					</Box>
				</Box>
			</Modal>

			{/* Confirm Dialog */}
			<ConfirmDialog
				isOpen={showConfirmDialog}
				title="Save Changes"
				message="Do you want to save your changes before closing?"
				confirmText="Save"
				cancelText="Discard"
				onConfirm={() => {
					setLastAction('Changes saved');
					setShowConfirmDialog(false);
				}}
				onCancel={() => {
					setLastAction('Changes discarded');
					setShowConfirmDialog(false);
				}}
			/>

			{/* Destructive Dialog */}
			<ConfirmDialog
				isOpen={showDestructiveDialog}
				title="Delete Account"
				message="Are you sure you want to delete your account? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
				variant="destructive"
				onConfirm={() => {
					setLastAction('Account deleted');
					setShowDestructiveDialog(false);
				}}
				onCancel={() => {
					setLastAction('Deletion cancelled');
					setShowDestructiveDialog(false);
				}}
			/>
		</Box>
	);
}

render(<Example />);
