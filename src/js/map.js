/************************/
 /*         MAP          */ 
/************************/

// Importer images qui ne seront pas prises en compte 
// en les mettant en string dans mon fichier JS
import stationSvg from '../img/svg/station.svg';
import stationSvgSelected from '../img/svg/selected-station.svg';

class Map {
    constructor() {
        this.api = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=6dd524dd35fde93005f7e4806b82374aedc7864f';
        this.mapContainer = document.getElementById('js-map');
        this.map = null;
        this.address = document.getElementById('js-reservation__address');
        this.bikesNumber = document.getElementById('js-reservation__illustrations-number');
        this.currentStation = null;
        this.activeMarker = null;
        this.activeStation = null;
        this.reservedMarker = null;
        this.reservedStation = null;

        // Initialiser la map
        this.initMap();

        // Récupérer les données de l'API JCD
        this.getDataFromApi().then((datasJCD) => {
            // Afficher les stations sur la carte
            this.addMarkers(datasJCD);   
        })
    }

    // Méthode pour afficher la MAP 
    initMap = () => {
        this.map = L.map(this.mapContainer).setView([45.75, 4.85], 15); 
        
        let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 13, 
            maxZoom: 17, 
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        })
        this.map.addLayer(osmLayer);
    }
    
    // Méthode pour faire une requête et récupérer les datas en format JSON
    getDataFromApi = () => {
        return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200){
                        let datas = JSON.parse(xmlhttp.responseText);
                        resolve(datas);
                    }
                    else { 
                        reject('Erreur');
                    }
                }      
            }
            xmlhttp.open('GET', this.api);
            xmlhttp.send();
        })
    }
            
    // Méthode pour afficher les marqueurs et les détails de chaque station
    addMarkers = (datas) => {
        datas.forEach((station) => {
            // Créer l'icone et l'afficher en place de chaque marqueur
            let stationIcon = L.icon({
                iconUrl: stationSvg,
                iconSize: [30, 30],
                iconAnchor: [station.position.lat, station.position.lng] 
            });
            let marker = L.marker([station.position.lat, station.position.lng], {icon: stationIcon}).addTo(this.map);
            marker.addEventListener('click', () => {
                // Pour chaque click, changer l'UI
                this.changeIcons(marker, station);
                // Stocker ces datas dans le constructor 
                this.currentStation = station;
                // Afficher les datas de la station
                if (station.address != '') {
                    this.address.innerHTML = (station.address.charAt(0).toUpperCase() + station.address.substring(1).toLowerCase());
                } else {
                    this.address.innerHTML = 'Adresse non reconnue';
                    this.bikesNumber.style.color = '#F20746';
                    station.available_bikes = 0;
                    this.bikesNumber.innerHTML = 0;
                }
                this.bikesNumber.innerHTML = station.available_bikes;
                if (station.available_bikes > 0) {
                    this.address.style.color = '#20284F';
                    this.bikesNumber.style.color = '#20284F';
                } else {
                    this.address.style.color = '#8D8D8D';
                    this.bikesNumber.style.color = '#F20746';
                }
            })
        })
    }

    // Méthode pour créer une icône différente pour selection station par user
    changeIcons = (marker, station) => {
        // Si une station est déjà réservée = ne rien changer
        if (marker === this.reservedMarker) {
            return;
        }

        // Changer l'UI des marqueurs quand user clique dessus
        if (this.activeMarker && this.activeMarker !== this.reservedMarker) {
            let stationIcon = L.icon({
                iconUrl: stationSvg,
                iconSize: [30, 30],
                iconAnchor: [this.activeStation.position.lat, this.activeStation.position.lng] 
            });
            // Changer l'UI du marqueur
            this.activeMarker.setIcon(stationIcon);
        }

        // Dans tous les cas, quand user clique sur marqueur, l'icône s'élargit
        let stationIcon = L.icon({
            iconUrl: stationSvg,
            iconSize: [50, 50],
            iconAnchor: [station.position.lat, station.position.lng] 
        });
        marker.setIcon(stationIcon);

        // Le marqueur en question devient sélectionné
        this.activeMarker = marker;
        this.activeStation = station;
    }   

    // Méthode pour garder le marqueur de la station réservée
    displayReservedIcon = () => {
        this.reservedStation = this.activeStation;
        this.reservedMarker = this.activeMarker;

        let stationSelectedIcon = L.icon({
            iconUrl: stationSvgSelected,
            iconSize: [50, 50],
            iconAnchor: [this.reservedStation.position.lat, this.reservedStation.position.lng] 
        });
        this.reservedMarker.setIcon(stationSelectedIcon);
    }
} 

export default Map;