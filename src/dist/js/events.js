"use strict";
window.onload = () => {
    init();
    canvas.addEventListener("mousemove", (e) => {
        mouse.x =
            (canvas.width * (e.clientX - canvas.getBoundingClientRect().left)) /
                canvas.width;
        mouse.y =
            (canvas.height * (e.clientY - canvas.getBoundingClientRect().top)) /
                canvas.height;
    });
};
window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() === "shift") {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = false;
});
//# sourceMappingURL=events.js.map