/**
 * Run this example:
 *   npm run example examples/code-block.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {CodeBlock} from '../source/index.js';

const javascriptCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}`;

const typescriptCode = `interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

function findUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}`;

const jsonCode = `{
  "name": "ink-ui",
  "version": "2.0.0",
  "description": "UI components for Ink CLI applications",
  "main": "build/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "example": "tsx"
  },
  "dependencies": {
    "ink": "^5.0.0",
    "react": "^18.0.0"
  }
}`;

const bashCode = `#!/bin/bash

# Deploy script
echo "Starting deployment..."

npm run build
if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

npm run test
echo "Deployment complete!"`;

function Example() {
	const [selectedExample, setSelectedExample] = useState('javascript');

	const examples = {
		javascript: {code: javascriptCode, language: 'javascript'},
		typescript: {code: typescriptCode, language: 'typescript'},
		json: {code: jsonCode, language: 'json'},
		bash: {code: bashCode, language: 'bash'},
	};

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Code Block Component Examples
			</Text>

			<Box flexDirection="row" gap={2}>
				<Text>Select example: </Text>
				{Object.keys(examples).map((key, index) => (
					<Text
						key={key}
						color={selectedExample === key ? 'green' : 'white'}
						bold={selectedExample === key}
					>
						{index > 0 && ' | '}
						{key}
					</Text>
				))}
			</Box>

			<Box flexDirection="column" gap={2}>
				<Text bold>Basic Code Block:</Text>
				<CodeBlock
					language={examples[selectedExample as keyof typeof examples].language}
					title={`${examples[selectedExample as keyof typeof examples].language} Example`}
				>
					{examples[selectedExample as keyof typeof examples].code}
				</CodeBlock>

				<Text bold>Without Line Numbers:</Text>
				<CodeBlock
					language={examples[selectedExample as keyof typeof examples].language}
					hasLineNumbers={false}
					hasBorders={false}
				>
					{examples[selectedExample as keyof typeof examples].code
						.split('\n')
						.slice(0, 3)
						.join('\n')}
				</CodeBlock>

				<Text bold>With Word Wrap (max width 40):</Text>
				<CodeBlock
					hasWordWrap
					language={examples[selectedExample as keyof typeof examples].language}
					maxWidth={40}
					startLineNumber={10}
				>
					{examples[selectedExample as keyof typeof examples].code
						.split('\n')
						.slice(0, 2)
						.join('\n')}
				</CodeBlock>
			</Box>

			<Box borderTop marginTop={2} paddingTop={1} borderStyle="single">
				<Text dimColor>
					Code blocks support syntax highlighting, line numbers, borders, and
					word wrapping
				</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
