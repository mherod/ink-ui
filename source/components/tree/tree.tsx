import React, {useState, useCallback} from 'react';
import {Box, Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type TreeNode = {
	/**
	 * Unique key for the tree node.
	 */
	key: string;

	/**
	 * Tree node label text.
	 */
	label: string;

	/**
	 * Child nodes.
	 */
	children?: TreeNode[];

	/**
	 * Whether the node is disabled.
	 */
	isDisabled?: boolean;

	/**
	 * Whether the node is expanded by default.
	 */
	isDefaultExpanded?: boolean;

	/**
	 * Icon to display before the label.
	 */
	icon?: string;

	/**
	 * Whether this node is selectable.
	 */
	isSelectable?: boolean;
};

export type TreeProps = {
	/**
	 * Array of tree nodes.
	 */
	readonly nodes: TreeNode[];

	/**
	 * Callback when a tree node is selected.
	 */
	readonly onSelect?: (node: TreeNode) => void;

	/**
	 * Callback when a tree node is expanded/collapsed.
	 */
	readonly onToggle?: (node: TreeNode, isExpanded: boolean) => void;

	/**
	 * Default selected node key.
	 */
	readonly defaultSelectedKey?: string;

	/**
	 * Controlled selected node key.
	 */
	readonly selectedKey?: string;

	/**
	 * Whether to show connecting lines.
	 */
	readonly hasLines?: boolean;

	/**
	 * Whether to show icons.
	 */
	readonly hasIcons?: boolean;
};

type FlatTreeNode = {
	node: TreeNode;
	depth: number;
	isExpanded: boolean;
	hasChildren: boolean;
	isLastChild: boolean;
	parentPath: boolean[];
};

export function Tree({
	nodes,
	onSelect,
	onToggle,
	defaultSelectedKey,
	selectedKey: controlledSelectedKey,
	hasLines = true,
	hasIcons = true,
}: TreeProps) {
	const {styles, config} = useComponentTheme<Theme>('Tree');
	const icons = config()?.icons as {
		expanded: string;
		collapsed: string;
		folder: string;
		file: string;
		line: string;
		child: string;
		lastChild: string;
	};

	const [internalSelectedKey, setInternalSelectedKey] = useState(
		defaultSelectedKey ?? '',
	);
	const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => {
		const expanded = new Set<string>();
		const addDefaultExpanded = (treeNodes: TreeNode[]) => {
			for (const node of treeNodes) {
				if (node.isDefaultExpanded) {
					expanded.add(node.key);
				}

				if (node.children) {
					addDefaultExpanded(node.children);
				}
			}
		};

		addDefaultExpanded(nodes);
		return expanded;
	});

	const selectedKey = controlledSelectedKey ?? internalSelectedKey;

	const toggleNode = useCallback(
		(node: TreeNode) => {
			const isExpanded = expandedKeys.has(node.key);
			const newExpanded = new Set(expandedKeys);

			if (isExpanded) {
				newExpanded.delete(node.key);
			} else {
				newExpanded.add(node.key);
			}

			setExpandedKeys(newExpanded);
			onToggle?.(node, !isExpanded);
		},
		[expandedKeys, onToggle],
	);

	const selectNode = useCallback(
		(node: TreeNode) => {
			if (Boolean(node.isDisabled) || node.isSelectable === false) return;

			if (!controlledSelectedKey) {
				setInternalSelectedKey(node.key);
			}

			onSelect?.(node);
		},
		[controlledSelectedKey, onSelect],
	);

	const flattenNodes = useCallback(
		(
			treeNodes: TreeNode[],
			depth = 0,
			parentPath: boolean[] = [],
		): FlatTreeNode[] => {
			const result: FlatTreeNode[] = [];

			for (let i = 0; i < treeNodes.length; i++) {
				const node = treeNodes[i];
				if (!node) continue;

				const isLastChild = i === treeNodes.length - 1;
				const hasChildren = Boolean(node.children?.length);
				const isExpanded = expandedKeys.has(node.key);

				result.push({
					node,
					depth,
					isExpanded,
					hasChildren,
					isLastChild,
					parentPath,
				});

				if (hasChildren && isExpanded && node.children) {
					const childParentPath = [...parentPath, !isLastChild];
					result.push(
						...flattenNodes(node.children, depth + 1, childParentPath),
					);
				}
			}

			return result;
		},
		[expandedKeys],
	);

	const flatNodes = flattenNodes(nodes);
	const selectableNodes = flatNodes.filter(
		item => !item.node.isDisabled && item.node.isSelectable !== false,
	);

	const selectedIndex = selectableNodes.findIndex(
		item => item.node.key === selectedKey,
	);

	const navigateTree = useCallback(
		(direction: 'up' | 'down') => {
			if (selectableNodes.length === 0) return;

			let nextIndex;
			if (direction === 'up') {
				nextIndex =
					selectedIndex <= 0 ? selectableNodes.length - 1 : selectedIndex - 1;
			} else {
				nextIndex =
					selectedIndex >= selectableNodes.length - 1 ? 0 : selectedIndex + 1;
			}

			const nextNode = selectableNodes[nextIndex]?.node;
			if (nextNode) {
				selectNode(nextNode);
			}
		},
		[selectedIndex, selectableNodes, selectNode],
	);

	useInput((input, key) => {
		if (key.upArrow) {
			navigateTree('up');
		} else if (key.downArrow) {
			navigateTree('down');
		} else if (key.return || input === ' ') {
			const selectedFlatNode = flatNodes.find(
				item => item.node.key === selectedKey,
			);
			if (selectedFlatNode) {
				if (selectedFlatNode.hasChildren) {
					toggleNode(selectedFlatNode.node);
				} else {
					selectNode(selectedFlatNode.node);
				}
			}
		} else if (key.rightArrow) {
			const selectedFlatNode = flatNodes.find(
				item => item.node.key === selectedKey,
			);
			if (selectedFlatNode?.hasChildren && !selectedFlatNode.isExpanded) {
				toggleNode(selectedFlatNode.node);
			}
		} else if (key.leftArrow) {
			const selectedFlatNode = flatNodes.find(
				item => item.node.key === selectedKey,
			);
			if (selectedFlatNode?.hasChildren && selectedFlatNode.isExpanded) {
				toggleNode(selectedFlatNode.node);
			}
		}
	});

	const renderTreeLines = (item: FlatTreeNode) => {
		if (!hasLines) return null;

		const lines: string[] = [];

		// Add parent lines
		for (const hasParentLine of item.parentPath) {
			lines.push(hasParentLine ? String(icons.line) : ' ');
		}

		// Add current level line
		if (item.depth > 0) {
			lines.push(
				item.isLastChild ? String(icons.lastChild) : String(icons.child),
			);
		}

		return lines.join('');
	};

	const renderTreeNode = (item: FlatTreeNode) => {
		const {node, depth} = item;
		const isSelected = node.key === selectedKey;
		const {isDisabled} = node;

		return (
			<Box
				key={node.key}
				{...(styles.treeNode?.({
					isSelected,
					isDisabled: Boolean(isDisabled),
					depth,
				}) as any)}
			>
				{hasLines && (
					<Text {...(styles.lines?.() as any)}>{renderTreeLines(item)}</Text>
				)}

				{item.hasChildren && (
					<Text {...(styles.expandIcon?.() as any)}>
						{item.isExpanded ? String(icons.expanded) : String(icons.collapsed)}
					</Text>
				)}

				{hasIcons && (
					<Text
						{...(styles.nodeIcon?.({
							isSelected,
							isDisabled: Boolean(isDisabled),
						}) as any)}
					>
						{node.icon ??
							(item.hasChildren ? String(icons.folder) : String(icons.file))}
					</Text>
				)}

				<Text
					{...(styles.nodeLabel?.({
						isSelected,
						isDisabled: Boolean(isDisabled),
					}) as any)}
				>
					{node.label}
				</Text>
			</Box>
		);
	};

	return (
		<Box {...(styles.container?.() as any)} flexDirection="column">
			{flatNodes.map(item => renderTreeNode(item))}
		</Box>
	);
}
