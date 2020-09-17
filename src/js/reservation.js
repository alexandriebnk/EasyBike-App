/************************/
/*      RESERVATION     */ 
/************************/

import Map from './map';
import ObjetCanvas from './canvas';

class Reservation {
    constructor() {
        // UI 
        this.map = document.getElementById("js-map");
        this.inputAdresse = document.getElementById("js-reservation__address");
        this.inputVelos = document.getElementById("js-reservation__illustrations-number");
        this.inputNom = document.getElementById("surname");
        this.inputPrenom = document.getElementById("name");
        this.btnReserver = document.getElementById("js-form__submit");
        // Datas
        this.valeurAdresse = null;
        this.minutes = 19;
        this.secondes = 59;
        // Canvas
        this.zonePopup = document.querySelector(".popup");
        this.boutonOK = document.querySelector(".btn-ok");
        // Reservation
        this.divResa = document.querySelector(".reservation");
        this.lAdresse = document.querySelector(".l-adresse");
        this.leNom = document.querySelector(".le-nom");
        this.lePrenom = document.querySelector(".le-prenom");
        this.tpsMinutes = document.querySelector(".tps-minutes");
        this.tpsSecondes = document.querySelector(".tps-secondes");
        this.boutonAnnuler = document.querySelector(".btn-annuler");

        // Instance de la classe MAP
        this.maMap = new Map(); 

        // Events pour récupérer NOM et PRENOM tapés par USER + localStorage
        this.inputNom.addEventListener("change", (e) => {
            localStorage.setItem("nomUser", this.inputNom.value);
        })

        this.inputPrenom.addEventListener("change", (e) => {
            localStorage.setItem("prenomUser", this.inputPrenom.value);
        })

        // Afficher NOM et PRENOM en placeholder de dernière résa sur page si refresh
        this.recupNomPrenom();

        // Afficher la resa en cours si refresh 
        this.recupResa();

        // Evenement au clic du btnReserver 
        this.btnReserver.addEventListener("click", (e) => {
            // Eviter refresh quand click
            e.preventDefault();     
            // Afficher CANVAS si :
            // Une station est selectionnée 
            if (this.maMap.currentStation) { 
                // Un vélo est disponible 
                if (this.maMap.currentStation.available_bikes) {
                    this.afficherCanvas(); 
                    this.cadreStation.style.border = "10px solid #bdf1dd";
                } else {
                    this.cadreStation.style.border = "10px solid red";
                }
            }  
        })
            
        // Evenement au clic du boutonOK du CANVAS
        this.boutonOK.addEventListener("click", (e) => {
            // Eviter refresh quand click
            e.preventDefault();
            // Faire disparaitre le CANVAS
            this.zonePopup.style.display = "none";
            // Retirer NOM et PRENOM des input quand affichage resa (esthétique)
            this.inputNom.value = null; 
            this.inputPrenom.value = null; 
            this.inputNom.removeAttribute("placeholder", localStorage.getItem("nomUser"));
            this.inputPrenom.removeAttribute("placeholder", localStorage.getItem("prenomUser"));
            // Afficher RESERVATION 
            this.divResa.style.display = "block";
            // Démarrer le compteur
            this.decompteTemps();
            // Scroll automatique sur div resa
            window.scrollBy(0,400);
            // Récupérer les infos de la station sélectionnée pour les afficher
            this.leNom.innerHTML = localStorage.getItem("nomUser");
            this.lePrenom.innerHTML = localStorage.getItem("prenomUser");
            this.valeurAdresse = this.maMap.currentStation.address;
            this.lAdresse.innerHTML = this.valeurAdresse.toLowerCase();
            // Stocker en sessionStorage l'adresse
            sessionStorage.setItem("lAdresse", this.valeurAdresse);
            // Désactiver la possibilité de reserver à nouveau
            this.desactiverFonctionsResa();
        })

        // Evenement si j'annule le compteur
        this.boutonAnnuler.addEventListener("click", () => {
            this.annulerTimer(); 
            // Reload page pour nouveau CANVAS sans signature déjà faite
            document.location.reload(true);
        })       
    }

    // Méthode pour afficher Canvas + regEx pour controler syntaxe champ
    afficherCanvas = () => {
        let regex = /^[A-Za-zàäâéèëêïîôùüÿçœ\'-]+$/;

        if (!regex.test(this.inputNom.value) && this.inputNom.value.length >= 2) {
            this.inputNom.style.border = "2px solid #d88493";
        } else if (!regex.test(this.inputPrenom.value) && this.inputPrenom.value.length >= 2) {
            this.inputPrenom.style.border = "2px solid #d88493";
        } else if (this.inputNom.value.length >= 2 && this.inputPrenom.value.length <= 1) {
            this.inputPrenom.style.border = "2px solid #d88493";
            this.inputNom.style.border = "none";
        } else if (this.inputPrenom.value.length >= 2 && this.inputNom.value.length <= 1) {
            this.inputNom.style.border = "2px solid #d88493";
            this.inputPrenom.style.border = "none";
        } else if (this.inputNom.value.length <= 1 && this.inputPrenom.value.length <= 1){
            this.inputNom.style.border = "2px solid #d88493";
            this.inputPrenom.style.border = "2px solid #d88493";
        } else {
            this.inputNom.style.border = "none";
            this.inputPrenom.style.border = "none";
            this.zonePopup.style.display = "block";
            let leCanvas = new ObjetCanvas();
            // Désactiver la possibilité de reserver par dessus
            this.desactiverFonctionsResa();
        } 
    }

    // Méthode pour stocker données MINUTES dans sessionStorage 
    stockerDonneesMinutes = () => {
        sessionStorage.setItem("tps-minutes", this.minutes);
    }
        
    // Méthode pour stocker données SECONDES dans sessionStorage
    stockerDonneesSecondes = () => {
        sessionStorage.setItem("tps-secondes", this.secondes);
    }

    // Méthode pour afficher, faire tourner et disparaitre le compteur (si fini)
    decompteTemps = () => {
        // Afficher pa défaut les valeurs du compteur
        this.tpsMinutes.innerHTML = this.minutes;
        this.tpsSecondes.innerHTML = this.secondes;
        // Stocker la valeur de la première minute
        this.stockerDonneesMinutes();

        // Créer une intervale pour décrémenter temps
        this.intervalToClear = setInterval(() => {
            if (this.secondes >= 1) {
                this.secondes--;
                // Afficher nouvelle seconde
                this.tpsSecondes.innerHTML = this.secondes;
                // Stocker données de chaque dernière seconde
                this.stockerDonneesSecondes();
                // Mettre un zero en plus (esthétique)
                if (this.secondes < 10) {
                     this.tpsSecondes.innerHTML = "0" + this.secondes;
                }
            } else {
                // Si seconde = 0 elle se réinitialise
                this.secondes = 59;
                this.tpsSecondes.innerHTML = this.secondes;
                if (this.minutes > 0){
                    this.minutes--;
                    // Afficher nouvelle minute
                    this.tpsMinutes.innerHTML = this.minutes;
                    // Stocker données de chaque dernière minute
                    this.stockerDonneesMinutes();
                    // Mettre un zero en plus (esthétique)
                    if (this.minutes < 10) {
                        this.tpsMinutes.innerHTML = "0" + this.minutes;
                    }
                } 
            }
            if (this.minutes == 0 && this.secondes == 0) {
                // Désactiver la résa (qui est finie)
                clearInterval(this.intervalToClear);
                this.divResa.style.display = "none";
            }
        }, 1000);
    }  

    // Méthode pour annuler le compteur
    annulerTimer = () => {
        clearInterval(this.intervalToClear);
        this.divResa.style.display = "none";
        // Garder les dernières données NOM / PRENOM en placeholder 
        this.recupNomPrenom();
        // Supprimer les données récupérées de la dernière resa
        sessionStorage.removeItem("lAdresse");
        sessionStorage.removeItem("tps-minutes");
        sessionStorage.removeItem("tps-secondes");
    }

    // Méthode pour recup dernier NOM et PRENOM en suggestion (placeholder) si refresh
    recupNomPrenom = () => {
        if (localStorage.getItem("nomUser") && localStorage.getItem("prenomUser")) {
            this.inputNom.setAttribute("placeholder", localStorage.getItem("nomUser"));
            this.inputPrenom.setAttribute("placeholder", localStorage.getItem("prenomUser"));
        }
    }

    // Méthode pour réafficher resa en cours si refresh page
    recupResa = () => {
        if (localStorage.getItem("nomUser") 
            && localStorage.getItem("prenomUser")
            && sessionStorage.getItem("lAdresse")
            && sessionStorage.getItem("tps-minutes")
            && sessionStorage.getItem("tps-secondes")) {

            // S'assurer qu'une résa est en cours
            if (sessionStorage.getItem("tps-secondes") != 0 
               && sessionStorage.getItem("tps-minutes") != 0) {  
                // Afficher la div de la résa
                this.divResa.style.display = "block";
                this.divResa.style.position = "relative";
                this.divResa.style.backgroundColor = "#fdfffe";
                this.divResa.style.marginTop = "-500px";
                this.divResa.style.zIndex = "100";
                // Recupération des données stockées
                this.leNom.innerHTML = localStorage.getItem("nomUser");
                this.lePrenom.innerHTML = localStorage.getItem("prenomUser");
                this.lAdresse.innerHTML = sessionStorage.getItem("lAdresse").toLowerCase();
                this.minutes = sessionStorage.getItem("tps-minutes"); 
                this.secondes = sessionStorage.getItem("tps-secondes");
                // Déclencher le compteur à nouveau avec les dernières données stockées
                this.decompteTemps();   
                // Désactiver la possibilité de reserver à nouveau
                this.desactiverFonctionsResa();
            }  
        }
    }

    // Méthode pour éviter une nouvelle réservation
    desactiverFonctionsResa = () => {
        this.btnReserver.disabled = true;
        this.inputNom.disabled = true;
        this.inputPrenom.disabled = true;
        this.inputAdresse.style.display = "none";
        this.inputPlaces.style.display = "none";
        this.inputVelos.style.display = "none";
    }
}

export default Reservation;