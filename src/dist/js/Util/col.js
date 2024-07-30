"use strict";
function colCheck(shapeA, shapeB, moveShapeA = true) {
    var vX = shapeA.position.x + shapeA.size.x / 2 - (shapeB.position.x + shapeB.size.x / 2), vY = shapeA.position.y + shapeA.size.y / 2 - (shapeB.position.y + shapeB.size.y / 2), hWidths = shapeA.size.x / 2 + shapeB.size.x / 2, hHeights = shapeA.size.y / 2 + shapeB.size.y / 2, colDir = null;
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