class Knjiga{
    constructor( id, naziv, datumStampanja,urlSlike, opis, popularnost){
       
        this.id = id;
        this.naziv = naziv;
        this.datumStampanja = datumStampanja;
        this.urlSlike = urlSlike;
        this.opis = opis;
        this.popularnost = popularnost;
        
    }
}
let knjige = [];
let iznajmljeneKnjige = [];
let dostupneKnjige = [];

function inicijalizacijaKnjiga(){
    let sacuvaneKnjige=localStorage.getItem("knjige");
    if(sacuvaneKnjige !== null){
        knjige=JSON.parse(sacuvaneKnjige)
    }
    
    let sacuvaneIznajmljene=localStorage.getItem("iznajmljeneKnjige");
    if (sacuvaneIznajmljene === null) {
    iznajmljeneKnjige = [];
    } else {
    iznajmljeneKnjige = JSON.parse(sacuvaneIznajmljene);
    }
        
    prikaziIznajmljeneKnjige();
    prikaziDostupneKnjige();
}


function prikaziIznajmljeneKnjige() {
    let table=document.querySelector("#iznajmljene-knjige-body");
    table.innerHTML="";

    for(let i=0; i<iznajmljeneKnjige.length; i++){
        let tr=document.createElement("tr");
        let br=document.createElement("td");
        br.textContent=iznajmljeneKnjige[i].id;
        
        let naziv =document.createElement("td");
        naziv.textContent = iznajmljeneKnjige[i].naziv;

        let vrati=document.createElement("td");
        let vratiBtn=document.createElement("button");
        vratiBtn.textContent="Vrati";

        vratiBtn.addEventListener("click", function(event){
            event.stopPropagation();
            iznajmljeneKnjige.splice(i, 1);
            localStorage.setItem("iznajmljeneKnjige", JSON.stringify(iznajmljeneKnjige));   
            prikaziIznajmljeneKnjige();
            prikaziDostupneKnjige();
        })

        vrati.appendChild(vratiBtn);
        tr.appendChild(br);

        tr.appendChild(naziv);
        tr.appendChild(vrati);
       
    
        table.appendChild(tr);
    }

}
function prikaziDostupneKnjige() {
    dostupneKnjige = knjige.filter(function(knjiga) {
        return !iznajmljeneKnjige.some(function(iznajmljena) {
            return iznajmljena.id === knjiga.id;
        });
    });
    let table=document.querySelector("#dostupne-knjige-body");
    table.innerHTML="";

    for(let i=0; i<dostupneKnjige.length; i++){
        let knjiga = dostupneKnjige[i];
        
        let tr=document.createElement("tr");
        let br=document.createElement("td");
        br.textContent=knjiga.id;
        
        let naziv =document.createElement("td");
        naziv.textContent = knjiga.naziv;

        let iznajmi=document.createElement("td");
        let iznajmiBtn=document.createElement("button");
        iznajmiBtn.textContent="Iznajmi";

        iznajmiBtn.addEventListener("click", function(){
            iznajmljeneKnjige.push(knjiga);

            localStorage.setItem("iznajmljeneKnjige", JSON.stringify(iznajmljeneKnjige));
            prikaziIznajmljeneKnjige();
            prikaziDostupneKnjige();
        })

        iznajmi.appendChild(iznajmiBtn);
        tr.appendChild(br);
        tr.appendChild(naziv);
        tr.appendChild(iznajmi);
        table.appendChild(tr);
    }

}

document.addEventListener("DOMContentLoaded", inicijalizacijaKnjiga)