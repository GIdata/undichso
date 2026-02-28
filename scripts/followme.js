let mouseX, mouseY;
let speed = 0.1;
let freeze = false;
function moveElements() {
    if (!mouseX || !mouseY || freeze) return;

    let elements = document.getElementsByClassName("follow-me");
    for (const element of elements) {

        let rect = element.getBoundingClientRect();
        centerX = rect.x + rect.width / 2
        centerY = rect.y + rect.height / 2

        const deltaX = (mouseX - centerX);
        const deltaY = (mouseY - centerY);

        const newTop = rect.y + deltaY * speed;
        const newLeft = rect.x + deltaX * speed;

        element.style.top = `${newTop}px`;
        element.style.left = `${newLeft}px`;
    }
}

addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

addEventListener("wheel", (e) => {
    if (!e.wheelDelta) return;
    if (e.wheelDelta > 0) {
        speed += 0.01;
    } else {
        speed -= 0.01;
    }
});

addEventListener("mousedown", (e) => freeze = true);
addEventListener("mouseup", (e) => freeze = false);

setInterval(moveElements, 1000 / 30);

for (const e of document.getElementsByClassName("follow-me")) {
    e.style.position = "absolute"
}