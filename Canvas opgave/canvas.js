// Vent til DOM'en er fuldt indlæst
document.addEventListener('DOMContentLoaded', () => {
    
    // Hent canvas og dets 2D kontekst
    const canvas = document.getElementById('canvas');
    const c = canvas.getContext('2d');

    // Boldens egenskaber
    let ball = {
        x: 100,
        y: 100,
        radius: 30,
        color: 'red',
        draggingColor: 'blue'
    };

    // Tilstandsvariabler til drag-and-drop
    let isDragging = false;
    // Forskel mellem musens position og boldens centrum
    let offsetX = 0;
    let offsetY = 0;

    // Tegn bolden på canvas
    function drawBall() {
        // Ryd canvas
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        // Tegn bolden
        c.beginPath();
        c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        c.fillStyle = isDragging ? ball.draggingColor : ball.color;
        c.fill();
        c.strokeStyle = 'black';
        c.stroke();
    }

    // Tjek om musen er inden for bolden
    function isMouseInBall(mouseX, mouseY) {
        // Brug Math.hypot for klar og effektiv beregning af afstand
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        //hypot returnerer kvadratroden af summen af kvadraterne, 
        // hvilket er den direkte afstand mellem mus og boldens centrum
        return Math.hypot(dx, dy) <= ball.radius;
    }

    // Hjælpefunktion til at få musekoordinater i forhold til canvas
    function getMouseCoordinates(e) {
        // getboundingclientrect returns the size of an element and its position
        // relative to the viewport, used to get mouse coordinates relative to canvas
        const rect = canvas.getBoundingClientRect();
        return {
            //minus rect.left and rect.top to get relative to canvas
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    // Begræns boldens position til canvas, minus bold radius 
    function constrainBallPosition() {
        ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }

    // Hjælpefunktion til at stoppe dragging - undgår duplikat kode i events
    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            drawBall();
        }
    }

    // MOUSEDOWN - Når musen trykkes ned
    canvas.addEventListener('mousedown', (e) => {
        const mouse = getMouseCoordinates(e);

        // Tjek om musen er inden i bolden
        if (isMouseInBall(mouse.x, mouse.y)) {
            isDragging = true;
            
            // Beregn offset - afstanden fra mus til boldens centrum
            offsetX = mouse.x - ball.x;
            offsetY = mouse.y - ball.y;
            
            drawBall();
        }
    });

    // MOUSEMOVE - Når musen flyttes
    canvas.addEventListener('mousemove', (e) => {
        // Ignorer hvis vi ikke er i gang med at trække
        if (!isDragging) return;

        const mouse = getMouseCoordinates(e);

        // Opdater boldens position (træk offset fra så bolden ikke hopper)
        ball.x = mouse.x - offsetX;
        ball.y = mouse.y - offsetY;

        // Sørg for at bolden ikke kommer uden for canvas
        constrainBallPosition();

        // Tegn bolden på ny position
        drawBall();
    });

    // MOUSEUP - Når musen slippes
    canvas.addEventListener('mouseup', () => {
        stopDragging();
    });

    // MOUSELEAVE - Hvis musen forlader canvas mens vi trækker
    canvas.addEventListener('mouseleave', () => {
        stopDragging();
    });

    // Tegn bolden første gang
    drawBall();

}); // Slut på DOMContentLoaded