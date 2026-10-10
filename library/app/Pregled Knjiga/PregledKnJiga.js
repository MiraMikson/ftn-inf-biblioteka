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

function inicijalizacijaKnjiga(){
    const sacuvaneKnjige=localStorage.getItem("knjige");
    if(sacuvaneKnjige){
        knjige=JSON.parse(sacuvaneKnjige);
    }else{
    knjige=[
        new Knjiga("1", "Na Drini ćuprija", "1978", "slike/na-drini-cuprija.jpg", "Roman Ive Andrića o životu ljudi oko mosta na Drini.", 5),
        new Knjiga("2", "Mali princ", "1989", "slike/mali-princ.jpg", "Priča o dečaku koji putuje kroz svemir i upoznaje različite ljude.", 5),
        new Knjiga("3", "Zločin i kazna", "1985", "slike/zlocin-i-kazna.jpg", "Roman Fjodora Dostojevskog o zločinu, krivici i savesti.", 4)
    ];
     localStorage.setItem("knjige", JSON.stringify(knjige));
    }
    prikaziKnjige();
 
}

function prikaziKnjige() {
    let table=document.querySelector("#knjige-body");
    table.innerHTML="";

    for(let i=0; i<knjige.length; i++){
        let tr=document.createElement("tr");
        let br=document.createElement("td");
        br.textContent=i+1;
        
        let naziv =document.createElement("td");
        let obrisi=document.createElement("td");
       
        let obrisiBtn=document.createElement("button");
        naziv.textContent=knjige[i].naziv;
        obrisiBtn.textContent="Obrisi";

        obrisiBtn.addEventListener("click", function(){
            let index=knjige.indexOf(knjige[i]);
            knjige.splice(index, 1);
             tr.remove();
        })

        obrisi.appendChild(obrisiBtn);
        tr.appendChild(br);

        tr.appendChild(naziv);
        tr.appendChild(obrisi);
       
        tr.addEventListener("click", function(){
            prikaziDetalje(knjige[i]);
            
        });
        table.appendChild(tr);
    }

}
function prikaziDetalje(knjiga){
    let p=document.createElement("p");
    p.innerHTML= "<strong>Naziv:</strong> " + knjiga.naziv + "<br>" +
              "<strong>Datum Stampanja:</strong> " + knjiga.datumStampanja + "<br>" +
              "<strong>Opis:</strong> " + knjiga.opis + "<br>" +
              "<strong>Popularnost:</strong> " + knjiga.popularnost + "<br>" +
              "<img src='" + knjiga.urlSlike + "' alt='Slika knjige' width='200'>";
    let detalji= document.querySelector(".knjiga-details");
    if(detalji.firstChild){
        detalji.firstChild.remove();
    }
    detalji.appendChild(p);
}





document.addEventListener("DOMContentLoaded", inicijalizacijaKnjiga)