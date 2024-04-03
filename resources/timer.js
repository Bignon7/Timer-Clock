//Déclaration des variables globales à utiliser

let time_count;
let i = 0;
let total;
let n;
let n_deg;
let time_progress;
let dot;
let ringtone = new Audio('best_alarm.mp3');

// Définition des fonctions à utiliser
        function f () {
            //let dis = document.querySelectorAll('select');
            min = parseInt(document.getElementById('min').value);
            sec = parseInt(document.getElementById('sec').value);
            if ( isNaN(min) || isNaN(sec) ) {
                return alert("Veuillez faire un choix parmi les options") ;
            }
            if (min == 0  && sec == 0) {
                //document.getElementById('reset_button').removeAttribute('disabled'); il faut régler des détails avant d'ajouter cette ligne
                return ringtone.play();
            }
            document.getElementById('time').innerHTML = `${(min<10) ? '0' + String(min) : String(min) } : ${(sec<10)? '0'+String(sec):String(sec)}`;
            //document.querySelector('.dot').style.transform = `rotate(${i}deg)`;
            document.getElementById('time_progress').style.strokeDashoffset = 440;

            dis.forEach (elt => {elt.setAttribute('disabled', true);})
            document.getElementById('set_button').setAttribute('disabled', true);
            document.getElementById('reset_button').removeAttribute('disabled');
            //document.getElementById('play_button').removeAttribute('disabled');
            document.getElementById('pause_button').removeAttribute('disabled');

            total = (min*60) + sec;
            n = total;
            n_deg = 360/total;  //un tour pour total secondes combien de fraction de tour pour 1 seconde
            //let i = 0;
            //let ringtone = new Audio('best_alarm.mp3');

            time_count = setInterval(() => {
                document.getElementById('time').innerHTML = `${min} : ${sec}`;
                total--;
                min = Math.floor(total/60);
                sec = total%60;
                document.getElementById('time').innerHTML = `${(min<10) ? '0' + String(min) : String(min) } : ${(sec<10)? '0'+String(sec):String(sec)}`;
                time_progress = document.getElementById('time_progress');
                dot = document.querySelector('.dot');
                time_progress.style.strokeDashoffset = (440 * total)/n;
                i++;
                dot.style.transform = `rotate(${i * n_deg}deg)`;

                //Fin de la durée du minuteur
                if (total ==0) {
                    document.getElementById('play_button').setAttribute('disabled', true);
                    document.getElementById('pause_button').setAttribute('disabled', true);
                    ringtone.play();
                    ringtone.loop = true;
                    clearInterval(time_count);
                }
            }, 1000)
        }

        function playFunction () {
            //total = (min*60) + sec;
            //console.log(min, sec, total)
            document.getElementById('play_button').setAttribute('disabled', true);
            time_count = setInterval(() => {
                total--;
                min = Math.floor(total/60);
                sec = total%60;
                document.getElementById('time').innerHTML = `${(min<10) ? '0' + String(min) : String(min) } : ${(sec<10)? '0'+String(sec):String(sec)}`;
                time_progress = document.getElementById('time_progress');
                dot = document.querySelector('.dot');
                time_progress.style.strokeDashoffset = (440 * total)/n;
                i++;
                dot.style.transform = `rotate(${i * n_deg}deg)`;

                //La fin aussi
                if (total ==0) {
                    document.getElementById('play_button').setAttribute('disabled', true);
                    document.getElementById('pause_button').setAttribute('disabled', true);
                    ringtone.play();
                    ringtone.loop = true;
                    clearInterval(time_count);
                }
                //Pour s'arrêter lorsque le total est négatif
                if (total < 0) {
                    clearInterval(time_count);
                }
            
            }, 1000)
        }


        function resetFunction () {
            clearInterval(time_count);
            document.getElementById('time').innerHTML = '00 : 00';
            ringtone.pause();
            time_progress.style.strokeDashoffset = 440;  //(440 * total)/n;
            i = 0;
            dot.style.transform = 'rotate(0deg)' ;//`rotate(${i * n_deg}deg)`;
            document.querySelectorAll('select').forEach (elt => {elt.removeAttribute('disabled');});
            document.getElementById('set_button').removeAttribute('disabled');  //Pour enlever disabled
            document.getElementById('reset_button').setAttribute('disabled', true);  //Pour ajouter disabled
            document.getElementById('play_button').setAttribute('disabled', true);
            document.getElementById('pause_button').setAttribute('disabled', true);
        }
        //Il faut empêcher l'utilisateur d'appuyer plusieurs fois sur le play pour ne pas afficher des effets indésirables
        



//Les valeurs importantes à récupérer sur la page
let dis = document.querySelectorAll('select');
let min = parseInt(document.getElementById('min').value);
let sec = parseInt(document.getElementById('sec').value);


//Les écouteurs d'évènements à utiliser
let setButton = document.getElementById('set_button');
let resetButton = document.getElementById('reset_button');
let pauseButton = document.getElementById('pause_button');
let playButton = document.getElementById('play_button');
 
    setButton.addEventListener('click', f) ;

    resetButton.addEventListener('click', resetFunction) ;

    pauseButton.addEventListener('click', () => {
        clearInterval(time_count);
        document.getElementById('play_button').removeAttribute('disabled');
    } ) ;

    playButton.addEventListener('click', playFunction) ;
