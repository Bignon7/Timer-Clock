const body = document.querySelector('body');
let hh = document.querySelector('.hr');
let mm = document.querySelector('.min');
let ss = document.querySelector('.sec');

//Pour le changement de thème
let mode = document.querySelector('.switch');
mode.addEventListener('click', () => {
    body.classList.toggle('dark');
})


setInterval(() => {
    let time = new Date();
    hr = time.getHours()*30;
    min = time.getMinutes()*6;
    sec = time.getSeconds()*6;

    //Pour l'aiguille des heures
    // 60 minutes pour parcourir 30deg donc l'angle parcouru en 1minute
    //est (30*1)/60 =1/2 avec min/12 = 1/2 de la minute actuelle
    hh.style.transform = `rotateZ(${hr+(min/12)}deg)`;
    mm.style.transform = `rotateZ(${min}deg)`;
    ss.style.transform = `rotateZ(${sec}deg)`;

})

