const drawEndLine = ({ context, canvas, enemies, endLine }) => {
    if (enemies.length) return;

    console.log("huhh");

    console.log(canvas);
    console.log(endLine);
    console.log(context);

    context.fillStyle = endLine.colour;
    context.fillRect(
        canvas.width - endLine.width,
        0,
        endLine.width,
        canvas.height
    );
};

export default drawEndLine;
