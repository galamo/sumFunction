// const notifications = [
//     { showTime: 1 * 1000, hideTime: 3 * 1000, message: "Check out our new Search!!!" },
//     { showTime: 4 * 1000, hideTime: 6 * 1000, message: "We also have Table display" },
//     { showTime: 10 * 1000, hideTime: 12 * 1000, message: "Hi this is Yoni, call me i am availble at 100" }
// ]

// function startNotifications() {
//     for (let index = 0; index < notifications.length; index++) {
//         const currentNotification = notifications[index];
//         _showModal(currentNotification);
//     }

//     function _showModal({ message, hideTime, showTime }) {
//         setTimeout(() => {
//             const modalId = message.replace(/ /g, "_");
//             document.body.append(getModal(message, modalId))
//             _hideModal(hideTime, modalId);
//         }, showTime);
//     }
//     function _hideModal(hideTime, id) {
//         setTimeout(() => {
//             document.getElementById(id).remove()
//         }, hideTime);
//     }
// }

// function getModal(message, id) {
//     const modal = document.createElement("DIV");
//     const modalContent = document.createElement("DIV");
//     modal.classList.add("modal-internal-2");
//     modalContent.classList.add("modal-content");
//     modalContent.innerText = message;
//     modal.append(modalContent);
//     modal.id = id;
//     return modal;
// }

