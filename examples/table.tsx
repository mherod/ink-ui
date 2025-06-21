/**
 * Run this example:
 *   npm run example examples/table.tsx
 */

import React from 'react';
import {render, Box, Text} from 'ink';
import {Table, Badge} from '../source/index.js';

type User = {
	id: number;
	name: string;
	email: string;
	status: 'active' | 'inactive' | 'pending';
	score: number;
};

const users: User[] = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		status: 'active',
		score: 95,
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane@example.com',
		status: 'inactive',
		score: 87,
	},
	{
		id: 3,
		name: 'Bob Johnson',
		email: 'bob@example.com',
		status: 'pending',
		score: 92,
	},
	{
		id: 4,
		name: 'Alice Brown',
		email: 'alice@example.com',
		status: 'active',
		score: 98,
	},
];

function Example() {
	const columns = [
		{
			key: 'id',
			title: 'ID',
			width: 4,
		},
		{
			key: 'name',
			title: 'Name',
			width: 15,
		},
		{
			key: 'email',
			title: 'Email',
			width: 20,
		},
		{
			key: 'status',
			title: 'Status',
			width: 10,
			render(status: string) {
				const color =
					status === 'active'
						? 'green'
						: status === 'inactive'
							? 'red'
							: 'yellow';
				return <Badge color={color}>{status}</Badge>;
			},
		},
		{
			key: 'score',
			title: 'Score',
			width: 8,
			align: 'right' as const,
			render: (score: number) => (
				<Text color={score >= 95 ? 'green' : score >= 90 ? 'yellow' : 'white'}>
					{score}%
				</Text>
			),
		},
	];

	return (
		<Box padding={2} flexDirection="column" gap={2}>
			<Text bold color="blue">
				Table Examples
			</Text>

			<Box flexDirection="column" gap={1}>
				<Text bold>User Management Table:</Text>
				<Table columns={columns} data={users} />
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Compact Table:</Text>
				<Table isCompact columns={columns} data={users} />
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Striped Table:</Text>
				<Table isStriped columns={columns} data={users} />
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text bold>Borderless Table:</Text>
				<Table columns={columns} data={users} isBordered={false} />
			</Box>
		</Box>
	);
}

render(<Example />);
