const writeComment = () => {
    let paragraph = document.createElement('p');
    paragraph.style.cssText = `
        display: flex;
        justify-content: center;
        width: 100%;
        font-weight: 700;
    `;
    paragraph.innerHTML = `
        Because of high load of cors-anywhere
        it's needed to press button "Request temporary access"
        &nbsp;
        <a href="https://cors-anywhere.herokuapp.com/corsdemo">here</a>
    `;
    document.body.appendChild(paragraph);
};

const createCanvas = () => {
    let canv = document.createElement('canvas');
    canv.id = "collage";
    canv.width = 400;
    canv.height = 400;
    canv.style.cssText = `
        border: 1px solid black;
        margin: auto;
        display: block;
        box-shadow: 0 0 20px black;
    `;
    document.body.appendChild(canv);
    return canv;
};

const addImageToCanvas = (width, height, ctx, coords) => {
    const img = new Image;
    img.crossOrigin = 'anonymous';
    img.src = 'https://source.unsplash.com/random/' + width + 'x' + height;
    img.onload = () => ctx.drawImage(img, coords.x, coords.y);
};

const createDownloadButton = (canvas) => {
    let ref = document.createElement('a');
    ref.href = canvas.toDataURL();
    ref.textContent = "Download collage";
    ref.download = "collage.png";
    ref.style.cssText = `
        background-color: green;  
        border-radius: 5px;
        color: white;
        padding: 8px;
        text-decoration: none;
        display: block;
        margin: auto;
        width: 200px;
        text-align: center;
        margin-top: 30px;
    `;
    document.body.appendChild(ref);
};

const writeText = (ctx) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=ru', true);
    xhr.onload = () => {
        const words = xhr.responseText.split(" ");
        const countWords = words.length;
        window.onload = () => {
            ctx.font = "bold 16pt Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.shadowColor = "black";
            ctx.shadowOffsetX = 4;
            ctx.shadowOffsetY = 4;
            ctx.shadowBlur = 4;
            let marginLeft = 20;
            if (countWords < 15){ var marginTop = 190; }
            else if (countWords < 20){ var marginTop = 170; }
            else { var marginTop = 150; }
            let lineHeight = 25;
            let line = "";
            for (let n = 0; n < countWords; n++) {
                let testLine = line + words[n] + " ";
                let testWidth = ctx.measureText(testLine).width;
                if (testWidth > 380) {
                    ctx.fillText(line, marginLeft, marginTop);
                    line = words[n] + " ";
                    marginTop += lineHeight;
                }
                else { line = testLine; }
            }
            ctx.fillText(line, marginLeft, marginTop);
        };
    }
    xhr.onerror = () => writeComment();
    xhr.send(null);
};

const createDemotivator = () => {
    let canvas = createCanvas();
    let ctx = canvas.getContext("2d");
    const rand_x = Math.floor(Math.random()*200 + 100);
    const rand_y = Math.floor(Math.random()*200 + 100);
    addImageToCanvas(rand_x, rand_y, ctx, { x: 0, y: 0 });
    addImageToCanvas(400 - rand_x, 400 - rand_y, ctx, { x: rand_x, y: rand_y });
    addImageToCanvas(rand_x, 400 - rand_y, ctx, { x: 0, y: rand_y });
    addImageToCanvas(400 - rand_x, rand_y, ctx, { x: rand_x, y: 0 });

    createDownloadButton(canvas);
    writeText(ctx);
}

createDemotivator();