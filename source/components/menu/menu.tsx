import React, {useState, useCallback} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type MenuItem = {
	/**
	 * Unique key for the menu item.
	 */
	key: string;

	/**
	 * Menu item label text.
	 */
	label: string;

	/**
	 * Whether the menu item is disabled.
	 */
	isDisabled?: boolean;

	/**
	 * Icon to display before the label.
	 */
	icon?: string;

	/**
	 * Submenu items.
	 */
	children?: MenuItem[];

	/**
	 * Whether this item acts as a separator.
	 */
	isSeparator?: boolean;
};

export type MenuProps = {
	/**
	 * Array of menu items.
	 */
	readonly items: MenuItem[];

	/**
	 * Callback when a menu item is selected.
	 */
	readonly onSelect?: (item: MenuItem) => void;

	/**
	 * Default selected item key.
	 */
	readonly defaultSelectedKey?: string;

	/**
	 * Controlled selected item key.
	 */
	readonly selectedKey?: string;

	/**
	 * Whether the menu has borders.
	 */
	readonly hasBorders?: boolean;

	/**
	 * Whether to show icons.
	 */
	readonly hasIcons?: boolean;
};

export function Menu({
	items,
	onSelect,
	defaultSelectedKey,
	selectedKey: controlledSelectedKey,
	hasBorders = true,
	hasIcons = true,
}: MenuProps) {
	const {styles, config} = useComponentTheme<Theme>('Menu');
	const {icons} = config();

	const [internalSelectedKey, setInternalSelectedKey] = useState(
		defaultSelectedKey ?? items[0]?.key ?? '',
	);

	const selectedKey = controlledSelectedKey ?? internalSelectedKey;

	const handleItemSelect = useCallback(
		(item: MenuItem) => {
			if (Boolean(item.isDisabled) || Boolean(item.isSeparator)) return;

			if (!controlledSelectedKey) {
				setInternalSelectedKey(item.key);
			}

			onSelect?.(item);
		},
		[controlledSelectedKey, onSelect],
	);

	const navigateMenu = useCallback(
		(direction: 'up' | 'down') => {
			const selectableItems = items.filter(
				item => !item.isDisabled && !item.isSeparator,
			);
			const currentSelectableIndex = selectableItems.findIndex(
				item => item.key === selectedKey,
			);

			if (currentSelectableIndex === -1) return;

			let nextIndex;
			if (direction === 'up') {
				nextIndex =
					currentSelectableIndex === 0
						? selectableItems.length - 1
						: currentSelectableIndex - 1;
			} else {
				nextIndex =
					currentSelectableIndex === selectableItems.length - 1
						? 0
						: currentSelectableIndex + 1;
			}

			const nextItem = selectableItems[nextIndex];
			if (nextItem && !controlledSelectedKey) {
				setInternalSelectedKey(nextItem.key);
			}
		},
		[selectedKey, items, controlledSelectedKey],
	);

	useInput((input, key) => {
		if (key.upArrow) {
			navigateMenu('up');
		} else if (key.downArrow) {
			navigateMenu('down');
		} else if (key.return || input === ' ') {
			const selectedItem = items.find(item => item.key === selectedKey);
			if (selectedItem) {
				handleItemSelect(selectedItem);
			}
		}
	});

	const renderMenuItem = (item: MenuItem) => {
		if (item.isSeparator) {
			return (
				<Box key={item.key} {...styles.separator()}>
					<Text {...styles.separatorText()}>
						{item.label ?? '─'.repeat(20)}
					</Text>
				</Box>
			);
		}

		const isSelected = item.key === selectedKey;
		const {isDisabled} = item;

		return (
			<Box
				key={item.key}
				{...styles.menuItem({
					isSelected,
					isDisabled: Boolean(isDisabled),
				})}
			>
				{hasIcons && (
					<Text {...styles.icon({isSelected, isDisabled: Boolean(isDisabled)})}>
						{item.icon ?? (isSelected ? icons.selected : icons.unselected)}
					</Text>
				)}
				<Text
					{...styles.label({
						isSelected,
						isDisabled: Boolean(isDisabled),
					})}
				>
					{item.label}
				</Text>
				{item.children && (
					<Text {...styles.submenuIndicator()}>{icons.submenu}</Text>
				)}
			</Box>
		);
	};

	return (
		<Box
			{...styles.container()}
			borderStyle={hasBorders ? 'single' : undefined}
			flexDirection="column"
		>
			{items.map(item => renderMenuItem(item))}
		</Box>
	);
}
