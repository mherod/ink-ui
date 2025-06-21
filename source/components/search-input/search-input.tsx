import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type SearchResult = {
	/**
	 * Unique identifier for the result.
	 */
	id: string;

	/**
	 * Display text for the result.
	 */
	label: string;

	/**
	 * Optional subtitle or description.
	 */
	description?: string;

	/**
	 * Optional category for grouping.
	 */
	category?: string;

	/**
	 * Additional data associated with the result.
	 */
	data?: unknown;
};

export type SearchInputProps = {
	/**
	 * Callback when search value changes.
	 */
	readonly onSearch?: (query: string) => void;

	/**
	 * Callback when a result is selected.
	 */
	readonly onSelect?: (result: SearchResult) => void;

	/**
	 * Search results to display.
	 */
	readonly results?: SearchResult[];

	/**
	 * Whether to show results immediately.
	 */
	readonly hasInstantResults?: boolean;

	/**
	 * Minimum characters before showing results.
	 */
	readonly minSearchLength?: number;

	/**
	 * Maximum number of results to show.
	 */
	readonly maxResults?: number;

	/**
	 * Placeholder text.
	 */
	readonly placeholder?: string;

	/**
	 * Whether the input is disabled.
	 */
	readonly isDisabled?: boolean;

	/**
	 * Default search value.
	 */
	readonly defaultValue?: string;

	/**
	 * Controlled search value.
	 */
	readonly value?: string;

	/**
	 * Whether to highlight matching text.
	 */
	readonly hasHighlight?: boolean;

	/**
	 * Whether to show search icon.
	 */
	readonly hasSearchIcon?: boolean;

	/**
	 * Whether to show clear button when text is entered.
	 */
	readonly hasClearButton?: boolean;

	/**
	 * Label for the search input.
	 */
	readonly label?: string;

	/**
	 * Whether to group results by category.
	 */
	readonly hasGrouping?: boolean;

	/**
	 * Custom filter function for results.
	 */
	readonly filterFunction?: (
		results: SearchResult[],
		query: string,
	) => SearchResult[];
};

export function SearchInput({
	onSearch,
	onSelect,
	results = [],
	hasInstantResults = true,
	minSearchLength = 1,
	maxResults = 10,
	placeholder = 'Search...',
	isDisabled = false,
	defaultValue = '',
	value: controlledValue,
	hasHighlight = true,
	hasSearchIcon = true,
	hasClearButton = true,
	label,
	hasGrouping = false,
	filterFunction,
}: SearchInputProps) {
	const {styles, config} = useComponentTheme<Theme>('SearchInput');
	const icons = config()?.icons as {
		search: string;
		clear: string;
		result: string;
		category: string;
	};

	const [internalValue, setInternalValue] = useState(defaultValue);
	const [selectedResultIndex, setSelectedResultIndex] = useState(0);
	const [isShowingResults, setIsShowingResults] = useState(false);

	const searchValue = controlledValue ?? internalValue;

	const filteredResults = useMemo(() => {
		if (!searchValue || searchValue.length < minSearchLength) {
			return [];
		}

		let filtered: SearchResult[];

		if (filterFunction) {
			filtered = filterFunction(results, searchValue);
		} else {
			// Default filter: case-insensitive search in label and description
			const query = searchValue.toLowerCase();
			filtered = results.filter(
				result =>
					result.label.toLowerCase().includes(query) ||
					result.description?.toLowerCase().includes(query),
			);
		}

		return filtered.slice(0, maxResults);
	}, [results, searchValue, minSearchLength, maxResults, filterFunction]);

	const groupedResults = useMemo(() => {
		if (!hasGrouping) {
			return {ungrouped: filteredResults};
		}

		const groups: Record<string, SearchResult[]> = {};
		for (const result of filteredResults) {
			const category = result.category ?? 'Other';
			if (!groups[category]) {
				groups[category] = [];
			}

			groups[category].push(result);
		}

		return groups;
	}, [filteredResults, hasGrouping]);

	// Flatten grouped results for navigation
	const flatResults = useMemo(() => {
		if (!hasGrouping) {
			return filteredResults;
		}

		return Object.values(groupedResults).flat();
	}, [filteredResults, groupedResults, hasGrouping]);

	useEffect(() => {
		if (hasInstantResults && searchValue.length >= minSearchLength) {
			setIsShowingResults(true);
			setSelectedResultIndex(0);
		} else {
			setIsShowingResults(false);
		}
	}, [searchValue, hasInstantResults, minSearchLength]);

	useEffect(() => {
		onSearch?.(searchValue);
	}, [searchValue, onSearch]);

	const updateValue = useCallback(
		(newValue: string) => {
			if (!controlledValue) {
				setInternalValue(newValue);
			}
		},
		[controlledValue],
	);

	const clearSearch = useCallback(() => {
		updateValue('');
		setIsShowingResults(false);
		setSelectedResultIndex(0);
	}, [updateValue]);

	const selectResult = useCallback(
		(result: SearchResult) => {
			onSelect?.(result);
			updateValue(result.label);
			setIsShowingResults(false);
		},
		[onSelect, updateValue],
	);

	const highlightMatch = useCallback(
		(text: string, query: string) => {
			if (!hasHighlight || !query) return text;

			const regex = new RegExp(`(${query})`, 'gi');
			return text.replace(regex, '[$1]'); // Wrap matches in brackets for highlighting
		},
		[hasHighlight],
	);

	useInput((input, key) => {
		if (isDisabled) return;

		if (isShowingResults && filteredResults.length > 0) {
			if (key.upArrow) {
				setSelectedResultIndex(
					selectedResultIndex > 0
						? selectedResultIndex - 1
						: flatResults.length - 1,
				);
			} else if (key.downArrow) {
				setSelectedResultIndex(
					selectedResultIndex < flatResults.length - 1
						? selectedResultIndex + 1
						: 0,
				);
			} else if (key.return || input === ' ') {
				const selectedResult = flatResults[selectedResultIndex];
				if (selectedResult) {
					selectResult(selectedResult);
				}
			} else if (key.escape) {
				setIsShowingResults(false);
			}
		} else if (key.return && searchValue.length >= minSearchLength) {
			setIsShowingResults(true);
			setSelectedResultIndex(0);
		} else if (key.escape) {
			clearSearch();
		}

		// Handle text input
		if (!key.upArrow && !key.downArrow && !key.return && !key.escape) {
			if (key.backspace || key.delete) {
				const newValue = searchValue.slice(0, -1);
				updateValue(newValue);
			} else if (input && input.length === 1) {
				const newValue = searchValue + input;
				updateValue(newValue);
			}
		}
	});

	const renderResults = () => {
		if (!isShowingResults || filteredResults.length === 0) {
			return null;
		}

		let resultIndex = 0;

		return (
			<Box
				{...styles.resultsContainer()}
				flexDirection="column"
				borderStyle="single"
				marginTop={1}
			>
				{hasGrouping
					? Object.entries(groupedResults).map(
							([category, categoryResults]) => (
								<Box key={category} flexDirection="column">
									<Text {...styles.categoryHeader()}>
										{icons.category} {category}
									</Text>
									{categoryResults.map(result => {
										const isSelected = resultIndex === selectedResultIndex;
										resultIndex++;
										return (
											<Box key={result.id} flexDirection="column">
												<Text
													{...styles.resultItem({
														isSelected,
													})}
												>
													{icons.result}{' '}
													{highlightMatch(result.label, searchValue)}
												</Text>
												{result.description && (
													<Text {...styles.resultDescription()}>
														{highlightMatch(result.description, searchValue)}
													</Text>
												)}
											</Box>
										);
									})}
								</Box>
							),
						)
					: filteredResults.map((result, index) => {
							const isSelected = index === selectedResultIndex;
							return (
								<Box key={result.id} flexDirection="column">
									<Text
										{...styles.resultItem({
											isSelected,
										})}
									>
										{icons.result} {highlightMatch(result.label, searchValue)}
									</Text>
									{result.description && (
										<Text {...styles.resultDescription()}>
											{highlightMatch(result.description, searchValue)}
										</Text>
									)}
								</Box>
							);
						})}

				<Box marginTop={1}>
					<Text {...styles.resultsFooter()}>
						↑↓ navigate, Enter to select, Esc to close
					</Text>
				</Box>
			</Box>
		);
	};

	return (
		<Box {...styles.container()} flexDirection="column">
			{label && <Text {...styles.label()}>{label}</Text>}

			<Box
				{...styles.inputContainer({
					isDisabled,
					isActive: isShowingResults,
				})}
				flexDirection="row"
				alignItems="center"
			>
				{hasSearchIcon && (
					<Text {...styles.searchIcon({isDisabled})}>{icons.search}</Text>
				)}

				<Text
					{...styles.input({
						isDisabled,
						hasValue: searchValue.length > 0,
					})}
				>
					{searchValue || placeholder}
				</Text>

				{hasClearButton && searchValue.length > 0 && !isDisabled && (
					<Text {...styles.clearButton()}>{icons.clear}</Text>
				)}
			</Box>

			{renderResults()}
		</Box>
	);
}
