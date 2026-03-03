// en simpel Sprite-klasse som opgave 6 kræver
class Sprite {
    constructor(src, x, y, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = 'lightgray';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    contains(mx, my) {
        return mx >= this.x && mx <= this.x + this.width &&
               my >= this.y && my <= this.y + this.height;
    }
}

// Vent til DOM'en er fuldt indlæst
document.addEventListener('DOMContentLoaded', () => {
    
    // Hent canvas og dets 2D kontekst
    const canvas = document.getElementById('canvas');
    const c = canvas.getContext('2d');

    // i stedet for en bold bruger vi nu en Sprite med et billede
    const sprite = new Sprite('images/laughing-emoji-ai-generative-free-png-2238943652.png',
                              100, 100, 60, 60);

    // Tilstandsvariabler til drag-and-drop
    let isDragging = false;
    // Forskel mellem musens position og sprites øverste venstre hjørne
    let offsetX = 0;
    let offsetY = 0;

    // Tegn sprite på canvas
    function drawSprite() {
        // Ryd canvas
        c.clearRect(0, 0, canvas.width, canvas.height);
        sprite.draw(c);
    }

    // Hjælpefunktion til at få musekoordinater i forhold til canvas
    function getMouseCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    // Begræns sprite-positionen til canvas
    function constrainSprite() {
        sprite.x = Math.max(0, Math.min(canvas.width - sprite.width, sprite.x));
        sprite.y = Math.max(0, Math.min(canvas.height - sprite.height, sprite.y));
    }

    // Hjælpefunktion til at stoppe dragging
    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            drawSprite();
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        const mouse = getMouseCoordinates(e);

        if (sprite.contains(mouse.x, mouse.y)) {
            isDragging = true;
            offsetX = mouse.x - sprite.x;
            offsetY = mouse.y - sprite.y;
            drawSprite();
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const mouse = getMouseCoordinates(e);
        sprite.x = mouse.x - offsetX;
        sprite.y = mouse.y - offsetY;
        constrainSprite();
        drawSprite();
    });

    canvas.addEventListener('mouseup', () => stopDragging());
    canvas.addEventListener('mouseleave', () => stopDragging());

    drawSprite();

}); // Slut på DOMContentLoaded