const digits = {
    h1: document.getElementById("h1"),
    h2: document.getElementById("h2"),
    m1: document.getElementById("m1"),
    m2: document.getElementById("m2"),
    s1: document.getElementById("s1"),
    s2: document.getElementById("s2")
}

const movementsFigures = {
    0: { div4: 'onSite', div6: 'onSite', div8: 'oneStep', div10: 'onSite', div12: 'onSite' },
    1: { div1: 'twoSteps', div2: 'oneStep', div4: 'twoSteps', div6: 'onSite', div7: 'twoSteps', div8: 'oneStep', div10: 'twoSteps', div13: 'twoSteps', div14: 'oneStep' },
    2: { div1: 'onSite', div2: 'onSite', div4: 'twoSteps', div7: 'onSite', div8: 'onSite', div10: 'onSite', div12: 'twoStepsPress', div13: 'onSite', div14: 'onSite' },
    3: { div4: 'twoSteps', div10: 'twoSteps',  div12: 'onSite' },
    4: { div2: 'oneStep', div4: 'onSite', div10: 'twoSteps', div13: 'twoSteps', div14: 'oneStep' },
    5: { div2: 'onSite', div6: 'twoStepsPress', div10: 'twoSteps', div13: 'onSite', div14: 'onSite' },
    6: { div6: 'twoStepsPress', div9: 'onSite', div10: 'onSite' },
    7: { div4: 'twoSteps', div6: 'onSite', div7: 'twoSteps', div8: 'oneStep', div10: 'twoSteps', div13: 'twoSteps', div14: 'oneStep' },
    8: { div4: 'onSite', div7: 'onSite', div8: 'onSite', div10: 'onSite', div13: 'onSite', div14: 'onSite' },
    9: { div10: 'twoSteps'}
}

for(let key in digits){
    for(let i = 1; i <= 15; i++){
        const div = document.createElement('div')
        div.id = `div${i}`
        digits[key].append(div)
    }
}

function pad(num) {
    return String(num).padStart(2, "0")
}

function clear(container) {
    [...container.children].forEach(el => el.className = "");
}

function drawDigit(digit, container) {
    [...container.children].forEach(elem => {
        const cls = movementsFigures[digit]?.[elem.id]
        if (cls) elem.classList.add(cls)
    })
}

function setDigits(str, el1, el2) {
    clear(el1)
    clear(el2)

    drawDigit(str[0], el1)
    drawDigit(str[1], el2)
}

let lastSecond = -1

function updateClock() {
    const now = Temporal.Now.zonedDateTimeISO()

    const h = pad(now.hour)
    const m = pad(now.minute)
    const s = pad(now.second)

    const currentSecond = now.second

    if (currentSecond !== lastSecond) {
        setDigits(h, digits.h1, digits.h2)
        setDigits(m, digits.m1, digits.m2)
        setDigits(s, digits.s1, digits.s2)
        lastSecond = currentSecond
    }

    requestAnimationFrame(updateClock)
}

updateClock()