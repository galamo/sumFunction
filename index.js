

$(function () { //DOM is ready
    const input = $("#listItemValue")
    const addOperation = $("#addListItem")
    const clearOperation = $("#clearList")
    const listContent = $("#list")


    // console.log(listContent.css({ "color": "blue", "fontSize": "40px" }))

    clearOperation.on("click", () => {
        listContent.empty()
    })
    addOperation.on("click", () => {
        const newLi = _getListItem(input.val())
        listContent.append(newLi)
        function _getListItem (value) {
            const cls = 'list-group-item'
            const liMadeByJquery = $('<li></li>').text(value).addClass(cls)
            return liMadeByJquery
        }
    })

})


// const element
// function vHTML (value) {
//     if (typeof value === 'string')
//         element.innerHTML = value
//     return element.innerHTML
// }

// function vCSS () {
//     if (arguments.length === 1);
//     return element.style[ arguments[ 0 ] ]
//     if (arguments.length === 2) {
//         element.style[ arguments[ 0 ] ] = arguments[ 1 ]
//     }
//     if (Array.isArray(arguments[ 0 ]))
//      if (Array.isArray(arguments[ 0 ]))
// }   