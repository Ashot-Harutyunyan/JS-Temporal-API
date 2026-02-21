const routes = {
    404: { html: "/pages/404.html" },
    "/":      { html: "/pages/digitalClock.html", js: "/js/digitalClock.js" },
    "/analogClock": { html: "/pages/analogClock.html", js: "/js/analogClock.js" },
    "/calendar": { html: "/pages/calendar.html", js: "/js/calendar.js" },
}

const handleLocation = async () => {
    const path = window.location.hash.slice(1) || "/"
    const route = routes[path] || routes[404]

    const html = await fetch(route.html).then((res) => res.text())
    document.querySelector("main").innerHTML = html

    if (route.js) {
        const module = await import(route.js + "?t=" + Temporal.Now.instant().epochMilliseconds)
        if (module.init) module.init()
    }
}

document.querySelector("nav").addEventListener("click", (event) => {
    const link = event.target.closest("a")
    if (!link) return
    event.preventDefault()
    window.location.hash = link.href.split("#")[1]
    handleLocation()
})

window.onhashchange = handleLocation

handleLocation()