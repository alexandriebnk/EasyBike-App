/************************/
/*        CANVAS        */ 
/************************/

class ObjetCanvas {
    constructor() { 
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.validationButtonPopin = document.getElementById('popin__validation');
        this.signatureOk = false;
        this.positionSouris = {x: 0, y: 0};
        this.dernierePosition = this.positionSouris;

        this.validationButtonPopin.disabled = true;

        // Activer la possibilité de déclencher les évènements de la souris 
        this.evenements();
    }

    // Méthode pour déclencher événements souris
    evenements = () => {
        // Dès que le User clique sur la souris
        this.canvas.addEventListener("mousedown", (e) => {
            this.signatureOk = true;
            this.dernierePosition = this.recupPositionSouris(e);
            this.validationButtonPopin.style.backgroundColor = '#56CCCE';
            this.validationButtonPopin.disabled = false;
        })
    
        // Dès que le User bouge la souris en étant toujours en mousedown
        this.canvas.addEventListener("mousemove", (e) => {
            this.positionSouris = this.recupPositionSouris(e);
            this.signatureCanvas();
        })
    
        // Dès que le User arrête le click prolongé
        document.addEventListener("mouseup", (e) => {
            this.signatureOk = false;
        })
    }
    
    // Renvoie les coordonnées de la souris 
    recupPositionSouris(mouseEvent) {
        // Si on enregistre une "mouseDown"
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
    signatureCanvas() {
        // Si on enregistre une "mouseDown"
        if (this.signatureOk) {
            this.context.beginPath();
            this.context.moveTo(this.dernierePosition.x, this.dernierePosition.y);
            this.context.lineTo(this.positionSouris.x, this.positionSouris.y);
            this.context.stroke();
            this.context.strokeStyle = "#a1e8cd";
            this.context.lineWidth = 3;
            this.dernierePosition = this.positionSouris;
        }
    }   
}

export default ObjetCanvas;