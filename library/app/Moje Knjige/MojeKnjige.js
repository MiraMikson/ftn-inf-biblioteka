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

function inicijalizacijaKnjiga(){
    let sacuvaneKnjige=localStorage.getItem("knjige");
    if(sacuvaneKnjige !== null){
        knjige=JSON.parse(sacuvaneKnjige)
 
    }
    
    let sacuvaneIznajmljene=localStorage.getItem("iznajmljeneKnjige");
    if(sacuvaneIznajmljene === null || JSON.parse(sacuvaneIznajmljene).length === 0){
        iznajmljeneKnjige = [knjige[0], knjige[1]];
        localStorage.setItem("iznajmljeneKnjige",JSON.stringify(iznajmljeneKnjige))
    } else {
       iznajmljeneKnjige = JSON.parse(sacuvaneIznajmljene);
        
        
    }
    prikaziIznajmljeneKnjige();
 
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
        })

        vrati.appendChild(vratiBtn);
        tr.appendChild(br);

        tr.appendChild(naziv);
        tr.appendChild(vrati);
       
    
        table.appendChild(tr);
    }

}






document.addEventListener("DOMContentLoaded", inicijalizacijaKnjiga)