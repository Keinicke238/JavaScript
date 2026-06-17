// ES6-klassebaseret løsning (opgave 6b)
// Én klasse kaldet Sprite, som indeholder billede, størrelse,
// position og alt drag-&-drop‑logik i metoder og interne event handlers.

class Sprite {
    constructor(src, canvas, x = 0, y = 0, width = 0, height = 0) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;

        this.image.onload = () => {
            if (this.width === 0) this.width = this.image.width;
            if (this.height === 0) this.height = this.image.height;
            this.draw();
        };

        canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
        canvas.addEventListener('mousemove', this._onMouseMove.bind(this));
        canvas.addEventListener('mouseup', this._onMouseUp.bind(this));
        canvas.addEventListener('mouseleave', this._onMouseUp.bind(this));
    }

    _getMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    _constrain() {
        this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x));
        this.y = Math.max(0, Math.min(this.canvas.height - this.height, this.y));
    }

    _onMouseDown(e) {
        const m = this._getMouse(e);
        if (this.contains(m.x, m.y)) {
            this.dragging = true;
            this.offsetX = m.x - this.x;
            this.offsetY = m.y - this.y;
            this.draw();
        }
    }

    _onMouseMove(e) {
        if (!this.dragging) return;
        const m = this._getMouse(e);
        this.x = m.x - this.offsetX;
        this.y = m.y - this.offsetY;
        this._constrain();
        this.draw();
    }

    _onMouseUp() {
        if (this.dragging) {
            this.dragging = false;
            this.draw();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.image.complete) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    contains(mx, my) {
        return mx >= this.x && mx <= this.x + this.width &&
               my >= this.y && my <= this.y + this.height;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    new Sprite(
        'images/laughing-emoji-ai-generative-free-png-2238943652.png',
        canvas,
        120, 80, 70, 70
    );
});