const base = new URL("..", import.meta.url).href

const routes = {
    404:            { html: `${base}pages/404.html` },
    "/":            { html: `${base}pages/digitalClock.html`, js: `${base}js/digitalClock.js` },
    "/analogClock": { html: `${base}pages/analogClock.html`,  js: `${base}js/analogClock.js` },
    "/calendar":    { html: `${base}pages/calendar.html`,     js: `${base}js/calendar.js` },
}

let cleanup = null

const handleLocation = async () => {
    if (cleanup) {
        cleanup()
        cleanup = null
    }

    const path = window.location.hash.slice(1) || "/"
    const route = routes[path] || routes[404]

    const html = await fetch(route.html).then((res) => res.text())
    document.querySelector("main").innerHTML = html

    if (route.js) {
        try {
            const module = await import(route.js)
            if (module.init) cleanup = module.init()
        } catch (error) {
            console.error("Error loading module:", error)
        }
    }
}

document.querySelector("nav").addEventListener("click", (event) => {
    const link = event.target.closest("a")
    if (!link) return
    event.preventDefault()
    window.location.hash = link.href.split("#")[1]
})

window.onhashchange = handleLocation
handleLocation()