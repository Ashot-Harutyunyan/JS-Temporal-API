// analog clock

export const init = () => {

    const analogClock = document.querySelector('.analog-clock')
    const numbers = createAnalogClockElement('div', { className: 'numbers' })

    function createAnalogClockElement(tagName, {className, cssVars, text}) {
        const element = document.createElement(tagName)
        if (text !== null && text !== undefined) element.textContent = text
        if (className) element.classList.add(className)
        if (cssVars) {
            for (const [prop, value] of Object.entries(cssVars)) {
                element.style.setProperty(prop, value)
            }
        }
        return element
    }

    for (let i = 0; i < 12; i++) {
        const number = createAnalogClockElement('div', { className: 'number', cssVars: { '--i': i + 1 } })
        const span = createAnalogClockElement('span', { text: i + 1 })
        number.appendChild(span)
        numbers.appendChild(number)
    }

    analogClock.prepend(numbers)
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < 60; i++) {
        const dot = createAnalogClockElement('div', { className: 'dot', cssVars: { '--x': i + 1 } })
        if ((i + 1) % 5 === 0) dot.classList.add('big')
        fragment.appendChild(dot)
    }

    analogClock.appendChild(fragment)

    const hourHand = document.querySelector('.hour')
    const minuteHand = document.querySelector('.minute')
    const secondHand = document.querySelector('.second')

    function updateClock() {
        const now = Temporal.Now.zonedDateTimeISO()

        const hours = now.hour % 12
        const minutes = now.minute
        const seconds = now.second

        const hourDeg = (hours * 30) + (minutes * 0.5)
        const minuteDeg = (minutes * 6) + (seconds * 0.1)
        const secondDeg = seconds * 6

        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`
        secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`

        requestAnimationFrame(updateClock)
    }

    requestAnimationFrame(updateClock)

}