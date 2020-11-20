/************************/
/*       CAROUSEL      */ 
/************************/

 

// Création de la class Carousel
class Carousel {
    constructor() {
        this.container = document.getElementById('carousel');
        this.images = document.querySelectorAll('.carousel__content');
        this.rightButton = document.getElementById('js-carousel__buttons-right');
        this.leftButton = document.getElementById('js-carousel__buttons-left');
        this.pauseButton = document.getElementById('js-carousel__buttons-pause');
        this.playButton = document.getElementById('js-carousel__buttons-play');
        this.currentIndex = 0;
        this.previousIndex = 0;
        // Le mettre en true pour le bouton PlayPause
        this.click = true;

        // Faire tourner le carrousel en init 
        this.intervals = setInterval(this.goRight, 3000);

        // Events pour faire fonctionner carrousel si user clique sur bouton
        this.rightButton.addEventListener('click', this.goRight);
        this.leftButton.addEventListener('click', this.goLeft);
        this.pauseButton.addEventListener('click', this.putPauseOrPlay);
        this.playButton.addEventListener('click', this.putPauseOrPlay);
    }  
    
    // Méthode pour tourner les slides à droite
    goRight = () => {  
        if (this.currentIndex < (this.images.length -1)){
            clearInterval(this.intervals); 
            this.previousIndex = this.currentIndex;
            // Faire avancer le carrousel en itérant
            this.currentIndex++;
            // Mettre la bonne image suivante
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
            this.images[this.previousIndex].classList.remove('first');
        }
        else {
            // Revenir à la première image pour continuer à tourner
            clearInterval(this.intervals); 
            this.previousIndex = this.currentIndex;
            this.currentIndex = 0;
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
            this.images[this.previousIndex].classList.remove('first');
            clearInterval(this.intervals); 
        }  
        // Tourner toutes les 3 secondes
        this.intervals = setInterval(this.goRight, 3000);     
    }

    // Méthode pour tourner les slides à gauche
    goLeft = () => {
        if (this.currentIndex === 0) { 
            clearInterval(this.intervals); 
            this.previousIndex = this.currentIndex;
            this.currentIndex = (this.images.length - 1);
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
            this.images[this.previousIndex].classList.remove('first');
        }
        else {
            clearInterval(this.intervals); 
            this.previousIndex = this.currentIndex;
            this.currentIndex--; 
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
            this.images[this.previousIndex].classList.remove('first');
        }
        this.intervals = setInterval(this.goRight, 3000); 
    }

    // Méthode pour mettre  play et pause sur le carrousel
    putPauseOrPlay = () => {
        // Si user clique sur bouton pendant que carrousel tourne
        if (this.click === true){
            // Déclenche pause
            clearInterval(this.intervals); 
            // Changement du booléen pour prochain click
            this.click = false;
            // Je change l'UI
            this.pauseButton.style.display = 'none';
            this.playButton.style.display = 'block';
        }
        else {
            // Le carrousel repart
            this.click = true;
            this.pauseButton.style.display = 'block';
            this.playButton.style.display = 'none';
            this.intervals = setInterval(this.goRight, 3000);
        }  
    }
}

export default Carousel;