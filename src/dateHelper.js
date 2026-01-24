class DateHelper{

    constructor(){

    }

    static IsSameDay(dayOne, dayTwo){
        return dayOne.toDateString() === dayTwo.toDateString()
    }

    static IsThisWeek(date, today){
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())

        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)

        return date >= startOfWeek && date <= endOfWeek
    }

    static IsThisMonth(date, today){
        return(
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }
    
}

export {DateHelper}