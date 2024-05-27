//https://www.w3schools.com/jsref/met_document_addeventlistener.asp

// variabili inizialmente a null
var numSele = null;
var casellaSele = null;

// numeri da inserire all'inizio del gioco
var grigliaIniziale =
[
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

// soluzione finale
var soluzione =
[
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

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
                casella.classList.add("caselleIniziali"); // aggiunge l'elemento nella classe "caselleIniziali"
            }
            if (riga == 2 || riga == 5)
            {
                casella.classList.add("lineeOrizzontale"); // aggiunge l'elemento nella classe "lineeOrizzontali"
            }
            if (colo == 2 || colo == 5)
            {
                casella.classList.add("lineeVerticali"); // aggiunge l'elemento nella classe "lineeVeriticali"
            }
            casella.addEventListener("click", CasellaSelezionata); // [riga 1]
            casella.classList.add("casella"); // aggiunge l'elemento nella classe "casella"
            document.getElementById("griglia").append(casella); // inserisce il nuovo div all'interno del div con l'id "griglia"
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
        // this è "l'oggetto" che ha richiamato la funzione
        if (this.innerText != "") // se la casella è vuota, esce dalla funzione, evitando di sovrascrivere il contenuto
        {
            return;
        }

        // gli "id" sono strutturati così = "0-0" "0-1" ... "8-8"
        let coord = this.id.split("-"); // prende l'id come stringa e lo divide in 2 stringhe
        let riga = parseInt(coord[0]); // prende la cordinata Y (riga)
        let colo = parseInt(coord[1]); // prende la cordinata X (colonna)

        if (soluzione[riga][colo] == numSele.id) // se il valore nella posizione [riga][colonna], all'interno della soluzione è uguale all'id del numero selezionato (l'id equivale al numero [riga 43])
        {
            // this è "l'oggetto" che ha richiamato la funzione
            this.innerText = numSele.id; // inserisce il numero nella casella della griglia
        }
        else
        {
            //continuo successivo
            //inserire comunque i numeri ma rendere rossa la casella cosi da far capire l'errore
            // in più rendere possibile la sovrascrittura in caso di casella rossa
        }
    }
}

