const onPointerMove = ({ e, Pointer, player }) => {
    Pointer.x = e.clientX;
    Pointer.y = e.clientY;
    Pointer.rotationFromPlayer = Math.atan2(
        Pointer.x - player.x,
        -(Pointer.y - player.y)
    );
};

export default onPointerMove;
