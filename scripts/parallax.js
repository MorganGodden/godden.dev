var body = document.querySelector("body");
var curX = 0, curY = 0, finX = 0, finY = 0;


requestAnimationFrame(updatePositions);

function updatePositions() {
    curX = lerp(curX, finX, 0.25);
    curY = lerp(curY, finY, 0.25);

    body.style.setProperty("--x", "calc(-4vw + " + curX + "px/40)"); 
    body.style.setProperty("--y", "calc(-4vh + " + curY + "px/40)");

    requestAnimationFrame(updatePositions);
}

function updateValues(event) {
    finX = event.pageX;
    finY = event.pageY;
}

function lerp (from, to, t) {
    return (1-t)*from+t*to;
}

// Register events
var events = ["mousemove", "mouseenter", "mouseleave", "touchmove", "touchend", "touchstart"];
for(let i = 0; i < events.length; i++) {
    document.addEventListener(events[i], updateValues, false);
}