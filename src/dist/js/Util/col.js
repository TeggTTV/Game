"use strict";
function colCheck(shapeA, shapeB, moveShapeA = true) {
    var vX = shapeA.position.x + tileWidth / 2 - (shapeB.position.x + tileWidth / 2), vY = shapeA.position.y + tileHeight / 2 - (shapeB.position.y + tileHeight / 2), hWidths = tileWidth / 2 + tileWidth / 2, hHeights = tileHeight / 2 + tileHeight / 2, colDir = null;
    if (Math.abs(vX) <= hWidths && Math.abs(vY) <= hHeights) {
        var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                if (moveShapeA)
                    shapeA.position.y += oY;
            }
            else {
                colDir = "b";
                if (moveShapeA)
                    shapeA.position.y -= oY;
            }
        }
        else {
            if (vX > 0) {
                colDir = "l";
                if (moveShapeA)
                    shapeA.position.x += oX;
            }
            else {
                colDir = "r";
                if (moveShapeA)
                    shapeA.position.x -= oX;
            }
        }
    }
    return colDir;
}
//# sourceMappingURL=col.js.map