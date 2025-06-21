import React from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import type {Theme} from './theme.js';

export type SeparatorProps = {
	readonly variant?: 'solid' | 'dashed' | 'dotted' | 'double';
	readonly orientation?: 'horizontal' | 'vertical';
	readonly length?: number;
	readonly color?: string;
	readonly character?: string;
	readonly hasText?: boolean;
	readonly text?: string;
	readonly textPosition?: 'left' | 'center' | 'right';
	readonly margin?: number;
	readonly marginX?: number;
	readonly marginY?: number;
};

export function Separator({
	variant = 'solid',
	orientation = 'horizontal',
	length = 20,
	color,
	character,
	hasText = false,
	text = '',
	textPosition = 'center',
	margin,
	marginX,
	marginY,
}: SeparatorProps) {
	const theme = useComponentTheme<Theme>('separator');
	const config = theme.config();

	const getCharacter = () => {
		if (character) return character;

		if (orientation === 'vertical') {
			switch (variant) {
				case 'solid': {
					return config.vertical.solid;
				}

				case 'dashed': {
					return config.vertical.dashed;
				}

				case 'dotted': {
					return config.vertical.dotted;
				}

				case 'double': {
					return config.vertical.double;
				}
			}
		}

		switch (variant) {
			case 'solid': {
				return config.horizontal.solid;
			}

			case 'dashed': {
				return config.horizontal.dashed;
			}

			case 'dotted': {
				return config.horizontal.dotted;
			}

			case 'double': {
				return config.horizontal.double;
			}
		}
	};

	const renderLine = () => {
		const separatorChar = getCharacter();
		return separatorChar.repeat(length);
	};

	const renderHorizontalWithText = () => {
		if (!hasText || !text) {
			return renderLine();
		}

		const separatorChar = getCharacter();
		const totalLength = length;
		const textLength = text.length;

		if (textLength >= totalLength) {
			return text.slice(0, totalLength);
		}

		const padding = totalLength - textLength;

		switch (textPosition) {
			case 'left': {
				const rightPadding = Math.max(0, padding);
				return text + separatorChar.repeat(rightPadding);
			}

			case 'right': {
				const leftPadding = Math.max(0, padding);
				return separatorChar.repeat(leftPadding) + text;
			}

			case 'center': {
				const leftPadding = Math.floor(padding / 2);
				const rightPadding = padding - leftPadding;
				return (
					separatorChar.repeat(leftPadding) +
					text +
					separatorChar.repeat(rightPadding)
				);
			}
		}
	};

	const containerProps = {
		marginX: marginX ?? margin,
		marginY: marginY ?? margin,
	};

	if (orientation === 'vertical') {
		const separatorChar = getCharacter();
		return (
			<Box {...containerProps} {...theme.styles.verticalContainer()}>
				{Array.from({length}, (_, index) => (
					<Text
						key={index}
						{...theme.styles.verticalLine({variant})}
						color={color}
					>
						{separatorChar}
					</Text>
				))}
			</Box>
		);
	}

	return (
		<Box {...containerProps} {...theme.styles.horizontalContainer()}>
			<Text {...theme.styles.horizontalLine({variant})} color={color}>
				{renderHorizontalWithText()}
			</Text>
		</Box>
	);
}
