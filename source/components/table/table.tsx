import React from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type TableColumn<T = any> = {
	/**
	 * Unique key for the column.
	 */
	key: string;

	/**
	 * Column header text.
	 */
	title: string;

	/**
	 * Width of the column. Can be a number (fixed width) or 'auto'.
	 */
	width?: number | 'auto';

	/**
	 * Text alignment for the column.
	 */
	align?: 'left' | 'center' | 'right';

	/**
	 * Function to render the cell content.
	 */
	render?: (value: any, record: T, index: number) => React.ReactNode;
};

export type TableProps<T = any> = {
	/**
	 * Array of column definitions.
	 */
	readonly columns: Array<TableColumn<T>>;

	/**
	 * Array of data objects to display.
	 */
	readonly data: T[];

	/**
	 * Whether to show table borders.
	 */
	readonly isBordered?: boolean;

	/**
	 * Whether to show zebra striping.
	 */
	readonly isStriped?: boolean;

	/**
	 * Whether to make the table compact.
	 */
	readonly isCompact?: boolean;
};

export function Table<T = any>({
	columns,
	data,
	isBordered = true,
	isStriped = false,
	isCompact = false,
}: TableProps<T>) {
	const {styles} = useComponentTheme<Theme>('Table');

	const getColumnWidth = (column: TableColumn<T>, totalWidth: number) => {
		if (column.width === 'auto') {
			const fixedColumns = columns.filter(col => typeof col.width === 'number');
			const fixedWidth = fixedColumns.reduce(
				(sum, col) => sum + (col.width as number),
				0,
			);
			const autoColumns = columns.filter(col => col.width === 'auto').length;
			return Math.floor((totalWidth - fixedWidth) / autoColumns);
		}

		return column.width ?? 12;
	};

	const totalWidth = 60; // Default table width

	const renderCell = (
		column: TableColumn<T>,
		value: any,
		record: T,
		index: number,
	) => {
		const width = getColumnWidth(column, totalWidth);
		const content = column.render
			? column.render(value, record, index)
			: String(value ?? '');
		const stringContent = String(content ?? '');

		// Truncate if too long
		const truncated =
			stringContent.length > width
				? stringContent.slice(0, width - 3) + '...'
				: stringContent;

		// Pad to width
		const padded = truncated.padEnd(width);

		return (
			<Text {...styles.cell()} key={column.key}>
				{padded}
			</Text>
		);
	};

	const renderRow = (record: T, rowIndex: number, isHeader = false) => {
		const rowStyle = isHeader
			? styles.headerRow()
			: styles.dataRow({isEven: rowIndex % 2 === 0, striped: isStriped});

		return (
			<Box key={isHeader ? 'header' : rowIndex} {...rowStyle}>
				{columns.map(column => {
					const value = isHeader ? column.title : record[column.key as keyof T];
					return renderCell(column, value, record, rowIndex);
				})}
			</Box>
		);
	};

	const borderStyle = isBordered ? 'single' : undefined;

	return (
		<Box
			{...styles.container({bordered: isBordered, compact: isCompact})}
			borderStyle={borderStyle}
			flexDirection="column"
		>
			{/* Header */}
			{renderRow({} as T, -1, true)}

			{/* Data rows */}
			{data.map((record, index) => renderRow(record, index))}
		</Box>
	);
}
