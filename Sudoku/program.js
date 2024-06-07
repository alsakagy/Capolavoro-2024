//https://www.w3schools.com/jsref/met_document_addeventlistener.asp

// variabili inizialmente a null
var numSele = null;
var casellaSele = null;
var numErrori = 0;
let iVerticale = 0;

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
            //if (grigliaIniziale[riga][colo] != "-") // se c'è un "-" lo salta, lasciando lo spazio vuoto
            //{
            //    casella.innerText = grigliaIniziale[riga][colo];
            //    casella.classList.add("casellaIniziale");// aggiunge l'elemento nella classe "casellaIniziale"
            //}
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

    Reset();
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

function Random(min, max)
{
    return Math.floor(Math.random() * ((max + 1) - min)) + min; // prende un numero random tra min e max
}

function Reset()
{
    let Matrice = new Array(81); // creo un array di 81 elementi (tutta la tabella 9*9)
    let Risultato = new Array(81);

    for(let i = 0; i < Matrice.length; i++)
    {
        Matrice[i] = new Array(9); // per ogni elemento dell'array aggiungo un altro array da 9 elementi (casella singola 1*1)

        for(let j = 0; j < Matrice[i].length; j++)
        {
            Matrice[i][j] = j + 1; // aggiungo ad ogni elemento della regione i numeri dall'1 al 9
        }
    }

    for(let i = 0; i < Matrice.length; i++)
    {
        let rig = Math.floor(i / 9);
        let indiceRandom = Random(0,Matrice[i].length - 1); // prende un indice di un numero casuale tra quelli dell' array in questione
        Risultato[i] = Matrice[i][indiceRandom]; // imposta quel numero nella casella in questione 
        Modifiche(i,Matrice[i][indiceRandom],Matrice,rig);
        iVerticale++; // creata all'inizio del file, equivale a 0
        if(iVerticale % 9 == 0) // continua ad incrementare e quando arriva a 9 ritorna a 0
        {
            iVerticale = 0;
        }
    }

    // ciclo per l'inserimeto dei valori nei div
    for(let riga = 0; riga < 9; riga++)
    {
        for(let colo = 0; colo < 9; colo++)
        {
            let id = riga.toString() + "-" + colo.toString();
            let casella = document.getElementById(id);

            casella.innerText = Risultato[(riga + colo) + ((9 * riga) - riga)]; // ottiene i numeri dallo 0 al 80 tramite l'utilizzo di riga e colo

            // serve solo per la parte grafica
            for(let i = 0; i < casella.classList.length; i++)
            {
                if(casella.classList[i] == "casellaIniziale")
                {
                    casella.classList.remove("casellaIniziale");
                }
            }
        }
    }
}

function Modifiche(indiceMatrice, n, matrice, rig)
{
    let index; // variabile indice

    // rimozione numero su riga orizziontale
    for(let i = 0 + (rig * 9); i < 9 + (rig * 9); i++)
    {
        index = matrice[i].indexOf(n); // ottiene l'indice all'interno dell'array del numero in questione
        if(index > -1) // se non è presente il risultato sarà -1
        {
            matrice[i].splice(index, 1); // rimuove il numero alla posizione index, solo una volta
        }
    }

    // rimozione numero su riga verticale
    for(let i = 0 + indiceMatrice; i <= 72 + iVerticale; i += 9)
    {
        index = matrice[i].indexOf(n); // ottiene l'indice all'interno dell'array del numero in questione
        if(index > -1) // se non è presente il risultato sarà -1
        {
            matrice[i].splice(index, 1); // rimuove il numero alla posizione index, solo una volta
        }
    }

    rig = Math.floor(rig / 3) // incrementa di 1 ogni 3 righe passate, quindi ci troviamo nella regione sottostante
    indiceMatrice = Math.floor(indiceMatrice / 3); // indica la regione in cui ci troviamo (0 = altro a sinistra, 1 = altro in centro....)
    // rimozione numero su regione
    switch(indiceMatrice)
    {
        // servono cicli diversi perchè utilizzo le variabili locali del ciclo per indicare "la posizione nella matrice"
        case 0:
        case 3:
        case 6:
            // ciclo per le regioni a sinistra
            for(let i = (0 + (rig * 9)) ; i < (21 + (rig * 9)); i++)
            {           
                // se esce fuori dalla riga della regione (3*3) incrementa di 6, che lo porta alla riga successiva
                if(i == (3 + (rig * 9)) || i == (12 + (rig * 9)))
                {
                    i += 6;
                }

                index = matrice[i].indexOf(n); // ottiene l'indice all'interno dell'array del numero in questione
                if(index > -1) // se non è presente il risultato sarà -1
                {
                    matrice[i].splice(index, 1);
                }
            }
            break;
        case 1:
        case 4:
        case 7:
            // ciclo per le regioni centrali
            for(let i = (3 + (rig * 9)) ; i < (24 + (rig * 9)); i++)
            {
                // se esce fuori dalla riga della regione (3*3) incrementa di 6, che lo porta alla riga successiva
                if(i == (6 + (rig * 9)) || i == (15 + (rig * 9)))
                {
                    i += 6;
                }

                index = matrice[i].indexOf(n); // ottiene l'indice all'interno dell'array del numero in questione
                if(index > -1) // se non è presente il risultato sarà -1
                {
                    matrice[i].splice(index, 1);
                }
                

            }
            break;
        case 2:
        case 5:
        case 8:
            // ciclo per le regioni a destra
            for(let i = (6 + (rig * 9)) ; i < (27 + (rig * 9)); i++)
            {
                // se esce fuori dalla riga della regione (3*3) incrementa di 6, che lo porta alla riga successiva
                if(i == (9 + (rig * 9)) || i == (18 + (rig * 9)))
                {
                    i += 6;
                }

                index = matrice[i].indexOf(n); // ottiene l'indice all'interno dell'array del numero in questione
                if(index > -1) // se non è presente il risultato sarà -1
                {
                    matrice[i].splice(index, 1);
                }
            }
            break;
    }
}