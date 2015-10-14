import CONST from './canvas-const.js';


function scrollPosition(elem) {
    var left = 0,
        top = 0;

    do {
        left += elem.scrollLeft;
        top += elem.scrollTop;
    } while (elem = elem.offsetParent);

    return [left, top];
}

class Canvas {
    constructor(imgElement, options) {

        var parent = imgElement.parentNode;
        var canvasWrapper = document.createElement("div");
        canvasWrapper.className = CONST.CSS.PARENT;
        this.scale = 1;
        parent.insertBefore(canvasWrapper, imgElement);
        parent.removeChild(imgElement);


        var canvasElem = document.createElement("canvas");
        canvasWrapper.appendChild(canvasElem);

        this.canvasElem = canvasElem;

        this.canvasContainer = canvasWrapper;
        this.canvasLeft = canvasElem.offsetLeft;


        this.image = new fabric.Image(imgElement);

        if (options.maxWidth && options.maxWidth < this.image.width) {
            this.scale = options.maxWidth / this.image.width;
        }
        if (options.maxHeight && options.maxHeight < this.image.height) {
            let scaleY = options.maxHeight / this.image.height;
            if (this.scale > scaleY) {
                this.scale = scaleY;
            }
        }

        this.width = this.scale * imgElement.width;
        this.height = this.scale * imgElement.height;

        this.canvas = new fabric.Canvas(canvasElem);

        this.canvas.setDimensions({
            width: this.width,
            height: this.height
        });


        this.image.setScaleX(this.scale);
        this.image.setScaleY(this.scale);

        this.canvas.setBackgroundImage(this.image, this.canvas.renderAll.bind(this.canvas), {});


        if (options.maxWidth && options.maxWidth < this.image.width) {
            this.scale = options.maxWidth / this.image.width;
        }
        if (options.maxHeight && options.maxHeight < this.image.height) {
            let scaleY = options.maxHeight / this.image.height;
            if (this.scale > scaleY) {
                this.scale = scaleY;
            }
        }
        this.width = this.scale * imgElement.width;
        this.height = this.scale * imgElement.height;
    }

    getCanvasTop() {
        return this.canvasContainer.offsetTop;
    }

    enableSelection(isEnabled) {
        this.canvas.selection = isEnabled; // Restore fabricjs selection-box
        this.canvas.forEachObject(function(o) {
            o.selectable = isEnabled;
        });
    }
    getWidth() {
        return this.width;
    }
    getOffsetLeft() {
        return this.canvasLeft - scrollPosition(this.canvasElem)[0];
    }
    getOffsetTop() {
        return this.getCanvasTop() - scrollPosition(this.canvasElem)[1];
    }
}

export default Canvas;
