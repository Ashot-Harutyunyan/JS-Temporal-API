// calendar

export const init = () => {

    const calendarDays = document.getElementById('days')
    const monthYear = document.getElementById('monthYear')
    const [dateEl, progressEl, monthEl] =
        document.querySelectorAll('.calendar-info div span')
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')

    let currentDate = Temporal.Now.plainDateISO()
    let viewDate = currentDate.with({ day: 1 })

    function updateCalendarInfo(monthName) {
        monthYear.firstElementChild.textContent = monthName
        monthYear.lastElementChild.textContent = viewDate.year

        dateEl.textContent = currentDate.toString().split('-').join(' ')
        progressEl.textContent = `${currentDate.dayOfYear} / ${currentDate.daysInYear}`
        monthEl.textContent = currentDate.month.toString().padStart(2, '0')
    }

    function renderCalendar() {
        calendarDays.innerHTML = ''
        const fragment = document.createDocumentFragment()
        const monthName = viewDate.toLocaleString("en-US", { month: "long" })
        const daysInMonth = viewDate.daysInMonth
        let offset = viewDate.dayOfWeek - 1

        updateCalendarInfo(monthName)

        for (let i = 0; i < offset; i++) {
            fragment.appendChild(document.createElement('div'))
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = viewDate.with({ day })
            const dayElement = document.createElement('div')

            if (date.equals(currentDate)) {
                dayElement.classList.add('active')
            }

            dayElement.textContent = day
            fragment.appendChild(dayElement)
        }

        calendarDays.appendChild(fragment)
    }

    function onPrev() {
        viewDate = viewDate.subtract({ months: 1 })
        renderCalendar()
    }

    function onNext() {
        viewDate = viewDate.add({ months: 1 })
        renderCalendar()
    }

    prevButton.addEventListener("click", onPrev)
    nextButton.addEventListener("click", onNext)

    renderCalendar()

    return () => {
        prevButton.removeEventListener("click", onPrev)
        nextButton.removeEventListener("click", onNext)
    }
}