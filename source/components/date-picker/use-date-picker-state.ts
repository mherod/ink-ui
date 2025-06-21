import {useReducer, useCallback, type Reducer} from 'react';
import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	format,
	addMonths,
	subMonths,
	isSameDay,
	isToday,
	isSameMonth,
} from 'date-fns';

type State = {
	currentDate: Date;
	selectedDate: Date | undefined;
	focusedDate: Date;
	viewDate: Date; // The month/year being displayed
};

type Action =
	| NavigateMonthAction
	| FocusDayAction
	| SelectDateAction
	| SetDateAction;

type NavigateMonthAction = {
	type: 'navigate-month';
	direction: 'next' | 'previous';
};

type FocusDayAction = {
	type: 'focus-day';
	direction: 'up' | 'down' | 'left' | 'right';
};

type SelectDateAction = {
	type: 'select-date';
};

type SetDateAction = {
	type: 'set-date';
	date: Date;
};

const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'navigate-month': {
			const newViewDate =
				action.direction === 'next'
					? addMonths(state.viewDate, 1)
					: subMonths(state.viewDate, 1);

			return {
				...state,
				viewDate: newViewDate,
				focusedDate: new Date(
					newViewDate.getFullYear(),
					newViewDate.getMonth(),
					1,
				),
			};
		}

		case 'focus-day': {
			const {direction} = action;
			const newFocusedDate = new Date(state.focusedDate);

			switch (direction) {
				case 'left': {
					newFocusedDate.setDate(newFocusedDate.getDate() - 1);
					break;
				}

				case 'right': {
					newFocusedDate.setDate(newFocusedDate.getDate() + 1);
					break;
				}

				case 'up': {
					newFocusedDate.setDate(newFocusedDate.getDate() - 7);
					break;
				}

				case 'down': {
					newFocusedDate.setDate(newFocusedDate.getDate() + 7);
					break;
				}
			}

			// Check if we need to change the viewed month
			const newViewDate = isSameMonth(newFocusedDate, state.viewDate)
				? state.viewDate
				: new Date(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1);

			return {
				...state,
				focusedDate: newFocusedDate,
				viewDate: newViewDate,
			};
		}

		case 'select-date': {
			return {
				...state,
				selectedDate: state.focusedDate,
			};
		}

		case 'set-date': {
			const newViewDate = new Date(
				action.date.getFullYear(),
				action.date.getMonth(),
				1,
			);
			return {
				...state,
				selectedDate: action.date,
				focusedDate: action.date,
				viewDate: newViewDate,
			};
		}
	}
};

export type UseDatePickerStateOptions = {
	defaultValue?: Date;
	minDate?: Date;
	maxDate?: Date;
};

export function useDatePickerState({
	defaultValue,
	minDate,
	maxDate,
}: UseDatePickerStateOptions = {}) {
	const initialDate = defaultValue ?? new Date();
	const initialViewDate = new Date(
		initialDate.getFullYear(),
		initialDate.getMonth(),
		1,
	);

	const [state, dispatch] = useReducer(reducer, {
		currentDate: new Date(),
		selectedDate: defaultValue,
		focusedDate: initialDate,
		viewDate: initialViewDate,
	});

	const navigateMonth = useCallback((direction: 'next' | 'previous') => {
		dispatch({type: 'navigate-month', direction});
	}, []);

	const focusDay = useCallback(
		(direction: 'up' | 'down' | 'left' | 'right') => {
			dispatch({type: 'focus-day', direction});
		},
		[],
	);

	const selectDate = useCallback(() => {
		const {focusedDate} = state;

		// Check date constraints
		if (minDate && focusedDate < minDate) return;
		if (maxDate && focusedDate > maxDate) return;

		dispatch({type: 'select-date'});
	}, [state, minDate, maxDate]);

	const setDate = useCallback((date: Date) => {
		dispatch({type: 'set-date', date});
	}, []);

	// Generate calendar days for the current view
	const calendarDays = useCallback(() => {
		const monthStart = startOfMonth(state.viewDate);
		const monthEnd = endOfMonth(state.viewDate);
		const calendarStart = startOfWeek(monthStart);
		const calendarEnd = endOfWeek(monthEnd);

		return eachDayOfInterval({start: calendarStart, end: calendarEnd}).map(
			date => ({
				date,
				isToday: isToday(date),
				isSelected: state.selectedDate
					? isSameDay(date, state.selectedDate)
					: false,
				isFocused: isSameDay(date, state.focusedDate),
				isCurrentMonth: isSameMonth(date, state.viewDate),
				isDisabled:
					Boolean(minDate && date < minDate) ||
					Boolean(maxDate && date > maxDate),
			}),
		);
	}, [state.viewDate, state.selectedDate, state.focusedDate, minDate, maxDate]);

	// Group days into weeks
	const weeks = useCallback(() => {
		const days = calendarDays();
		const weeksArray = [];
		for (let i = 0; i < days.length; i += 7) {
			weeksArray.push(days.slice(i, i + 7));
		}

		return weeksArray;
	}, [calendarDays]);

	return {
		...state,
		navigateMonth,
		focusDay,
		selectDate,
		setDate,
		calendarDays: calendarDays(),
		weeks: weeks(),
		currentMonthYear: format(state.viewDate, 'MMMM yyyy'),
	};
}
