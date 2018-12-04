var kanwa;
var c2d;
var kolory = ["#1a14f8", "#524efe", "#928fff", "#c4c3fc"];

function inicjujKanwe() {
    // pobieramy dostęp do kanwy
    kanwa = document.getElementById("kanwa");
    // tworzymy kontekst 2d lub 3d 
    c2d = kanwa.getContext("2d");
    console.log("kanwa", "szerokosc=" + kanwa.width, "wysokosc=" + kanwa.height);
}
function czyscKanwe() {
    c2d.clearRect(0, 0, kanwa.width, kanwa.height);
}

function wylosujKolor() {
    return kolory[Math.round(Math.random() * (kolory.length - 1))];
}
function podajKolor(i, len) {
    if (i == len - 1) {
        return "black";
    } else {
        return kolory[i % (kolory.length - 1)];
    }
}

function podajOgraniczeniaKanwy() {
    return {
        xMin: -kanwa.width / (2 * 20),
        xMax: kanwa.width / (2 * 20),
        yMin: -kanwa.height / (2 * 20),
        yMax: kanwa.height / (2 * 20)
    };
}

function przeliczPunktNaKanwe(p) {
    var np = { x: 0, y: 0 };
    if (typeof (p) == "number") {
        np.x = Math.abs(p * 20 + kanwa.width / 2) % kanwa.width;
        np.y = kanwa.height / 2;
    } else {
        np.x = Math.abs(p.x * 20 + kanwa.width / 2) % kanwa.width;
        np.y = Math.abs(p.y * 20 + kanwa.height / 2) % kanwa.height;
    }
    return np;
}


function rysujTabW2D(tab) {
    // rozpoczynamy sciezke
    if (tab.length > 1) {
        czyscKanwe();
        // rozpoczynamy sciezke
        for (i = 1; i < tab.length; i++) {
            c2d.beginPath();
            // ustawiamy kursor w punkcie pierwszym
            var pa = przeliczPunktNaKanwe(tab[i - 1]);
            c2d.moveTo(pa.x, pa.y);
            // dodajemy linie do nastepnego punktu
            var pb = przeliczPunktNaKanwe(tab[i]);
            c2d.lineTo(pb.x, pb.y);
            c2d.strokeStyle = tab[i].losowy?"red":podajKolor(i, tab.length);
            c2d.lineWidth = 10;
            // rysujemy to co jest stworzone w sciezce
            c2d.stroke();
        }
    }
}
