//https://www.w3schools.com/jsref/met_document_addeventlistener.asp

// variabili inizialmente a null
var numSele = null;
var casellaSele = null;
var numErrori = 0;

// numeri da inserire all'inizio del gioco
var grigliaIniziale = [ "-2-5-1-9-", "8--2-3--6", "-3--6--7-", "--1---6--", "54-----19", "--2---7--", "-9--3--8-", "2--8-4--7", "-1-9-7-6-" ]

// soluzione finale
var soluzione = [ "426571398", "857293146", "139468275", "971385624", "543726819", "682149753", "794632581", "265814937", "318957462" ]

window.onload = function()
{
    IniziaGioco();
}

function IniziaGioco()
{
    // Crea i numeri sotto la tabella
    for (let i = 1; i <= 9; i++)
    {
        //<div id="1" class="numero">1</div> (ciò che viene creato dal codice)
        let num = document.createElement("div"); // crea un nuovo elemento di tipo div
        num.id = i
        num.innerText = i;
        num.addEventListener("click", NumeroSelezionato); // [riga 1]
        num.classList.add("numero"); // aggiunge l'elemento nella classe "numero"
        document.getElementById("spazioNumeri").appendChild(num); // inserisce il nuovo div all'interno del div con l'id "spazioNumeri"
    }

    // griglia iniziale 9x9
    for (let riga = 0; riga < 9; riga++)
    {
        for (let colo = 0; colo < 9; colo++)
        {
            let casella = document.createElement("div"); // crea un nuovo elemento di tipo div
            casella.id = riga.toString() + "-" + colo.toString();
            if (grigliaIniziale[riga][colo] != "-") // se c'è un "-" lo salta, lasciando lo spazio vuoto
            {
                casella.innerText = grigliaIniziale[riga][colo];
                casella.classList.add("casellaIniziale");// aggiunge l'elemento nella classe "casellaIniziale"
            }
            if (riga == 2 || riga == 5)
            {
                casella.style.borderBottom = "1px solid black"; // creo una linea più marcata rispetto alle altre
            }
            if (colo == 2 || colo == 5)
            {
                casella.style.borderRight = "1px solid black"; // creo una linea più marcata rispetto alle altre
            }
            casella.addEventListener("click", CasellaSelezionata); // [riga 1]
            casella.classList.add("casella"); // aggiunge l'elemento nella classe "casella"
            document.getElementById("griglia").append(casella); // inserisce il nuovo div all'interno del div con l'id "griglia"
        }
    }
}

function RicominciaGioco()
{
    NuovoSudoku();
    /*for(let riga = 0; riga < 9; riga++)
    {
        for(let colo = 0; colo < 9; colo++)
        {
            let id = riga.toString() + "-" + colo.toString(); //id di ogni casella tramite iterazioni dei for
            if(grigliaIniziale[riga][colo] == "-")
            {
                document.getElementById(id).innerText = ""; // inserisci uno spazio vuoto
            }else
            {
                document.getElementById(id).innerText = grigliaIniziale[riga][colo]; // inserisce il numero corretto
            }
        }
    }*/
}

function FineGioco()
{
    for(let riga = 0; riga < 9; riga++)
    {
        for(let colo = 0; colo < 9; colo++)
        {
            let id = riga.toString() + "-" + colo.toString(); //id di ogni casella tramite iterazioni dei for
            if (document.getElementById(id).innerText == "") // se è uguale a nulla
            {
                alert("il sudoku non è completo"); // allora non è stato completato
                return; // ferma la funzione
            }
            else if (document.getElementById(id).innerText != soluzione[riga][colo]) // se e diverso dalla soluzione
            {
                alert("il sudoku non è corretto"); // allora è sbagliato
                return; // ferma la funzione
            }
        }
    }
    alert("il sudoku è corretto, hai vinto") // altrimenti è completato
}

function AutoCompleta()
{
    for(let riga = 0; riga < 9; riga++)
    {
        for(let colo = 0; colo < 9; colo++)
        {
            let id = riga.toString() + "-" + colo.toString(); //id di ogni casella tramite iterazioni dei for
            document.getElementById(id).innerText = soluzione[riga][colo]; // inserisce il numero corretto
        }
    }
}

function NumeroSelezionato()
{
    if (numSele != null) // se è stato già selezionato un altro numero, lo deseleziona
    {
        numSele.classList.remove("numeroSelezionato");// rimuove l'elemento dalla classe "numeroSelezionato"
    }
    numSele = this; // this è "l'oggetto" che ha richiamato la funzione
    numSele.classList.add("numeroSelezionato"); // aggiunge l'elemento nella classe "numeroSelezionato"
}

function CasellaSelezionata()
{
    if (numSele) // fa qualcosa solo se è stato selezionato un numero tra i 9 sottostanti
    {
        // gli "id" sono strutturati così = "0-0" "0-1" ... "8-8"
        //let coord = this.id.split("-"); // prende l'id come stringa e lo divide in 2 stringhe
        //let riga = parseInt(coord[0]); // prende la cordinata Y (riga)
        //let colo = parseInt(coord[1]); // prende la cordinata X (colonna)

        let classi = this.className.split(" "); // ottiene un array con le classi dell'oggetto che sta richiamando la funzione
        let controllo = true;

        // ciclo che controlla tutti le classi
        for(let i = 0; i <= classi.length; i++)
        {
            if(classi[i] == "casellaIniziale") // se fa parte delle caselle iniziali, cambia il controllo
            {
                controllo = false;
            }
        }

        if(controllo == true) // se non è una casella iniziale
        {
            this.innerText = numSele.id; // inserisce il numero nella casella della griglia
        }
    }
}

function ControlloOrizzontale(a)
{
    let riga = a.toString().split("-");

    for(let i = 0; i < 9; i++)
    {
        let id = riga[0] + "-" + i;
        if(id != a)
        {
            if(document.getElementById(a).innerText == document.getElementById(id).innerText)
            {
                return false;
            }
        }
    }

    return true;
}

function ControlloVerticale(a)
{
    let colo = a.toString().split("-");

    for(let i = 0; i < 9; i++)
    {
        let id = i + "-" + colo[1];
        if(id != a)
        {
            if(document.getElementById(a).innerText == document.getElementById(id).innerText)
            {
                return false;
            }
        }
    }

    return true;
}

function ControlloQuadrato(a)
{
    let temp = a.toString().split("-");
    switch(temp[0])
    {
        case "0":
        case "1":
        case "2":
            switch(temp[1])
            {
                case "0":
                case "1":
                case "2":
                    // quadrato alto-sinistra
                    for(let i = 0; i < 3; i++)
                        {
                            for(let j = 0; j < 3; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
                case "3":
                case "4":
                case "5":
                    // quadrato alto-centro
                    for(let i = 0; i < 3; i++)
                        {
                            for(let j = 3; j < 6; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
                case "6":
                case "7":
                case "8":
                    // quadrato alto-destra
                    for(let i = 0; i < 3; i++)
                        {
                            for(let j = 6; j < 9; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
            }
            break;
        case "3":
        case "4":
        case "5":
            switch(temp[1])
            {
                case "0":
                case "1":
                case "2":
                    // quadrato centro-sinistra
                    for(let i = 3; i < 6; i++)
                        {
                            for(let j = 0; j < 3; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
                case "3":
                case "4":
                case "5":
                    // quadrato centro-centro
                    for(let i = 3; i < 6; i++)
                        {
                            for(let j = 3; j < 6; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
                case "6":
                case "7":
                case "8":
                    // quadrato centro-destra
                    for(let i = 3; i < 6; i++)
                        {
                            for(let j = 6; j < 9; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
            }
            break;
        case "6":
        case "7":
        case "8":
            switch(temp[1])
            {
                case "0":
                case "1":
                case "2":
                    // quadrato basso-sinistra
                    for(let i = 6; i < 9; i++)
                        {
                            for(let j = 0; j < 3; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
                case "3":
                case "4":
                case "5":
                    // quadrato basso-centro
                    for(let i = 6; i < 9; i++)
                        {
                            for(let j = 3; j < 6; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
                case "6":
                case "7":
                case "8":
                    // quadrato basso-destra
                    for(let i = 6; i < 9; i++)
                        {
                            for(let j = 6; j < 9; j++)
                            {
                                let id = i + "-" + j;
                                 if(id != a)
                                {
                                    if(document.getElementById(a).innerText == document.getElementById(id).innerText)
                                    {
                                        return false;
                                    } 
                                }
                            }
                        }
                    return true;
                    break;
            }
            break;
    }
}

function Random(min, max)
{
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function NuovoSudoku()
{
    for(let riga = 0; riga < 9; riga++)
    {
        for(let colo = 0; colo < 9; colo++)
        {
            let id = riga.toString() + "-" + colo.toString();
            document.getElementById(id).innerText = "";
        }
    }

    for(let riga = 0; riga < 9; riga++)
    {
        for(let colo = 0; colo < 9; colo++)
        {
            let id = riga.toString() + "-" + colo.toString(); 
            let a = document.getElementById(id);
            let Controllo = false;
            while(Controllo == false)
            {
                a.innerText = Random(1,9);
                if(ControlloOrizzontale(a.id) == true && ControlloVerticale(a.id) == true && ControlloQuadrato(a.id) == true)
                {
                    Controllo = true;
                }
            }
            Controllo = false;
            //alert("inserito il numero " + a.innerHTML + "nella casella " + id);
        }
    }
}