export default function useDateFormat() {
    const dateFormatted = (date: Date) => {
        const option: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        const formattedDate = date.toLocaleDateString("en-EN", option)   
        return formattedDate
    }
    return dateFormatted
}
