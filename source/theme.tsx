import React, {type ReactNode, createContext, useContext} from 'react';
import deepmerge from 'deepmerge';
import accordionTheme from './components/accordion/theme.js';
import alertTheme from './components/alert/theme.js';
import badgeTheme from './components/badge/theme.js';
import breadcrumbTheme from './components/breadcrumb/theme.js';
import checkboxTheme from './components/checkbox/theme.js';
import codeBlockTheme from './components/code-block/theme.js';
import confirmInputTheme from './components/confirm-input/theme.js';
import datePickerTheme from './components/date-picker/theme.js';
import fileInputTheme from './components/file-input/theme.js';
import menuTheme from './components/menu/theme.js';
import modalTheme from './components/modal/theme.js';
import multiSelectTheme from './components/multi-select/theme.js';
import orderedListTheme from './components/ordered-list/theme.js';
import progressBarTheme from './components/progress-bar/theme.js';
import radioGroupTheme from './components/radio-group/theme.js';
import searchInputTheme from './components/search-input/theme.js';
import selectTheme from './components/select/theme.js';
import separatorTheme from './components/separator/theme.js';
import sliderTheme from './components/slider/theme.js';
import spinnerTheme from './components/spinner/theme.js';
import statusMessageTheme from './components/status-message/theme.js';
import switchTheme from './components/switch/theme.js';
import tableTheme from './components/table/theme.js';
import tabsTheme from './components/tabs/theme.js';
import toastTheme from './components/toast/theme.js';
import treeTheme from './components/tree/theme.js';
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
		Accordion: accordionTheme,
		Alert: alertTheme,
		Badge: badgeTheme,
		Breadcrumb: breadcrumbTheme,
		Checkbox: checkboxTheme,
		CodeBlock: codeBlockTheme,
		ConfirmInput: confirmInputTheme,
		DatePicker: datePickerTheme,
		FileInput: fileInputTheme,
		Menu: menuTheme,
		Modal: modalTheme,
		MultiSelect: multiSelectTheme,
		OrderedList: orderedListTheme,
		ProgressBar: progressBarTheme,
		RadioGroup: radioGroupTheme,
		SearchInput: searchInputTheme,
		Select: selectTheme,
		Separator: separatorTheme,
		Slider: sliderTheme,
		Spinner: spinnerTheme,
		StatusMessage: statusMessageTheme,
		Switch: switchTheme,
		Table: tableTheme,
		Tabs: tabsTheme,
		Toast: toastTheme,
		Tree: treeTheme,
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
