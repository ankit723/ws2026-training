const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const input = document.getElementById("textInput");

canvas.width = 1200;
canvas.height = 300;

const DOT_SIZE = 4;
const GAP = 2;

function renderMatrixText(text){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Temporary hidden canvas
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Draw text normally first
    tempCtx.fillStyle = "white";

    // VERY IMPORTANT
    tempCtx.font = "  bold 180px Arial";

    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";

    tempCtx.fillText(
        text,
        tempCanvas.width / 2,
        tempCanvas.height / 2
    );

    // Read pixels
    const imageData = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
    );

    const pixels = imageData.data;

    // Convert pixels to dots
    for(let y = 0; y < tempCanvas.height; y += DOT_SIZE + GAP){

        for(let x = 0; x < tempCanvas.width; x += DOT_SIZE + GAP){

            const index = (y * tempCanvas.width + x) * 4;

            const r = pixels[index];

            // If pixel exists
            if(r > 50){

                ctx.beginPath();

                ctx.arc(x, y, DOT_SIZE/3, 0, Math.PI * 2);

                ctx.fillStyle = "#3e5eec";

                ctx.shadowColor = "#3e5eec";
                ctx.shadowBlur = 15;

                ctx.fill();
            }
            else{

                ctx.beginPath();

                ctx.arc(x, y, DOT_SIZE / 2, 0, Math.PI * 2);

                ctx.fillStyle = "#00000073";

                ctx.fill();
            }
        }
    }
}

renderMatrixText("HELLO");

input.addEventListener("input", (e)=>{

    renderMatrixText(e.target.value);
});