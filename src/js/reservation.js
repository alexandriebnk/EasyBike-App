/************************/
/*      RESERVATION     */ 
/************************/

import Map from './map';
import ObjetCanvas from './canvas';

class Reservation {
    constructor() {
        // UI 
        this.map = document.getElementById('js-map');
        this.address = document.getElementById('js-reservation__address');
        this.bikesNumber = document.getElementById('js-reservation__illustrations-number');
        this.inputSurname = document.getElementById('form__surname-input');
        this.inputName = document.getElementById('form__name-input');
        this.bookingButton = document.getElementById('js-form__submit');
        this.footer = document.getElementById('footer');
        // Datas
        this.correctSurname = null;
        this.correctName = null;
        this.bikeAvailable = null;
        this.minutes = 19;
        this.seconds = 59;
        this.addressValue = null;
        // Canvas
        this.popIn = document.getElementById('popin');
        this.popInOverlay = document.getElementById('popin__overlay');
        this.validationButtonPopin = document.getElementById('popin__validation');
        // Reservation
        this.bookingArea = document.getElementById('section-booking');
        this.minutesParagraph = document.getElementById('minutes-paragraph');
        this.secondsParagraph = document.getElementById('seconds-paragraph');
        this.registeredAddress = document.getElementById('userInfos__registered-address');
        this.userName = document.getElementById('userInfos__registered-userName');
        this.userSurname = document.getElementById('userInfos__registered-userSurname');
        this.cancelButton = document.getElementById('cancel__button');

        // Instance de la classe MAP
        this.maMap = new Map(); 

        // Afficher la resa en cours si refresh 
        this.keepBookingRunning();

        // Ne pas permettre de réservation sans infos
        this.bookingButton.disabled = true;

        // Event sur les inputs nom et prénom
        this.inputSurname.addEventListener('input', () => { 
            this.checkRegExInput(this.inputSurname, 'userSurname');
        })

        this.inputName.addEventListener('input', () => { 
            this.checkRegExInput(this.inputName, 'userName');  
        })

        // Event pour sélection station 
        this.map.addEventListener('click', this.selectStation);

        // Evenement au clic du btnReserver 
        this.bookingButton.addEventListener('click', (e) => {
            // Eviter refresh quand click
            e.preventDefault();     
            this.afficherCanvas(); 
        })

        // Evenement au clic du boutonOK du CANVAS
        this.validationButtonPopin.addEventListener('click', (e) => {
            // Eviter refresh quand click
            e.preventDefault();
            // Faire disparaitre le CANVAS
            // Désactiver la possibilité de reserver à nouveau
            this.changeStylePopin('none', 'none', 'none', 'none', '-40');
            // Afficher RESERVATION 
            this.changeStyleBooking();
            this.inputSurname.value = '';
            this.inputName.value = '';
           // Retirer NOM et PRENOM des input quand affichage resa (esthétique)
            this.inputSurname.removeAttribute(localStorage.getItem('userSurname'));
            this.inputName.removeAttribute(localStorage.getItem('userName'));
            // Démarrer le compteur
            this.countdown();
            // Récupérer les infos de la station sélectionnée pour les afficher
            this.userSurname.innerHTML = localStorage.getItem('userSurname');
            this.userName.innerHTML = localStorage.getItem('userName');
            this.addressValue = this.maMap.currentStation.address;
            this.registeredAddress.innerHTML = this.addressValue.toLowerCase();
            // Stocker en sessionStorage l'adresse
            sessionStorage.setItem('addressValue', this.addressValue);
            this.maMap.displayReservedIcon();
        })

        // Evenement si j'annule le compteur
        this.cancelButton.addEventListener('click', () => {
            this.cancelCountdown(); 
            // Reload page pour nouveau CANVAS sans signature déjà faite
            document.location.reload(true);
        })
    }

    // Méthode pour sélectionner station avec vélos disponibles
    selectStation = () => {
        if (this.maMap.currentStation) {
            if (this.maMap.currentStation.available_bikes) {
                this.bikeAvailable = true;
                this.activateButtonBooking();
            } else {
                this.bikeAvailable = false;
                this.activateButtonBooking();
            }
        }
    }

    // Méthode regEx vérification infos user
    checkRegExInput = (input, storageName) => {
        let regEx = /^[A-Za-zàäâéèëêïîôùüÿçœ\'-]+$/;

        if (input.value.length == 0) {
            input.style.borderBottom = '1px solid #CACACA';
            this.checkStateInput(false, storageName);
        } else if(!regEx.test(input.value) || input.value.length <= 1) {
            input.style.borderBottom = '1px solid #F20746';
            input.style.color = '#F20746';
            this.checkStateInput(false, storageName);
        } else {
            input.style.borderBottom = '1px solid #56CCCE';
            input.style.color = '#56CCCE';
            this.checkStateInput(true, storageName);
            // Récupérer items (nom/prénom) tapés par USER + localStorage
            localStorage.setItem(storageName, input.value);
        } 
        this.activateButtonBooking();
    }

    // Méthode pour valider état de l'input
    checkStateInput = (state, storageName) => {
        if (storageName === 'userName') {
            this.correctName = state;
        } else if (storageName === 'userSurname') {
            this.correctSurname = state;
        } 
    }

    // Méthode activation bouton réserver
    activateButtonBooking = () => {
        if (this.correctName == true && this.correctSurname == true && this.bikeAvailable == true && this.bookingArea.style.display != 'flex') {
            this.bookingButton.disabled = false;
            this.bookingButton.style.backgroundColor = '#56CCCE';
        } else {
            this.bookingButton.disabled = true;
            this.bookingButton.style.backgroundColor = '#CACACA';
        }
    }

    // Méthode pour afficher Canvas 
    afficherCanvas = () => {
        this.changeStylePopin('flex', 'block', 'fixed', 'rgba(0, 0, 0, 0.5)', '2000');
        let leCanvas = new ObjetCanvas();
    }

    // Méthode pour changement UI pendant popIn
    changeStylePopin = (displayPopin, displayOverlay, position, bg, zindexOverlay) => {
        this.popIn.style.display = displayPopin;
        this.popInOverlay.style.display = displayOverlay;
        this.popInOverlay.style.position = position;
        this.popInOverlay.style.backgroundColor = bg;
        this.popInOverlay.style.zIndex = zindexOverlay;
    }

    // Méthode pour changer UI pendant booking
    changeStyleBooking = () => {
        this.bookingArea.style.display = 'flex';
        this.bookingArea.style.zIndex = '1000';
        this.inputName.style.borderBottom = '1px solid #CACACA';
        this.inputSurname.style.borderBottom = '1px solid #CACACA';
        this.bookingButton.style.backgroundColor = '#CACACA';
        this.bikesNumber.innerHTML = '0';
        this.address.innerHTML = 'Adresse de la station';
        this.bikesNumber.style.color = '#8D8D8D';
        this.address.style.color = '#8D8D8D';
    }

    // Méthode pour afficher, faire tourner et disparaitre le compteur (si fini)
    countdown = () => {
        // Afficher pa défaut les valeurs du compteur
        this.minutesParagraph.innerHTML = this.minutes;
        this.secondsParagraph.innerHTML = this.seconds;
        // Stocker la valeur de la première minute
        this.stockDatasMinutes();

        // Créer une intervale pour décrémenter temps
        this.intervalToClear = setInterval(() => {
            if (this.seconds >= 1) {
                this.seconds--;
                // Afficher nouvelle seconde
                this.secondsParagraph.innerHTML = this.seconds;
                // Stocker données de chaque dernière seconde
                this.stockDatasSeconds();
                // Mettre un zero en plus (esthétique)
                if (this.seconds < 10) {
                     this.secondsParagraph.innerHTML = '0' + this.seconds;
                }
            } else {
                // Si seconde = 0 elle se réinitialise
                this.seconds = 59;
                this.secondsParagraph.innerHTML = this.seconds;
                if (this.minutes > 0){
                    this.minutes--;
                    // Afficher nouvelle minute
                    this.minutesParagraph.innerHTML = this.minutes;
                    // Stocker données de chaque dernière minute
                    this.stockDatasMinutes();
                    // Mettre un zero en plus (esthétique)
                    if (this.minutes < 10) {
                        this.minutesParagraph.innerHTML = '0' + this.minutes;
                    }
                } 
            }
            if (this.minutes == 0 && this.seconds == 0) {
                // Désactiver la résa (qui est finie)
                clearInterval(this.intervalToClear);
                this.bookingArea.style.display = 'none';
            }
        }, 1000);
    }  

    // Méthode pour stocker données MINUTES dans sessionStorage 
    stockDatasMinutes = () => {
        sessionStorage.setItem('minutes', this.minutes);
    }
        
    // Méthode pour stocker données SECONDES dans sessionStorage
    stockDatasSeconds = () => {
        sessionStorage.setItem('seconds', this.seconds);
    }

    // Méthode pour réafficher resa en cours si refresh page
    keepBookingRunning = () => {
        if (localStorage.getItem('userSurname') 
            && localStorage.getItem('userName')
            && sessionStorage.getItem('addressValue')
            && sessionStorage.getItem('minutes')
            && sessionStorage.getItem('seconds')) {
            // S'assurer qu'une résa est en cours
            if (sessionStorage.getItem('seconds') != 0 
               && sessionStorage.getItem('minutes') != 0) {  
                // Afficher la div de la résa
                this.changeStyleBooking();
                // Recupération des données stockées
                this.userSurname.innerHTML = localStorage.getItem('userSurname');
                this.userName.innerHTML = localStorage.getItem('userName');
                this.registeredAddress.innerHTML = sessionStorage.getItem('addressValue').toLowerCase();
                this.minutes = sessionStorage.getItem('minutes'); 
                this.seconds = sessionStorage.getItem('seconds');
                // Déclencher le compteur à nouveau avec les dernières données stockées
                this.countdown();   
            }  
        }
    }

    // Méthode pour annuler le compteur
    cancelCountdown = () => {
        clearInterval(this.intervalToClear);
        this.bookingArea.style.display = 'none';
        // Supprimer les données récupérées de la dernière resa
        sessionStorage.removeItem('addressValue');
        sessionStorage.removeItem('minutes');
        sessionStorage.removeItem('seconds');
    }
}

export default Reservation;