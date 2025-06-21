import React from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type CodeBlockProps = {
	/**
	 * Code content to display.
	 */
	readonly children: string;

	/**
	 * Programming language for syntax highlighting context.
	 */
	readonly language?: string;

	/**
	 * Whether to show line numbers.
	 */
	readonly hasLineNumbers?: boolean;

	/**
	 * Whether to show borders around the code block.
	 */
	readonly hasBorders?: boolean;

	/**
	 * Title to display above the code block.
	 */
	readonly title?: string;

	/**
	 * Starting line number (default: 1).
	 */
	readonly startLineNumber?: number;

	/**
	 * Whether to wrap long lines.
	 */
	readonly hasWordWrap?: boolean;

	/**
	 * Maximum width of the code block.
	 */
	readonly maxWidth?: number;

	/**
	 * Whether to highlight the code syntax.
	 */
	readonly hasSyntaxHighlight?: boolean;
};

export function CodeBlock({
	children,
	language = 'text',
	hasLineNumbers = true,
	hasBorders = true,
	title,
	startLineNumber = 1,
	hasWordWrap = false,
	maxWidth = 80,
	hasSyntaxHighlight = false,
}: CodeBlockProps) {
	const {styles} = useComponentTheme<Theme>('CodeBlock');

	const lines = children.split('\n');
	const maxLineNumberWidth = String(startLineNumber + lines.length - 1).length;

	const highlightSyntax = (code: string, lang: string): React.ReactNode => {
		if (!hasSyntaxHighlight) {
			return code;
		}

		// Basic syntax highlighting for common languages
		switch (lang) {
			case 'javascript':
			case 'typescript': {
				// Highlight keywords, strings, comments
				return code
					.replaceAll(
						/(function|const|let|var|if|else|return|import|export)/g,
						match => `<keyword>${match}</keyword>`,
					)
					.replaceAll(/(['"`])(.*?)\1/g, match => `<string>${match}</string>`)
					.replaceAll(/(\/\/.*$)/gm, match => `<comment>${match}</comment>`);
			}

			case 'json': {
				return code
					.replaceAll(/(".*?")/g, match => `<string>${match}</string>`)
					.replaceAll(
						/(true|false|null)/g,
						match => `<keyword>${match}</keyword>`,
					);
			}

			default: {
				return code;
			}
		}
	};

	const processCodeLine = (line: string): React.ReactNode => {
		const processedLine =
			hasWordWrap && line.length > maxWidth
				? line.slice(0, maxWidth - 3) + '...'
				: line;

		const syntaxHighlighted = highlightSyntax(processedLine, language);

		// For now, just return the text without actual highlighting since we can't use HTML tags in Ink
		return typeof syntaxHighlighted === 'string'
			? syntaxHighlighted
			: processedLine;
	};

	const renderLine = (line: string, index: number) => {
		const lineNumber = startLineNumber + index;
		const processedLine = processCodeLine(line);

		return (
			<Box key={index} {...styles.codeLine()}>
				{hasLineNumbers && (
					<Text {...styles.lineNumber()}>
						{String(lineNumber).padStart(maxLineNumberWidth, ' ')}
					</Text>
				)}
				<Text {...styles.codeContent({language})}>{processedLine}</Text>
			</Box>
		);
	};

	return (
		<Box {...styles.container({hasBorders})} flexDirection="column">
			{title && (
				<Box {...styles.header()}>
					<Text {...styles.title()}>{title}</Text>
					{language && <Text {...styles.language()}>{language}</Text>}
				</Box>
			)}

			<Box
				{...styles.codeContainer()}
				flexDirection="column"
				borderStyle={hasBorders ? 'single' : undefined}
			>
				{lines.map((line, index) => renderLine(line, index))}
			</Box>
		</Box>
	);
}
