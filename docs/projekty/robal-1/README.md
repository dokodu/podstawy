# Podstawy programowania - Robal 1

Prosta gra w JavaScript demonstrująca użycie:

1. Tablic - [JavaScript Arrays](https://www.w3schools.com/js/js_arrays.asp)

2. Kanwy HTML5 - [HTML5 Canvas](https://www.w3schools.com/html/html5_canvas.asp)

`Robal` jest linią łamaną przebiegającą przez punkty zapisane w tablicy globalnej (na tym etapie nie używamy klas).
`Robal` jest wyświetlany na kanwie w kontekście 2D poprzez rysowanie prostych łączących kolejne punkty z tablicy.
`Robalem` sterujemy za pomocą klawiatury nadając mu odpowiedni kierunek, co powowuje dodanie kolejnych punktów na koniec tablicy i usunięcie punktów z początku tablicy, by zachować odpowiednią długość tablicy.
Długość tablicy (`robala`) wzrasta z każdym naciśnięciem klawisza, a co krok z prawopodobieństwem 1/10 losowany jest kierunek, który może zmienić kierunek wskazany przez gracza.

## Pliki

- [`index.html`](index.html) - strona główna
- [`kanwa.js`](kanwa.js) - skrypty odpowiedzialne za operacje na kanwie
- [`tablice-2d.js`](tablice-2d.js) - skrypty odpowiedzialne za operacje na tablicach i punktach w 2D
- [`animacja.js`](animacja.js) - skrypty odpowiedzialne za powtarzanie operacji by stworzyć animację
- [`tablice-1d.js`](tablice-1d.js) - przykłady dla tablic z punkami w 1D
- [`pomocne.js`](pomocne.js) - inne pomocne funkcje