import React, {type ReactNode, createContext, useContext} from 'react';
import deepmerge from 'deepmerge';
import alertTheme from './components/alert/theme.js';
import badgeTheme from './components/badge/theme.js';
import checkboxTheme from './components/checkbox/theme.js';
import confirmInputTheme from './components/confirm-input/theme.js';
import datePickerTheme from './components/date-picker/theme.js';
import modalTheme from './components/modal/theme.js';
import multiSelectTheme from './components/multi-select/theme.js';
import orderedListTheme from './components/ordered-list/theme.js';
import progressBarTheme from './components/progress-bar/theme.js';
import selectTheme from './components/select/theme.js';
import spinnerTheme from './components/spinner/theme.js';
import statusMessageTheme from './components/status-message/theme.js';
import tableTheme from './components/table/theme.js';
import tabsTheme from './components/tabs/theme.js';
import toastTheme from './components/toast/theme.js';
import unorderedListTheme from './components/unordered-list/theme.js';
import textInputTheme from './components/text-input/theme.js';
import emailInputTheme from './components/email-input/theme.js';
import passwordInputTheme from './components/password-input/theme.js';

export type Theme = {
	components: Record<string, ComponentTheme>;
};

export type ComponentTheme = {
	styles?: Record<string, (props?: any) => ComponentStyles>;
	config?: (props?: any) => Record<string, unknown>;
};

export type ComponentStyles = Record<string, unknown>;

export const defaultTheme: Theme = {
	components: {
		Alert: alertTheme,
		Badge: badgeTheme,
		Checkbox: checkboxTheme,
		ConfirmInput: confirmInputTheme,
		DatePicker: datePickerTheme,
		Modal: modalTheme,
		MultiSelect: multiSelectTheme,
		OrderedList: orderedListTheme,
		ProgressBar: progressBarTheme,
		Select: selectTheme,
		Spinner: spinnerTheme,
		StatusMessage: statusMessageTheme,
		Table: tableTheme,
		Tabs: tabsTheme,
		Toast: toastTheme,
		UnorderedList: unorderedListTheme,
		TextInput: textInputTheme,
		EmailInput: emailInputTheme,
		PasswordInput: passwordInputTheme,
	},
};

export const ThemeContext = createContext<Theme>(defaultTheme);

export type ThemeProviderProps = {
	readonly children: ReactNode;
	readonly theme: Theme;
};

export function ThemeProvider({children, theme}: ThemeProviderProps) {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}

export const extendTheme = (originalTheme: Theme, newTheme: Theme) => {
	return deepmerge(originalTheme, newTheme);
};

export const useComponentTheme = <Theme extends ComponentTheme>(
	component: string,
): Theme => {
	const theme = useContext(ThemeContext);
	return theme.components[component] as Theme;
};
