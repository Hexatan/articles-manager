/**
 * Formats a date string into a localized, human-readable format
 *
 * @param dateString - ISO date string to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
	dateString: string,
	options: {
		locale?: string;
		monthFormat?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
		showYear?: boolean;
		showDay?: boolean;
	} = {}
): string {
	const { locale = 'en-NZ', monthFormat = 'long', showYear = true, showDay = true } = options;

	const date = new Date(dateString);

	return date.toLocaleDateString(locale, {
		year: showYear ? 'numeric' : undefined,
		month: monthFormat,
		day: showDay ? 'numeric' : undefined
	});
}
