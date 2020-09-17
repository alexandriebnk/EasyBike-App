/************************/
/*       CARROUSEL      */ 
/************************/

// Création de la class Carrousel
class Carrousel {
    constructor() {
        this.slides = ['img-carrousel-1.png', 'img/img-carrousel-2.jpg','img/img-carrousel-3.jpg','img/img-carrousel-4.jpg'];
        this.image = document.getElementById("js-carrousel__content");
        this.boutonDroite = document.getElementById("js-carrousel__buttons-right");
        this.boutonGauche = document.getElementById("js-carrousel__buttons-left");
        this.boutonPause = document.getElementById("js-carrousel__buttons-pause");
        this.currentIndex = 0;
        this.previousIndex = 0;
            
        // Afficher les slides dans l'ordre
        this.ajusterLesSlides();

        // Faire tourner le carrousel en init 
        this.intervalles = setInterval(this.tournerDroite, 5000);
        // Le mettre en true pour le btn PlayPause
        this.click = true;

        // Evenements pour chaque bouton du carrousel
        this.boutonGauche.addEventListener("click", this.tournerGauche);
        this.boutonDroite.addEventListener("click", this.tournerDroite);
        this.boutonPause.addEventListener("click", this.activerPausePlay);
        // Evenement pour tourner carrousel via touche clavier
        window.addEventListener("keydown", this.appuyerClavier);
    }

    // Méthode pour tourner le carrousel via touche du clavier
    appuyerClavier = (e) => {
        switch (e.keyCode) {
            case 39:
                this.tournerDroite();
                break;
            case 37:
                this.tournerGauche();
                break;
            case 32:
                this.activerPausePlay();
                break;
            default:
                break;
        }
    }

    // Méthode pour afficher la bonne slide
    ajusterLesSlides = () => {
        this.image.src = this.slides[this.currentIndex];
    }

    // Méthode pour tourner les slides à droite
    tournerDroite = () => {  
        if (this.currentIndex < (this.slides.length -1)){
            this.previousIndex = this.currentIndex;
            this.currentIndex++;
        }
        else {
            this.previousIndex = this.currentIndex;
            this.currentIndex = 0;
        }
        this.ajusterLesSlides();            
    }

    // Méthode pour tourner les slides à droite
    tournerGauche = () => {
        if (this.currentIndex === 0){ 
            this.previousIndex = this.currentIndex;
            this.currentIndex = (this.slides.length - 1);
        }
        else {
            this.previousIndex = this.currentIndex;
            this.currentIndex--; 
        }
        this.ajusterLesSlides();
    }

    // Méthode pour mettre  play et pause sur le carrousel
    activerPausePlay = () => {
        if (this.click === true){
            clearInterval(this.intervalles); 
            this.click = false;
        }
        else {
            this.click = true;
            this.intervalles = setInterval(this.tournerDroite, 5000);
        }  
    }
}

export default Carrousel;