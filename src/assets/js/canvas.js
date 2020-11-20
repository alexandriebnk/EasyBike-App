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

        // Désactiver bouton validation si pas de signature
        this.validationButtonPopin.disabled = true;

        // Activer la possibilité de déclencher les évènements de la souris 
        this.activateEvents();
    }

    // Méthode pour déclencher événements souris
    activateEvents = () => {
        // Quand user clique sur la souris
        this.canvas.addEventListener('mousedown', (e) => {
            // Changer le booléen qui permet déclenchement de la signature
            this.signatureOk = true;
            // Suivre position de la souris pour savoir la fin du tracé
            this.lastPosition = this.getMousePosition(e);
            // Activer bouton de validation
            this.validationButtonPopin.style.backgroundColor = '#56CCCE';
            this.validationButtonPopin.disabled = false;
        })
    
        // Quand user bouge la souris en étant toujours en mousedown
        this.canvas.addEventListener('mousemove', (e) => {
            // Enregistrer positon de la souris
            this.mousePosition = this.getMousePosition(e);
            // Permettre la signature sur le canvas
            this.canvasSignature();
        })
    
        // Quand user arrête le click prolongé
        document.addEventListener('mouseup', (e) => {
            // Changer le booléen qui permet déclenchement de la signature
            this.signatureOk = false;
        })
    }
    
    // Méthode pour renvoyer les coordonnées de la souris 
    getMousePosition = (mouseEvent) => {
        console.log("1")
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
    
    // Méthode pour signer sur canvas
    canvasSignature = () => {
        console.log("2")
        // Si on enregistre une 'mouseDown'
        if (this.signatureOk) {
            // Construction de la zone du canvas + définition du style
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