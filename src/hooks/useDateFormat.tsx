export default function useDateFormat(date: Date) {
    const option: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const formattedDate = date.toLocaleDateString("en-EN", option)

    return formattedDate
}
