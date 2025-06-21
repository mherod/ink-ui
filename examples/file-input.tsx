/**
 * Run this example:
 *   npm run example examples/file-input.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {FileInput} from '../source/index.js';

function Example() {
	const [singleFile, setSingleFile] = useState<string[]>([]);
	const [multipleFiles, setMultipleFiles] = useState<string[]>([]);
	const [jsFiles, setJsFiles] = useState<string[]>([]);
	const [configFiles, setConfigFiles] = useState<string[]>([]);

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				File Input Component Examples
			</Text>

			<Box flexDirection="column" gap={3}>
				<Box flexDirection="column" gap={1}>
					<Text bold>Single File Selection:</Text>
					<FileInput
						label="Select a single file"
						placeholder="No file selected"
						onFilesChange={setSingleFile}
					/>
				</Box>

				<Box flexDirection="column" gap={1}>
					<Text bold>Multiple File Selection:</Text>
					<FileInput
						hasMultiple
						label="Select multiple files"
						placeholder="No files selected"
						maxFiles={5}
						onFilesChange={setMultipleFiles}
					/>
				</Box>

				<Box flexDirection="column" gap={1}>
					<Text bold>JavaScript/TypeScript Files Only:</Text>
					<FileInput
						hasMultiple
						label="Select JS/TS files"
						placeholder="Select .js, .ts, .jsx, .tsx files"
						acceptedExtensions={['.js', '.ts', '.jsx', '.tsx', '.json']}
						onFilesChange={setJsFiles}
					/>
				</Box>

				<Box flexDirection="column" gap={1}>
					<Text bold>Configuration Files (with hidden files):</Text>
					<FileInput
						hasMultiple
						hasHiddenFiles
						label="Select config files"
						placeholder="Select configuration files"
						acceptedExtensions={[
							'.json',
							'.yaml',
							'.yml',
							'.toml',
							'.ini',
							'.env',
						]}
						onFilesChange={setConfigFiles}
					/>
				</Box>

				<Box flexDirection="column" gap={1}>
					<Text bold>Disabled File Input:</Text>
					<FileInput
						isDisabled
						label="Disabled input"
						placeholder="This input is disabled"
					/>
				</Box>
			</Box>

			<Box flexDirection="column" gap={1} marginTop={2}>
				<Text bold>Current Selections:</Text>
				<Text>
					Single File:{' '}
					<Text color="green">
						{singleFile.length > 0 ? singleFile[0] : 'None'}
					</Text>
				</Text>
				<Text>
					Multiple Files:{' '}
					<Text color="green">
						{multipleFiles.length > 0
							? `${multipleFiles.length} file(s)`
							: 'None'}
					</Text>
				</Text>
				<Text>
					JS/TS Files:{' '}
					<Text color="green">
						{jsFiles.length > 0 ? `${jsFiles.length} file(s)` : 'None'}
					</Text>
				</Text>
				<Text>
					Config Files:{' '}
					<Text color="green">
						{configFiles.length > 0 ? `${configFiles.length} file(s)` : 'None'}
					</Text>
				</Text>
			</Box>

			{multipleFiles.length > 0 && (
				<Box flexDirection="column" gap={1} marginTop={1}>
					<Text bold>Selected Multiple Files:</Text>
					{multipleFiles.map(file => (
						<Text key={file} color="cyan">
							• {file}
						</Text>
					))}
				</Box>
			)}

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Enter to browse, ↑↓ to navigate, Space/Enter to select, Esc to close,
					x to remove (multiple mode)
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
