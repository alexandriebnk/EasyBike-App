/************************/
/*        CANVAS        */ 
/************************/

class ObjetCanvas {
    constructor() { 
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.validationButtonPopin = document.getElementById('popin__validation');
        this.signatureOk = false;
        this.mousePosition = {x: 0, y: 0};
        this.lastPosition = this.mousePosition;

        this.validationButtonPopin.disabled = true;

        // Activer la possibilité de déclencher les évènements de la souris 
        this.activateEvents();
    }

    // Méthode pour déclencher événements souris
    activateEvents = () => {
        // Dès que le User clique sur la souris
        this.canvas.addEventListener('mousedown', (e) => {
            this.signatureOk = true;
            this.lastPosition = this.getMousePosition(e);
            this.validationButtonPopin.style.backgroundColor = '#56CCCE';
            this.validationButtonPopin.disabled = false;
        })
    
        // Dès que le User bouge la souris en étant toujours en mousedown
        this.canvas.addEventListener('mousemove', (e) => {
            this.mousePosition = this.getMousePosition(e);
            this.canvasSignature();
        })
    
        // Dès que le User arrête le click prolongé
        document.addEventListener('mouseup', (e) => {
            this.signatureOk = false;
        })
    }
    
    // Renvoie les coordonnées de la souris 
    getMousePosition(mouseEvent) {
        // Si on enregistre une 'mouseDown'
        if (this.signatureOk) {
            // Variable qui définit la taille du canvas 
            let oRect = this.canvas.getBoundingClientRect();
            return {
                // X = la position quand le User clic - la margin-left du canvas
                x: mouseEvent.clientX - oRect.left,
                // Y = la position quand le User clic - la margin-top du canvas
                y: mouseEvent.clientY - oRect.top
            };
        }
    }
    
    // Dessin du canvas
    canvasSignature() {
        // Si on enregistre une 'mouseDown'
        if (this.signatureOk) {
            this.context.beginPath();
            this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.context.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.context.stroke();
            this.context.strokeStyle = '#56CCCE';
            this.context.lineWidth = 3;
            this.lastPosition = this.mousePosition;
        }
    }   
}

export default ObjetCanvas;