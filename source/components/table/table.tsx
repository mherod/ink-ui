import React from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';
import {TableColumnComponent} from './table-column.js';

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

	// Calculate minimum width needed for each column based on content
	const calculateMinColumnWidth = (column: TableColumn<T>) => {
		let maxWidth = column.title.length + 4; // Header width + padding (1 on each side + 2 extra)

		// Check all data rows for this column
		for (const record of data) {
			const value = record[column.key as keyof T];
			let contentLength: number;

			if (column.render) {
				const rendered = column.render(value, record, 0);
				contentLength = React.isValidElement(rendered)
					? String(value).length
					: String(rendered).length;
			} else if (value === null || value === undefined) {
				contentLength = 0;
			} else if (typeof value === 'object') {
				if (Array.isArray(value)) {
					contentLength = `[${value.length} items]`.length;
				} else {
					const keys = Object.keys(value);
					contentLength =
						keys.length === 0
							? 2
							: `{${keys.slice(0, 2).join(', ')}${keys.length > 2 ? '...' : ''}}`
									.length;
				}
			} else {
				contentLength = String(value).length;
			}

			maxWidth = Math.max(maxWidth, contentLength + 4); // Content + padding (1 on each side + 2 extra)
		}

		return Math.max(4, maxWidth); // Minimum 4 characters
	};

	// Calculate column widths based on content or explicit width
	const getColumnWidth = (column: TableColumn<T>) => {
		if (column.width === 'auto') {
			return calculateMinColumnWidth(column);
		}

		const explicitWidth = column.width ?? 12;
		const minNeeded = calculateMinColumnWidth(column);

		return Math.max(explicitWidth, minNeeded);
	};

	const renderHeaderSeparator = () => {
		if (!isBordered) return null;

		return (
			<Box flexDirection="row">
				{columns.map((column, index) => {
					const width = getColumnWidth(column);
					const isLast = index === columns.length - 1;

					return (
						<Box key={`sep-${column.key}`} width={width}>
							<Text>
								{index === 0 ? '├' : ''}
								{'─'.repeat(width - (index === 0 ? 1 : 0) - (isLast ? 1 : 1))}
								{isLast ? '┤' : '┼'}
							</Text>
						</Box>
					);
				})}
			</Box>
		);
	};

	const renderRow = (record: T, rowIndex: number, isHeader = false) => {
		const rowStyle = isHeader
			? styles.headerRow()
			: styles.dataRow({isEven: rowIndex % 2 === 0, striped: isStriped});

		const row = (
			<Box
				key={isHeader ? 'header' : rowIndex}
				{...rowStyle}
				flexDirection="row"
				height={1}
			>
				{columns.map(column => {
					const value = isHeader ? column.title : record[column.key as keyof T];

					return (
						<TableColumnComponent
							key={column.key}
							column={column}
							value={value}
							record={record}
							index={rowIndex}
							isHeader={isHeader}
							width={getColumnWidth(column)}
						/>
					);
				})}
			</Box>
		);

		if (isHeader) {
			return (
				<>
					{row}
					{renderHeaderSeparator()}
				</>
			);
		}

		return row;
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
