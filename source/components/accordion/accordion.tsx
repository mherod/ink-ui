import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type AccordionItem = {
	/**
	 * Unique key for the accordion item.
	 */
	key: string;

	/**
	 * Title text for the accordion header.
	 */
	title: string;

	/**
	 * Content to display when expanded.
	 */
	content: React.ReactNode;

	/**
	 * Whether the item is disabled.
	 */
	isDisabled?: boolean;

	/**
	 * Whether the item is expanded by default.
	 */
	isDefaultExpanded?: boolean;

	/**
	 * Optional icon for the header.
	 */
	icon?: string;
};

export type AccordionProps = {
	/**
	 * Array of accordion items.
	 */
	readonly items: AccordionItem[];

	/**
	 * Callback when an item is expanded/collapsed.
	 */
	readonly onToggle?: (item: AccordionItem, isExpanded: boolean) => void;

	/**
	 * Whether multiple items can be expanded at once.
	 */
	readonly hasMultiple?: boolean;

	/**
	 * Whether to show borders around items.
	 */
	readonly hasBorders?: boolean;

	/**
	 * Whether to show expand/collapse icons.
	 */
	readonly hasIcons?: boolean;

	/**
	 * Controlled expanded items (array of keys).
	 */
	readonly expandedItems?: string[];

	/**
	 * Default expanded items (array of keys).
	 */
	readonly defaultExpandedItems?: string[];

	/**
	 * Size variant for the accordion.
	 */
	readonly size?: 'small' | 'medium' | 'large';
};

export function Accordion({
	items,
	onToggle,
	hasMultiple = false,
	hasBorders = true,
	hasIcons = true,
	expandedItems: controlledExpandedItems,
	defaultExpandedItems = [],
	size = 'medium',
}: AccordionProps) {
	const {styles, config} = useComponentTheme<Theme>('Accordion');
	const icons = config()?.icons as {
		expanded: string;
		collapsed: string;
	};

	const [internalExpandedItems, setInternalExpandedItems] = useState<
		Set<string>
	>(() => {
		const expanded = new Set<string>();
		// Add default expanded items
		for (const item of items) {
			if (item.isDefaultExpanded) {
				expanded.add(item.key);
			}
		}

		// Add explicitly provided default expanded items
		for (const key of defaultExpandedItems) {
			expanded.add(key);
		}

		return expanded;
	});

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [animatingItems, setAnimatingItems] = useState<
		Map<
			string,
			{targetHeight: number; currentHeight: number; isExpanding: boolean}
		>
	>(new Map());
	const animationTimersRef = useRef<
		Map<string, ReturnType<typeof setInterval>>
	>(new Map());

	const expandedItemsSet = useMemo(
		() =>
			controlledExpandedItems
				? new Set(controlledExpandedItems)
				: internalExpandedItems,
		[controlledExpandedItems, internalExpandedItems],
	);

	const updateExpandedItems = useCallback(
		(newExpandedItems: Set<string>) => {
			if (!controlledExpandedItems) {
				setInternalExpandedItems(newExpandedItems);
			}
		},
		[controlledExpandedItems],
	);

	const startAnimation = useCallback(
		(itemKey: string, isExpanding: boolean) => {
			const targetHeight = isExpanding ? 5 : 0;
			const currentHeight = isExpanding ? 0 : 5;

			setAnimatingItems(
				prev =>
					new Map(
						prev.set(itemKey, {
							targetHeight,
							currentHeight,
							isExpanding,
						}),
					),
			);

			const existingTimer = animationTimersRef.current.get(itemKey);
			if (existingTimer) {
				clearInterval(existingTimer);
			}

			const timer = setInterval(() => {
				setAnimatingItems(prev => {
					const current = prev.get(itemKey);
					if (!current) return prev;

					const newHeight = current.isExpanding
						? Math.min(current.currentHeight + 1, current.targetHeight)
						: Math.max(current.currentHeight - 1, current.targetHeight);

					if (newHeight === current.targetHeight) {
						clearInterval(timer);
						animationTimersRef.current.delete(itemKey);
						const newMap = new Map(prev);
						newMap.delete(itemKey);
						return newMap;
					}

					return new Map(
						prev.set(itemKey, {
							...current,
							currentHeight: newHeight,
						}),
					);
				});
			}, 100);

			animationTimersRef.current.set(itemKey, timer);
		},
		[],
	);

	const toggleItem = useCallback(
		(item: AccordionItem) => {
			if (item.isDisabled) return;

			const isCurrentlyExpanded = expandedItemsSet.has(item.key);
			const newExpanded = new Set(expandedItemsSet);

			if (isCurrentlyExpanded) {
				newExpanded.delete(item.key);
				startAnimation(item.key, false);
			} else {
				if (!hasMultiple) {
					for (const key of newExpanded) {
						if (key !== item.key) {
							startAnimation(key, false);
						}
					}

					newExpanded.clear();
				}

				newExpanded.add(item.key);
				startAnimation(item.key, true);
			}

			updateExpandedItems(newExpanded);
			onToggle?.(item, !isCurrentlyExpanded);
		},
		[
			expandedItemsSet,
			hasMultiple,
			updateExpandedItems,
			onToggle,
			startAnimation,
		],
	);

	const navigateAccordion = useCallback(
		(direction: 'up' | 'down') => {
			const enabledItems = items.filter(item => !item.isDisabled);
			if (enabledItems.length === 0) return;

			let nextIndex;
			if (direction === 'up') {
				nextIndex =
					selectedIndex > 0 ? selectedIndex - 1 : enabledItems.length - 1;
			} else {
				nextIndex =
					selectedIndex < enabledItems.length - 1 ? selectedIndex + 1 : 0;
			}

			setSelectedIndex(nextIndex);
		},
		[selectedIndex, items],
	);

	useEffect(() => {
		const timersRef = animationTimersRef.current;
		return () => {
			for (const timer of timersRef.values()) {
				clearInterval(timer);
			}
		};
	}, []);

	useInput((input, key) => {
		if (key.upArrow) {
			navigateAccordion('up');
		} else if (key.downArrow) {
			navigateAccordion('down');
		} else if (key.return || input === ' ') {
			const enabledItems = items.filter(item => !item.isDisabled);
			const selectedItem = enabledItems[selectedIndex];
			if (selectedItem) {
				toggleItem(selectedItem);
			}
		}
	});

	const renderAccordionItem = (item: AccordionItem) => {
		const isExpanded = expandedItemsSet.has(item.key);
		const animatingItem = animatingItems.get(item.key);
		const enabledItems = items.filter(enabledItem => !enabledItem.isDisabled);
		const enabledIndex = enabledItems.findIndex(
			enabledItem => enabledItem.key === item.key,
		);
		const isSelected = enabledIndex === selectedIndex;

		return (
			<Box
				key={item.key}
				{...styles.accordionItem({
					isExpanded,
					isDisabled: Boolean(item.isDisabled),
					hasBorders,
					size,
				})}
				flexDirection="column"
			>
				{/* Header */}
				<Box
					{...styles.accordionHeader({
						isExpanded,
						isDisabled: Boolean(item.isDisabled),
						isSelected,
						size,
					})}
					flexDirection="row"
					alignItems="center"
				>
					{hasIcons && (
						<Text
							{...styles.expandIcon({
								isExpanded,
								isDisabled: Boolean(item.isDisabled),
							})}
						>
							{isExpanded ? icons.expanded : icons.collapsed}
						</Text>
					)}

					{item.icon && (
						<Text
							{...styles.itemIcon({
								isDisabled: Boolean(item.isDisabled),
							})}
						>
							{item.icon}
						</Text>
					)}

					<Text
						{...styles.title({
							isExpanded,
							isDisabled: Boolean(item.isDisabled),
							isSelected,
						})}
					>
						{item.title}
					</Text>
				</Box>

				{/* Content */}
				{(isExpanded || animatingItem) && (
					<Box
						{...styles.accordionContent({
							size,
						})}
						flexDirection="column"
						height={animatingItem ? animatingItem.currentHeight : undefined}
						overflow="hidden"
					>
						{typeof item.content === 'string' ? (
							<Text {...styles.contentText()}>{item.content}</Text>
						) : (
							item.content
						)}
					</Box>
				)}
			</Box>
		);
	};

	return (
		<Box
			{...styles.container({
				hasBorders,
			})}
			flexDirection="column"
		>
			{items.map(item => renderAccordionItem(item))}
		</Box>
	);
}
