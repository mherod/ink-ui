import React from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';
import {type TableColumn} from './table.js';

export type TableColumnComponentProps<T = any> = {
	/**
	 * Column definition.
	 */
	readonly column: TableColumn<T>;

	/**
	 * The value to display in this column.
	 */
	readonly value: any;

	/**
	 * The complete record object.
	 */
	readonly record: T;

	/**
	 * Row index.
	 */
	readonly index: number;

	/**
	 * Whether this is a header cell.
	 */
	readonly isHeader?: boolean;

	/**
	 * Pre-calculated width for this column.
	 */
	readonly width: number;
};

export function TableColumnComponent<T = any>({
	column,
	value,
	record,
	index,
	isHeader = false,
	width,
}: TableColumnComponentProps<T>) {
	const {styles} = useComponentTheme<Theme>('Table');
	const cellStyle = isHeader ? styles.headerCell() : styles.cell();

	let content: React.ReactNode;
	if (isHeader) {
		content = column.title;
	} else if (column.render) {
		content = column.render(value, record, index);
	} else if (value === null || value === undefined) {
		content = '';
	} else if (typeof value === 'string') {
		// Show at least 100 characters for long strings
		const maxLength = Math.max(100, width - 4);
		content =
			value.length > maxLength ? value.slice(0, maxLength - 3) + '...' : value;
	} else if (typeof value === 'object') {
		if (Array.isArray(value)) {
			content = `[${value.length} items]`;
		} else {
			const keys = Object.keys(value as Record<string, unknown>);
			content =
				keys.length === 0
					? '{}'
					: `{${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''}}`;
		}
	} else {
		content = String(value);
	}

	const justifyContent =
		column.align === 'center'
			? 'center'
			: column.align === 'left'
				? 'flex-start'
				: 'flex-end';

	// Check if content is a React component or string
	const isReactComponent = React.isValidElement(content);

	return (
		<Box
			width={width}
			height={1}
			justifyContent={justifyContent}
			alignItems="center"
			paddingLeft={1}
			paddingRight={1}
			{...cellStyle}
		>
			{isReactComponent ? content : <Text>{content}</Text>}
		</Box>
	);
}
