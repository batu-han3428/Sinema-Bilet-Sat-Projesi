let koltuklar = document.querySelectorAll('.koltuklar > div');
let filmler = document.getElementById('filmler');
var options = filmler.querySelectorAll('option');
var koltuk = document.getElementById('koltuk');
var ucret = document.getElementById('ucret');

var seciliKoltuklar;
var seciliFilm = localStorage.getItem('filmler');

if(localStorage.getItem('koltuklar') == null){
    seciliKoltuklar = [];
}else{
    seciliKoltuklar = JSON.parse(localStorage.getItem('koltuklar'));
}


sorgula();

options.forEach(element=>{
    if(element.value == seciliFilm){
        element.setAttribute('selected','selected');
    }
});


koltuklar.forEach((element,index) => {
    seciliKoltuklar.forEach(function(e){     
        if(e == index){
            element.style.background='rgb(249, 228, 108)';
        }
    });
    element.addEventListener('mouseenter',function(){
        element.style.transform='scale(1.2)';
        element.style.cursor='pointer';
    });
    element.addEventListener('mouseleave',function(){
        element.style.transform='scale(1)';
    });
    element.addEventListener('click',function(){
        if(seciliKoltuklar.indexOf(index) == -1){
            element.style.background='rgb(249, 228, 108)';
            seciliKoltuklar.push(index);
            localStorage.setItem('koltuklar',JSON.stringify(seciliKoltuklar));
            sorgula();
        }else{
            element.style.background='rgb(69, 69, 84)';          
            var eq = seciliKoltuklar.indexOf(index);
            seciliKoltuklar.splice(eq,1);          
            localStorage.setItem('koltuklar',JSON.stringify(seciliKoltuklar));
            sorgula();
        }
    });
});


const change = function(){
    
    localStorage.setItem('filmler',filmler.value);

    options.forEach(element=>{
        element.removeAttribute('selected');
        if(element.value == filmler.value){
            element.setAttribute('selected','selected');
        }
    });

    
    sorgula();
};


function sorgula(){

    if(seciliKoltuklar.length > 0 && localStorage.getItem('filmler') != null){ 
    
        koltuk.textContent=seciliKoltuklar.length;
        var fiyat = seciliKoltuklar.length * 20;
        if(localStorage.getItem('filmler') == 1){
            fiyat += 20;
        }else if(localStorage.getItem('filmler') == 2){
            fiyat += 30;
        }else if(localStorage.getItem('filmler') == 3){
            fiyat += 40;
        }
        ucret.textContent=fiyat;  

    }
}