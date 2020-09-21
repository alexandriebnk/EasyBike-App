/************************/
/*       CARROUSEL      */ 
/************************/

 

// Création de la class Carrousel
class Carrousel {
    constructor() {
        this.container = document.getElementById('carrousel');
        this.images = document.querySelectorAll('.carrousel__content');
        this.rightButton = document.getElementById('js-carrousel__buttons-right');
        this.leftButton = document.getElementById('js-carrousel__buttons-left');
        this.pauseButton = document.getElementById('js-carrousel__buttons-pause');
        this.playButton = document.getElementById('js-carrousel__buttons-play');
        this.currentIndex = 0;
        this.previousIndex = 0;
        // Le mettre en true pour le btn PlayPause
        this.click = true;
        // Faire tourner le carrousel en init 
        this.intervalles = setInterval(this.goRight, 3000);

        this.rightButton.addEventListener('click', this.goRight);
        this.leftButton.addEventListener('click', this.goLeft);
        this.pauseButton.addEventListener('click', this.putPauseOrPlay);
        this.playButton.addEventListener('click', this.putPauseOrPlay);
    }  
    
    // Méthode pour tourner les slides à droite
    goRight = () => {  
        if (this.currentIndex < (this.images.length -1)){
            clearInterval(this.intervalles); 
            this.previousIndex = this.currentIndex;
            this.currentIndex++;
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
        }
        else {
            clearInterval(this.intervalles); 
            this.previousIndex = this.currentIndex;
            this.currentIndex = 0;
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
            clearInterval(this.intervalles); 
        }  
        this.intervalles = setInterval(this.goRight, 3000);     
    }

    // Méthode pour tourner les slides à droite
    goLeft = () => {
        if (this.currentIndex === 0){ 
            clearInterval(this.intervalles); 
            this.previousIndex = this.currentIndex;
            this.currentIndex = (this.images.length - 1);
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
        }
        else {
            clearInterval(this.intervalles); 
            this.previousIndex = this.currentIndex;
            this.currentIndex--; 
            this.images[this.currentIndex].classList.add('show');
            this.images[this.previousIndex].classList.remove('show');
        }
        this.intervalles = setInterval(this.goRight, 3000); 
    }

    // Méthode pour mettre  play et pause sur le carrousel
    putPauseOrPlay = () => {
        if (this.click === true){
            clearInterval(this.intervalles); 
            this.click = false;
            this.pauseButton.style.display = 'none';
            this.playButton.style.display = 'block';

        }
        else {
            this.click = true;
            this.pauseButton.style.display = 'block';
            this.playButton.style.display = 'none';
            this.intervalles = setInterval(this.goRight, 3000);
        }  
    }
      


}

export default Carrousel;