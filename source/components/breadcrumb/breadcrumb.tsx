import React from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type BreadcrumbItem = {
	/**
	 * Display text for the breadcrumb item.
	 */
	label: string;

	/**
	 * URL or path for the breadcrumb item.
	 */
	href?: string;

	/**
	 * Whether the item is clickable.
	 */
	isClickable?: boolean;

	/**
	 * Icon to display before the label.
	 */
	icon?: string;
};

export type BreadcrumbProps = {
	/**
	 * Array of breadcrumb items.
	 */
	readonly items: BreadcrumbItem[];

	/**
	 * Callback when a breadcrumb item is clicked.
	 */
	readonly onItemClick?: (item: BreadcrumbItem, index: number) => void;

	/**
	 * Custom separator between breadcrumb items.
	 */
	readonly separator?: string;

	/**
	 * Maximum number of items to show before truncation.
	 */
	readonly maxItems?: number;

	/**
	 * Whether to show icons.
	 */
	readonly hasIcons?: boolean;

	/**
	 * Size variant for the breadcrumb.
	 */
	readonly size?: 'small' | 'medium' | 'large';

	/**
	 * Whether to show the current item differently.
	 */
	readonly hasCurrentHighlight?: boolean;
};

export function Breadcrumb({
	items,
	separator,
	maxItems,
	hasIcons = true,
	size = 'medium',
	hasCurrentHighlight = true,
}: BreadcrumbProps) {
	const {styles, config} = useComponentTheme<Theme>('Breadcrumb');
	const defaultSeparator = config()?.separator;

	const separatorChar = separator ?? defaultSeparator;

	const processedItems = React.useMemo(() => {
		if (!maxItems || items.length <= maxItems) {
			return items;
		}

		// Show first item, ellipsis, and last (maxItems - 2) items
		const ellipsisItem: BreadcrumbItem = {
			label: '...',
			isClickable: false,
		};

		const keepCount = maxItems - 2; // Reserve space for first item and ellipsis
		const firstItem = items[0];
		const lastItems = items.slice(-keepCount);

		if (!firstItem) return items;

		return [firstItem, ellipsisItem, ...lastItems];
	}, [items, maxItems]);

	const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
		const isLast = index === processedItems.length - 1;
		const isEllipsis = item.label === '...';

		return (
			<Box key={index} flexDirection="row" alignItems="center">
				<Box
					{...styles.breadcrumbItem({
						isLast,
						isClickable: item.isClickable !== false && !isEllipsis,
						isEllipsis,
						size,
						hasCurrentHighlight,
					})}
					flexDirection="row"
					alignItems="center"
				>
					{hasIcons && item.icon && (
						<Text {...styles.itemIcon({size})}>{item.icon}</Text>
					)}

					<Text
						{...styles.itemText({
							isLast,
							isClickable: item.isClickable !== false && !isEllipsis,
							isEllipsis,
							size,
							hasCurrentHighlight,
						})}
					>
						{item.label}
					</Text>
				</Box>

				{!isLast && <Text {...styles.separator({size})}>{separatorChar}</Text>}
			</Box>
		);
	};

	return (
		<Box
			{...styles.container({size})}
			flexDirection="row"
			alignItems="center"
			flexWrap="wrap"
		>
			{processedItems.map((item, index) => renderBreadcrumbItem(item, index))}
		</Box>
	);
}
