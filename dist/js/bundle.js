!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){},function(e,t,s){"use strict";s.r(t);s(0);var i=s.p+"img/img-carrousel-1.png";var n=class{constructor(){this.appuyerClavier=e=>{switch(e.keyCode){case 39:this.tournerDroite();break;case 37:this.tournerGauche();break;case 32:this.activerPausePlay()}},this.ajusterLesSlides=()=>{this.image.src=this.slides[this.currentIndex]},this.tournerDroite=()=>{this.currentIndex<this.slides.length-1?(this.previousIndex=this.currentIndex,this.currentIndex++):(this.previousIndex=this.currentIndex,this.currentIndex=0),this.ajusterLesSlides()},this.tournerGauche=()=>{0===this.currentIndex?(this.previousIndex=this.currentIndex,this.currentIndex=this.slides.length-1):(this.previousIndex=this.currentIndex,this.currentIndex--),this.ajusterLesSlides()},this.activerPausePlay=()=>{!0===this.click?(clearInterval(this.intervalles),this.click=!1):(this.click=!0,this.intervalles=setInterval(this.tournerDroite,5e3))},this.slides=[i,"img/img-carrousel-2.jpg","img/img-carrousel-3.jpg","img/img-carrousel-4.jpg"],this.image=document.getElementById("js-carrousel__content"),this.boutonDroite=document.getElementById("js-carrousel__buttons-right"),this.boutonGauche=document.getElementById("js-carrousel__buttons-left"),this.boutonPause=document.getElementById("js-carrousel__buttons-pause"),this.currentIndex=0,this.previousIndex=0,this.ajusterLesSlides(),this.intervalles=setInterval(this.tournerDroite,5e3),this.click=!0,this.boutonGauche.addEventListener("click",this.tournerGauche),this.boutonDroite.addEventListener("click",this.tournerDroite),this.boutonPause.addEventListener("click",this.activerPausePlay),window.addEventListener("keydown",this.appuyerClavier)}};var r=class{constructor(){this.initMap=()=>{this.map=L.map(this.mapContainer).setView([45.75,4.85],15);let e=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{minZoom:13,maxZoom:17,attribution:'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'});this.map.addLayer(e)},this.getDataFromApi=()=>new Promise((e,t)=>{let s=new XMLHttpRequest;s.onreadystatechange=()=>{if(4===s.readyState)if(200===s.status){let t=JSON.parse(s.responseText);e(t)}else t("Erreur")},s.open("GET",this.api),s.send()}),this.addMarkers=e=>{e.forEach(e=>{L.marker([e.position.lat,e.position.lng]).addTo(this.map).addEventListener("click",()=>{this.currentStation=e,e.available_bikes>0?(this.adresse.innerHTML=e.address.toLowerCase(),this.velos.innerHTML=e.available_bikes):(this.adresse.innerHTML=e.address.toLowerCase(),this.velos.innerHTML="0")})})},this.api="https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=6dd524dd35fde93005f7e4806b82374aedc7864f",this.mapContainer=document.getElementById("js-map"),this.map=null,this.adresse=document.getElementById("js-reservation__address"),this.velos=document.getElementById("js-reservation__illustrations-number"),this.currentStation=null,this.initMap(),this.getDataFromApi().then(e=>{this.addMarkers(e)})}};var o=class{constructor(){this.evenements=()=>{this.canvas.addEventListener("mousedown",e=>{this.signer=!0,this.dernierePosition=this.recupPositionSouris(e),this.btnOK.style.display="block"}),this.canvas.addEventListener("mousemove",e=>{this.positionSouris=this.recupPositionSouris(e),this.signatureCanvas()}),document.addEventListener("mouseup",e=>{this.signer=!1})},this.canvas=document.getElementById("canvas"),this.context=this.canvas.getContext("2d"),this.btnOK=document.querySelector(".btn-ok"),this.signer=!1,this.positionSouris={x:0,y:0},this.dernierePosition=this.positionSouris,this.evenements()}recupPositionSouris(e){if(this.signer){let t=this.canvas.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}}signatureCanvas(){this.signer&&(this.context.beginPath(),this.context.moveTo(this.dernierePosition.x,this.dernierePosition.y),this.context.lineTo(this.positionSouris.x,this.positionSouris.y),this.context.stroke(),this.context.strokeStyle="#a1e8cd",this.context.lineWidth=3,this.dernierePosition=this.positionSouris)}};var a=class{constructor(){this.afficherCanvas=()=>{let e=/^[A-Za-zàäâéèëêïîôùüÿçœ\'-]+$/;if(!e.test(this.inputNom.value)&&this.inputNom.value.length>=2)this.inputNom.style.border="2px solid #d88493";else if(!e.test(this.inputPrenom.value)&&this.inputPrenom.value.length>=2)this.inputPrenom.style.border="2px solid #d88493";else if(this.inputNom.value.length>=2&&this.inputPrenom.value.length<=1)this.inputPrenom.style.border="2px solid #d88493",this.inputNom.style.border="none";else if(this.inputPrenom.value.length>=2&&this.inputNom.value.length<=1)this.inputNom.style.border="2px solid #d88493",this.inputPrenom.style.border="none";else if(this.inputNom.value.length<=1&&this.inputPrenom.value.length<=1)this.inputNom.style.border="2px solid #d88493",this.inputPrenom.style.border="2px solid #d88493";else{this.inputNom.style.border="none",this.inputPrenom.style.border="none",this.zonePopup.style.display="block";new o;this.desactiverFonctionsResa()}},this.stockerDonneesMinutes=()=>{sessionStorage.setItem("tps-minutes",this.minutes)},this.stockerDonneesSecondes=()=>{sessionStorage.setItem("tps-secondes",this.secondes)},this.decompteTemps=()=>{this.tpsMinutes.innerHTML=this.minutes,this.tpsSecondes.innerHTML=this.secondes,this.stockerDonneesMinutes(),this.intervalToClear=setInterval(()=>{this.secondes>=1?(this.secondes--,this.tpsSecondes.innerHTML=this.secondes,this.stockerDonneesSecondes(),this.secondes<10&&(this.tpsSecondes.innerHTML="0"+this.secondes)):(this.secondes=59,this.tpsSecondes.innerHTML=this.secondes,this.minutes>0&&(this.minutes--,this.tpsMinutes.innerHTML=this.minutes,this.stockerDonneesMinutes(),this.minutes<10&&(this.tpsMinutes.innerHTML="0"+this.minutes))),0==this.minutes&&0==this.secondes&&(clearInterval(this.intervalToClear),this.divResa.style.display="none")},1e3)},this.annulerTimer=()=>{clearInterval(this.intervalToClear),this.divResa.style.display="none",this.recupNomPrenom(),sessionStorage.removeItem("lAdresse"),sessionStorage.removeItem("tps-minutes"),sessionStorage.removeItem("tps-secondes")},this.recupNomPrenom=()=>{localStorage.getItem("nomUser")&&localStorage.getItem("prenomUser")&&(this.inputNom.setAttribute("placeholder",localStorage.getItem("nomUser")),this.inputPrenom.setAttribute("placeholder",localStorage.getItem("prenomUser")))},this.recupResa=()=>{localStorage.getItem("nomUser")&&localStorage.getItem("prenomUser")&&sessionStorage.getItem("lAdresse")&&sessionStorage.getItem("tps-minutes")&&sessionStorage.getItem("tps-secondes")&&0!=sessionStorage.getItem("tps-secondes")&&0!=sessionStorage.getItem("tps-minutes")&&(this.divResa.style.display="block",this.divResa.style.position="relative",this.divResa.style.backgroundColor="#fdfffe",this.divResa.style.marginTop="-500px",this.divResa.style.zIndex="100",this.leNom.innerHTML=localStorage.getItem("nomUser"),this.lePrenom.innerHTML=localStorage.getItem("prenomUser"),this.lAdresse.innerHTML=sessionStorage.getItem("lAdresse").toLowerCase(),this.minutes=sessionStorage.getItem("tps-minutes"),this.secondes=sessionStorage.getItem("tps-secondes"),this.decompteTemps(),this.desactiverFonctionsResa())},this.desactiverFonctionsResa=()=>{this.btnReserver.disabled=!0,this.inputNom.disabled=!0,this.inputPrenom.disabled=!0,this.inputAdresse.style.display="none",this.inputPlaces.style.display="none",this.inputVelos.style.display="none"},this.map=document.getElementById("js-map"),this.inputAdresse=document.getElementById("js-reservation__address"),this.inputVelos=document.getElementById("js-reservation__illustrations-number"),this.inputNom=document.getElementById("surname"),this.inputPrenom=document.getElementById("name"),this.btnReserver=document.getElementById("js-form__submit"),this.valeurAdresse=null,this.minutes=19,this.secondes=59,this.zonePopup=document.querySelector(".popup"),this.boutonOK=document.querySelector(".btn-ok"),this.divResa=document.querySelector(".reservation"),this.lAdresse=document.querySelector(".l-adresse"),this.leNom=document.querySelector(".le-nom"),this.lePrenom=document.querySelector(".le-prenom"),this.tpsMinutes=document.querySelector(".tps-minutes"),this.tpsSecondes=document.querySelector(".tps-secondes"),this.boutonAnnuler=document.querySelector(".btn-annuler"),this.maMap=new r,this.inputNom.addEventListener("change",e=>{localStorage.setItem("nomUser",this.inputNom.value)}),this.inputPrenom.addEventListener("change",e=>{localStorage.setItem("prenomUser",this.inputPrenom.value)}),this.recupNomPrenom(),this.recupResa(),this.btnReserver.addEventListener("click",e=>{e.preventDefault(),this.maMap.currentStation&&(this.maMap.currentStation.available_bikes?(this.afficherCanvas(),this.cadreStation.style.border="10px solid #bdf1dd"):this.cadreStation.style.border="10px solid red")}),this.boutonOK.addEventListener("click",e=>{e.preventDefault(),this.zonePopup.style.display="none",this.inputNom.value=null,this.inputPrenom.value=null,this.inputNom.removeAttribute("placeholder",localStorage.getItem("nomUser")),this.inputPrenom.removeAttribute("placeholder",localStorage.getItem("prenomUser")),this.divResa.style.display="block",this.decompteTemps(),window.scrollBy(0,400),this.leNom.innerHTML=localStorage.getItem("nomUser"),this.lePrenom.innerHTML=localStorage.getItem("prenomUser"),this.valeurAdresse=this.maMap.currentStation.address,this.lAdresse.innerHTML=this.valeurAdresse.toLowerCase(),sessionStorage.setItem("lAdresse",this.valeurAdresse),this.desactiverFonctionsResa()}),this.boutonAnnuler.addEventListener("click",()=>{this.annulerTimer(),document.location.reload(!0)})}};new n,new a}]);