// ES5-prototype-baseret løsning (opgave 6a)
// Én klasse (funktion) kaldet Sprite som håndterer billede, position,
// størrelse og alle mus‑events (drag & drop) internt.

function Sprite(src, canvas, x, y, width, height) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = new Image();
    this.image.src = src;
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;

    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    var self = this;
    this.image.onload = function() {
        if (self.width === 0) self.width = self.image.width;
        if (self.height === 0) self.height = self.image.height;
        self.draw();
    };

    canvas.addEventListener('mousedown', function(e) { self._onMouseDown(e); });
    canvas.addEventListener('mousemove', function(e) { self._onMouseMove(e); });
    canvas.addEventListener('mouseup', function() { self._onMouseUp(); });
    canvas.addEventListener('mouseleave', function() { self._onMouseUp(); });
}

Sprite.prototype._getMouse = function(e) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
};

Sprite.prototype._constrain = function() {
    this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x));
    this.y = Math.max(0, Math.min(this.canvas.height - this.height, this.y));
};

Sprite.prototype._onMouseDown = function(e) {
    var m = this._getMouse(e);
    if (this.contains(m.x, m.y)) {
        this.dragging = true;
        this.offsetX = m.x - this.x;
        this.offsetY = m.y - this.y;
        this.draw();
    }
};

Sprite.prototype._onMouseMove = function(e) {
    if (!this.dragging) return;
    var m = this._getMouse(e);
    this.x = m.x - this.offsetX;
    this.y = m.y - this.offsetY;
    this._constrain();
    this.draw();
};

Sprite.prototype._onMouseUp = function() {
    if (this.dragging) {
        this.dragging = false;
        this.draw();
    }
};

Sprite.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.image.complete) {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

Sprite.prototype.contains = function(mx, my) {
    return mx >= this.x && mx <= this.x + this.width &&
           my >= this.y && my <= this.y + this.height;
};

// applikation
window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');
    new Sprite(
        'images/laughing-emoji-ai-generative-free-png-2238943652.png',
        canvas,
        100, 100, 60, 60
    );
});