/************************/
/*        CANVAS        */ 
/************************/

class ObjetCanvas {
    constructor() { 
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.btnOK = document.querySelector(".btn-ok");
        this.signer = false;
        this.positionSouris = {x: 0, y: 0};
        this.dernierePosition = this.positionSouris;

        // Activer la possibilité de déclencher les évènements de la souris 
        this.evenements();
    }

    // Méthode pour déclencher événements souris
    evenements = () => {
        // Dès que le User clique sur la souris
        this.canvas.addEventListener("mousedown", (e) => {
            this.signer = true;
            this.dernierePosition = this.recupPositionSouris(e);
            this.btnOK.style.display = "block";
        })
    
        // Dès que le User bouge la souris en étant toujours en mousedown
        this.canvas.addEventListener("mousemove", (e) => {
            this.positionSouris = this.recupPositionSouris(e);
            this.signatureCanvas();
        })
    
        // Dès que le User arrête le click prolongé
        document.addEventListener("mouseup", (e) => {
            this.signer = false;
        })
    }
    
    // Renvoie les coordonnées de la souris 
    recupPositionSouris(mouseEvent) {
        // Si on enregistre une "mouseDown"
        if (this.signer) {
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
        if (this.signer) {
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