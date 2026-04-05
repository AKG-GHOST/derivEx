function goToPage2(){
    document.getElementById("page1").classList.remove("active");
    document.getElementById("page2").classList.add("active");

    document.querySelectorAll(".features").forEach(el => {
        el.classList.remove("show");
    });
}

function goToPage3(){
    document.getElementById("page2").classList.remove("active");
    document.getElementById("page3").classList.add("active");

    document.querySelectorAll(".features").forEach(el => {
        el.classList.remove("show");
    });

    setTimeout(() => {
        document.querySelector(".features").classList.add("show");
    }, 200);
}

/* CLOCK LOGIC */
function updateClock() {
    const now = new Date();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours();

    const secDeg = sec * 6;
    const minDeg = min * 6 + sec * 0.1;
    const hrDeg = (hr % 12) * 30 + min * 0.5;

    document.getElementById("second").style.transform =
        `rotate(${secDeg}deg)`;

    document.getElementById("minute").style.transform =
        `rotate(${minDeg}deg)`;

    document.getElementById("hour").style.transform =
        `rotate(${hrDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();