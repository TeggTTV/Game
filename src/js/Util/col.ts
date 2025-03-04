type Thing = {
    position: Vector,
    size: Vector
};

function colCheck(shapeA: Thing, shapeB: Thing, moveShapeA = true) {
    // get the vectors to check against
    var vX = shapeA.position.x + shapeA.size.x / 2 - (shapeB.position.x + shapeB.size.x / 2),
        vY = shapeA.position.y + shapeA.size.y / 2 - (shapeB.position.y + shapeB.size.y / 2),
        // add the half widths and half heights of the objects
        hWidths =  shapeA.size.x / 2 + shapeB.size.x / 2,
        hHeights = shapeA.size.y / 2 + shapeB.size.y / 2,
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) <= hWidths && Math.abs(vY) <= hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                if (moveShapeA) shapeA.position.y += oY;
            } else {
                colDir = "b";
                if (moveShapeA) shapeA.position.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if (moveShapeA) shapeA.position.x += oX;
            } else {
                colDir = "r";
                if (moveShapeA) shapeA.position.x -= oX;
            }
        }
    }
    return colDir;
}
