/**
 * Run this example:
 *   npm run example examples/separator.tsx
 */

import React from 'react';
import {render, Box, Text} from 'ink';
import {Separator} from '../source/index.js';

function Example() {
	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Separator Component Examples
			</Text>

			<Box flexDirection="column" gap={2}>
				<Text bold>Horizontal Separators:</Text>

				<Box flexDirection="column" gap={1}>
					<Text>Solid (default):</Text>
					<Separator length={40} />

					<Text>Dashed:</Text>
					<Separator variant="dashed" length={40} />

					<Text>Dotted:</Text>
					<Separator variant="dotted" length={40} />

					<Text>Double:</Text>
					<Separator variant="double" length={40} />
				</Box>

				<Text bold>Separators with Text:</Text>

				<Box flexDirection="column" gap={1}>
					<Text>Center text (default):</Text>
					<Separator hasText text="SECTION" length={40} />

					<Text>Left-aligned text:</Text>
					<Separator hasText text="START" textPosition="left" length={40} />

					<Text>Right-aligned text:</Text>
					<Separator hasText text="END" textPosition="right" length={40} />

					<Text>Dashed with text:</Text>
					<Separator hasText variant="dashed" text="NOTES" length={40} />
				</Box>

				<Text bold>Custom Characters:</Text>

				<Box flexDirection="column" gap={1}>
					<Text>Custom character:</Text>
					<Separator character="*" length={30} />

					<Text>Custom with text:</Text>
					<Separator hasText character="~" text="WAVE" length={30} />
				</Box>

				<Text bold>Different Lengths:</Text>

				<Box flexDirection="column" gap={1}>
					<Separator length={10} />
					<Separator length={20} />
					<Separator length={30} />
					<Separator length={50} />
				</Box>

				<Text bold>Colored Separators:</Text>

				<Box flexDirection="column" gap={1}>
					<Separator color="green" length={30} />
					<Separator color="red" variant="dashed" length={30} />
					<Separator hasText color="yellow" text="WARNING" length={30} />
					<Separator color="blue" variant="double" length={30} />
				</Box>
			</Box>

			<Text bold>Vertical Separators:</Text>
			<Box gap={2}>
				<Text>Left</Text>
				<Separator orientation="vertical" length={5} />
				<Text>Middle</Text>
				<Separator orientation="vertical" variant="dashed" length={5} />
				<Text>Right</Text>
			</Box>

			<Text bold>More Vertical Examples:</Text>
			<Box gap={3}>
				<Box flexDirection="column">
					<Text>Solid</Text>
					<Separator orientation="vertical" length={3} />
				</Box>
				<Box flexDirection="column">
					<Text>Dotted</Text>
					<Separator orientation="vertical" variant="dotted" length={3} />
				</Box>
				<Box flexDirection="column">
					<Text>Double</Text>
					<Separator orientation="vertical" variant="double" length={3} />
				</Box>
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Separators help organize content and create visual divisions in your
					CLI.
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
