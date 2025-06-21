import React, {useState, useCallback} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type TabItem = {
	/**
	 * Unique key for the tab.
	 */
	key: string;

	/**
	 * Tab label text.
	 */
	label: string;

	/**
	 * Tab content to render when active.
	 */
	children: React.ReactNode;

	/**
	 * Whether the tab is disabled.
	 */
	disabled?: boolean;
};

export type TabsProps = {
	/**
	 * Array of tab items.
	 */
	readonly items: TabItem[];

	/**
	 * Default active tab key.
	 */
	readonly defaultActiveKey?: string;

	/**
	 * Controlled active tab key.
	 */
	readonly activeKey?: string;

	/**
	 * Callback when tab changes.
	 */
	readonly onChange?: (activeKey: string) => void;

	/**
	 * Whether to make tabs fullWidth.
	 */
	readonly isFullWidth?: boolean;
};

export function Tabs({
	items,
	defaultActiveKey,
	activeKey: controlledActiveKey,
	onChange,
	isFullWidth = false,
}: TabsProps) {
	const {styles} = useComponentTheme<Theme>('Tabs');

	const [internalActiveKey, setInternalActiveKey] = useState(
		defaultActiveKey ?? items[0]?.key ?? '',
	);

	const activeKey = controlledActiveKey ?? internalActiveKey;

	const handleTabChange = useCallback(
		(newActiveKey: string) => {
			if (!controlledActiveKey) {
				setInternalActiveKey(newActiveKey);
			}

			onChange?.(newActiveKey);
		},
		[controlledActiveKey, onChange],
	);

	const navigateTab = useCallback(
		(direction: 'left' | 'right') => {
			const enabledItems = items.filter(item => !item.disabled);
			const currentEnabledIndex = enabledItems.findIndex(
				item => item.key === activeKey,
			);

			if (currentEnabledIndex === -1) return;

			let nextIndex;
			if (direction === 'left') {
				nextIndex =
					currentEnabledIndex === 0
						? enabledItems.length - 1
						: currentEnabledIndex - 1;
			} else {
				nextIndex =
					currentEnabledIndex === enabledItems.length - 1
						? 0
						: currentEnabledIndex + 1;
			}

			const nextTab = enabledItems[nextIndex];
			if (nextTab) {
				handleTabChange(nextTab.key);
			}
		},
		[activeKey, items, handleTabChange],
	);

	useInput((_input, key) => {
		if (key.leftArrow) {
			navigateTab('left');
		} else if (key.rightArrow) {
			navigateTab('right');
		} else if (key.tab) {
			navigateTab('right');
		}
	});

	const activeItem = items.find(item => item.key === activeKey);

	return (
		<Box {...styles.container()} flexDirection="column">
			{/* Tab headers */}
			<Box {...styles.tabList()}>
				{items.map(item => {
					const isActive = item.key === activeKey;
					const isDisabled = item.disabled;

					return (
						<Box
							key={item.key}
							{...styles.tab({
								isActive,
								isDisabled: Boolean(isDisabled),
								fullWidth: isFullWidth,
							})}
						>
							<Text
								{...styles.tabLabel({
									isActive,
									isDisabled: Boolean(isDisabled),
								})}
							>
								{item.label}
							</Text>
						</Box>
					);
				})}
			</Box>

			{/* Tab content */}
			<Box {...styles.tabContent()}>{activeItem?.children}</Box>
		</Box>
	);
}
