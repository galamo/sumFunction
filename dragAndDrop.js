
$(function () {
    const tigger = $(SVG.tiger)
    $("#container-svg").append(tigger)
    let currentElement

    tigger.on("mousedown", function (e) {
        currentElement = $(this)
    })
    $("#container-svg").on("mousedown", function (e) {
        $(this).on("mousemove", function (e) {
            if (!currentElement) return
            currentElement.attr("x", e.offsetX).attr("y", e.offsetY)

            console.log(`x:${e.offsetX};y:${e.offsetY}`)
        })
        $(this).on("mouseup", function (e) {
            $(this).off("mousemove")
            currentElement = null
        })
    })
})