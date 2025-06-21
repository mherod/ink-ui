import {useEffect} from 'react';
import {useInput} from 'ink';
import {
	useDatePickerState,
	type UseDatePickerStateOptions,
} from './use-date-picker-state.js';

export type UseDatePickerOptions = UseDatePickerStateOptions & {
	isDisabled?: boolean;
	onSelect?: (date: Date) => void;
	onSubmit?: (date: Date) => void;
};

export function useDatePicker({
	isDisabled = false,
	onSelect,
	onSubmit,
	...stateOptions
}: UseDatePickerOptions = {}) {
	const state = useDatePickerState(stateOptions);

	useInput((input, key) => {
		if (isDisabled) {
			return;
		}

		if (key.leftArrow) {
			state.focusDay('left');
		}

		if (key.rightArrow) {
			state.focusDay('right');
		}

		if (key.upArrow) {
			state.focusDay('up');
		}

		if (key.downArrow) {
			state.focusDay('down');
		}

		if (key.return) {
			state.selectDate();
			if (state.selectedDate && onSubmit) {
				onSubmit(state.selectedDate);
			}
		}

		if (input === ' ') {
			state.selectDate();
		}

		if (input === 'n' || input === 'N') {
			state.navigateMonth('next');
		}

		if (input === 'p' || input === 'P') {
			state.navigateMonth('previous');
		}

		if (input === 't' || input === 'T') {
			state.setDate(new Date());
		}
	});

	// Call onSelect when selection changes
	useEffect(() => {
		if (state.selectedDate && onSelect) {
			onSelect(state.selectedDate);
		}
	}, [state.selectedDate, onSelect]);

	return state;
}
