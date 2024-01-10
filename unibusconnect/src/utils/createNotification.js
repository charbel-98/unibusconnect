const elementType = {
    confirmation: `<div class="notification_icon bg-success">
    ✔
  </div>`,
    error: `<div class="notification_icon bg-warning">
    !
  </div>`,
    cancellation: `<div class="notification_icon bg-danger">
  ✖
</div>`,
    reminder: `<div class="notification_icon bg-info">
  ⏰
</div>`,
    discount: `<div class="notification_icon bg-primary">
  50%
</div>`,
    report: `<div class="notification_icon bg-primary">
 ⚠
</div>`
    ,
};

export default function createNotification({ type, message }) {
    console.error("notification", { type, message });
    const notification = document.getElementById("notifications");
    let div = document.createElement("div");
    div.innerHTML = `<div class="notification_message ${type}">
           ${elementType[type]}
          <div class="notification_content">
            <h2 class="notification_title">${type}</h2>
            <p class="notification_description two-lines">${message}</p>
          </div>
        </div>`;

    notification.appendChild(div);
    // Notification sound
    let audio = new Audio('../public/notification.wav');
    audio.onerror = function () {
        console.error('Error playing audio:', audio.error);
    };
    audio.play();

    setTimeout(() => {
        div.classList.add("hide");
        setTimeout(() => {
            div.remove();
        }, 900);
    }, 5000);
};

