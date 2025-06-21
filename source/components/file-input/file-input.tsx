import React, {useState, useCallback, useEffect} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type FileInputProps = {
	/**
	 * Callback when files are selected.
	 */
	readonly onFilesChange?: (files: string[]) => void;

	/**
	 * Label for the file input.
	 */
	readonly label?: string;

	/**
	 * Placeholder text when no files are selected.
	 */
	readonly placeholder?: string;

	/**
	 * Whether to allow multiple file selection.
	 */
	readonly hasMultiple?: boolean;

	/**
	 * File extensions to accept (e.g., ['.txt', '.js', '.json']).
	 */
	readonly acceptedExtensions?: string[];

	/**
	 * Whether the file input is disabled.
	 */
	readonly isDisabled?: boolean;

	/**
	 * Current working directory for file browsing.
	 */
	readonly currentDirectory?: string;

	/**
	 * Whether to show hidden files.
	 */
	readonly hasHiddenFiles?: boolean;

	/**
	 * Maximum number of files that can be selected.
	 */
	readonly maxFiles?: number;

	/**
	 * Default selected files.
	 */
	readonly defaultFiles?: string[];

	/**
	 * Controlled selected files.
	 */
	readonly files?: string[];
};

export function FileInput({
	onFilesChange,
	label,
	placeholder = 'Press Enter to browse files...',
	hasMultiple = false,
	acceptedExtensions,
	isDisabled = false,
	currentDirectory = '/current/directory',
	hasHiddenFiles = false,
	maxFiles,
	defaultFiles = [],
	files: controlledFiles,
}: FileInputProps) {
	const {styles, config} = useComponentTheme<Theme>('FileInput');
	const icons = config()?.icons as {
		folder: string;
		file: string;
		selectedFile: string;
		back: string;
	};

	const [internalFiles, setInternalFiles] = useState<string[]>(defaultFiles);
	const [isBrowsing, setIsBrowsing] = useState(false);
	const [browserDirectory, setBrowserDirectory] = useState(currentDirectory);
	const [availableFiles, setAvailableFiles] = useState<string[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const selectedFiles = controlledFiles ?? internalFiles;

	const updateFiles = useCallback(
		(newFiles: string[]) => {
			if (!controlledFiles) {
				setInternalFiles(newFiles);
			}

			onFilesChange?.(newFiles);
		},
		[controlledFiles, onFilesChange],
	);

	const loadDirectoryContents = useCallback(async () => {
		try {
			// In a real implementation, you would use fs.readdir here
			// For this demo, we'll simulate with some mock files
			const mockFiles = [
				'../parent-directory',
				'package.json',
				'README.md',
				'src/',
				'dist/',
				'node_modules/',
				'tsconfig.json',
				'.gitignore',
				'.env',
				'components/',
				'utils.ts',
				'types.ts',
				'theme.tsx',
			];

			let filteredFiles = mockFiles;

			if (!hasHiddenFiles) {
				filteredFiles = filteredFiles.filter(file => !file.startsWith('.'));
			}

			if (acceptedExtensions) {
				filteredFiles = filteredFiles.filter(
					file =>
						file.endsWith('/') ||
						file === '../parent-directory' ||
						acceptedExtensions.some(ext => file.endsWith(ext)),
				);
			}

			setAvailableFiles(filteredFiles);
			setSelectedIndex(0);
		} catch (error) {
			console.error('Error loading directory:', error);
		}
	}, [browserDirectory, hasHiddenFiles, acceptedExtensions]);

	useEffect(() => {
		if (isBrowsing) {
			void loadDirectoryContents();
		}
	}, [isBrowsing, loadDirectoryContents]);

	const toggleBrowsing = useCallback(() => {
		if (isDisabled) return;
		setIsBrowsing(!isBrowsing);
	}, [isDisabled, isBrowsing]);

	const selectFile = useCallback(
		(filePath: string) => {
			if (filePath === '../parent-directory') {
				// Navigate to parent directory
				const parentPath = browserDirectory.split('/').slice(0, -1).join('/');
				setBrowserDirectory(parentPath || '/');
				return;
			}

			if (filePath.endsWith('/')) {
				// Navigate into directory
				setBrowserDirectory(`${browserDirectory}/${filePath.slice(0, -1)}`);
				return;
			}

			// Select file
			const fullPath = `${browserDirectory}/${filePath}`;

			if (hasMultiple) {
				const newFiles = selectedFiles.includes(fullPath)
					? selectedFiles.filter(f => f !== fullPath)
					: [...selectedFiles, fullPath];

				if (maxFiles && newFiles.length > maxFiles) {
					return; // Don't exceed max files
				}

				updateFiles(newFiles);
			} else {
				updateFiles([fullPath]);
				setIsBrowsing(false);
			}
		},
		[browserDirectory, hasMultiple, maxFiles, selectedFiles, updateFiles],
	);

	const removeFile = useCallback(
		(filePath: string) => {
			const newFiles = selectedFiles.filter(f => f !== filePath);
			updateFiles(newFiles);
		},
		[selectedFiles, updateFiles],
	);

	useInput((input, key) => {
		if (isDisabled) return;

		if (isBrowsing) {
			if (key.upArrow) {
				setSelectedIndex(
					selectedIndex > 0 ? selectedIndex - 1 : availableFiles.length - 1,
				);
			} else if (key.downArrow) {
				setSelectedIndex(
					selectedIndex < availableFiles.length - 1 ? selectedIndex + 1 : 0,
				);
			} else if (key.return || input === ' ') {
				const selectedFile = availableFiles[selectedIndex];
				if (selectedFile) {
					selectFile(selectedFile);
				}
			} else if (key.escape) {
				setIsBrowsing(false);
			} else if (input === 'x' && hasMultiple) {
				// Remove selected files when browsing
				const selectedFile = availableFiles[selectedIndex];
				if (selectedFile && !selectedFile.endsWith('/')) {
					const fullPath = `${browserDirectory}/${selectedFile}`;
					removeFile(fullPath);
				}
			}
		} else if (key.return || input === ' ') {
			toggleBrowsing();
		}
	});

	const renderFileBrowser = () => {
		if (!isBrowsing) return null;

		return (
			<Box
				{...styles.browser()}
				flexDirection="column"
				borderStyle="single"
				padding={1}
			>
				<Text {...styles.browserHeader()}>
					Browse Files: {browserDirectory}
				</Text>

				<Box flexDirection="column" marginTop={1}>
					{availableFiles.map((file, index) => {
						const isSelected = index === selectedIndex;
						const isDirectory = file.endsWith('/');
						const isParent = file === '../parent-directory';
						const fullPath = `${browserDirectory}/${file}`;
						const isFileSelected = selectedFiles.includes(fullPath);

						return (
							<Text
								key={file}
								{...styles.browserItem({
									isSelected,
									isDirectory,
									isFileSelected,
								})}
							>
								{isParent
									? `${icons.back} ${file}`
									: isDirectory
										? `${icons.folder} ${file}`
										: isFileSelected
											? `${icons.selectedFile} ${file}`
											: `${icons.file} ${file}`}
							</Text>
						);
					})}
				</Box>

				<Box marginTop={1}>
					<Text {...styles.browserFooter()}>
						↑↓ navigate, Enter/Space to select, Esc to close
						{hasMultiple && ', x to remove'}
					</Text>
				</Box>
			</Box>
		);
	};

	const renderSelectedFiles = () => {
		if (selectedFiles.length === 0) return null;

		return (
			<Box {...styles.selectedFiles()} flexDirection="column" marginTop={1}>
				<Text {...styles.selectedFilesHeader()}>Selected Files:</Text>
				{selectedFiles.map(file => (
					<Box key={file} flexDirection="row" alignItems="center">
						<Text {...styles.selectedFile()}>
							{icons.selectedFile} {file}
						</Text>
						{hasMultiple && !isDisabled && (
							<Text {...styles.removeButton()}> ✕</Text>
						)}
					</Box>
				))}
			</Box>
		);
	};

	return (
		<Box {...styles.container()} flexDirection="column">
			{label && <Text {...styles.label()}>{label}</Text>}

			<Box
				{...styles.inputArea({
					isDisabled,
					isBrowsing,
					hasFiles: selectedFiles.length > 0,
				})}
				flexDirection="row"
				alignItems="center"
			>
				<Text
					{...styles.inputText({
						isDisabled,
						hasFiles: selectedFiles.length > 0,
					})}
				>
					{selectedFiles.length > 0
						? hasMultiple
							? `${selectedFiles.length} file(s) selected`
							: selectedFiles[0]
						: placeholder}
				</Text>

				<Text {...styles.browseButton({isDisabled})}>
					{isBrowsing ? 'Browsing...' : 'Browse'}
				</Text>
			</Box>

			{renderSelectedFiles()}
			{renderFileBrowser()}
		</Box>
	);
}
