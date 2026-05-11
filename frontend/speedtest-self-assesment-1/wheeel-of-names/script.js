const canvas = document.querySelector("canvas");
const btn = document.querySelector("#spin");
const rem = document.querySelector("#remove");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let names = [
    "Ankit",
    "Rahul",
    "Priya",
    "Aman",
    "Riya",
    "Vikas"
];

let rotation = 0;
let spinning = false;
let speed = 0;

function getSliceAngle() {
    return (Math.PI * 2) / names.length;
}

const colors = [
    "#9400D3",
    "#4B0082",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
    "#FF0000",
];



function drawWheel() {

    ctx.save();

    ctx.translate(250, 250);
    ctx.rotate(rotation);
    ctx.translate(-250, -250);

    const sliceAngle = getSliceAngle();

    names.forEach((n, i) => {

        const color = colors[i % colors.length];

        const startAngle = sliceAngle * i;
        const endAngle = startAngle + sliceAngle;

        // slice
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();

        // text
        const middleAngle = startAngle + sliceAngle / 2;

        const x = 250 + Math.cos(middleAngle) * 150;
        const y = 250 + Math.sin(middleAngle) * 150;

        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(middleAngle);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";

        ctx.fillText(n, 0, 0);

        ctx.restore();

    });

    ctx.restore();

    // center circle
    ctx.beginPath();
    ctx.arc(250, 250, 60, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    // pointer
    ctx.beginPath();
    ctx.moveTo(250, 170);
    ctx.lineTo(200, 260);
    ctx.lineTo(300, 260);
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.fill();

    // center text
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";

    ctx.fillText("Spin Now", 250, 255);
}

function getWinner() {

    const sliceAngle = getSliceAngle();

    const normalized =
        (rotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);

    const pointerAngle = (3 * Math.PI) / 2;

    const adjusted =
        (pointerAngle - normalized + Math.PI * 2) % (Math.PI * 2);

    const index = Math.floor(adjusted / sliceAngle);

    return {
        name: names[index],
        index
    };
}

function remove(index) {

    if (index < 0 || index >= names.length) return;

    names.splice(index, 1);

    // reset remove button
    rem.textContent = "Remove";
    rem.removeAttribute("data-user-id");

    // clear result
    document.querySelector("#result").innerHTML = "";

    // reset rotation if list becomes empty
    if (names.length === 0) {
        rotation = 0;
    }
}

function animate() {

    ctx.clearRect(0, 0, 500, 500);

    rotation += speed;

    speed *= 0.98;

    if (speed < 0.002 && spinning) {

        speed = 0;
        spinning = false;

        if (names.length > 0) {

            const { name, index } = getWinner();

            const res = document.querySelector("#result");

            res.innerHTML =
                `<h1 class="heading">The Winner is ${name}</h1>`;

            rem.textContent = `Remove ${name}`;

            rem.setAttribute("data-user-id", index);
        }
    }

    if (names.length > 0) {
        drawWheel();
    }

    requestAnimationFrame(animate);
}

btn.addEventListener("click", () => {

    if (spinning) return;

    if (names.length === 0) {
        alert("No names left");
        return;
    }

    spinning = true;

    speed = Math.random() * 0.3 + 0.25;
});

rem.addEventListener("click", () => {

    const index =
        parseInt(rem.getAttribute("data-user-id"));

    if (isNaN(index)) return;

    remove(index);
});

animate();