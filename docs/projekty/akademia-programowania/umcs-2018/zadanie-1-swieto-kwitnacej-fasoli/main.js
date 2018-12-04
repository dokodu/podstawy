/*
 * Program zlicza litery łacińskie bez względu na ich wielkość a następnie wyświetla  najczęściej
 * i najrzadziej występującą literę (małe litery rozdzielone spacją).
 * Kod programu w JavaScript jest napisany tak, by łatwo go można było przekształcic w kod C++
  * Kody dziesiętne liter z tablicy ASCII https://www.asciitable.com/
 * A - 65, a - 97
 * ...
 * Z - 90, z - 122
 * Liter o różnych znakach jest 26: 90-65+1 = 122-97+1 == 'Z'-'A'+1 == 'z'-'a'+1
 * (bo znaki typu char są w C tak na prawdę kodem dziesiętnym je reprezentującym).
 * Wszystkie litery trzymamy w tablicy rozpoczynającej się od zera, więc znaki 'A'..'Z' przesuwamy o 'A' (65)
 * a 'a'..'z' przesuwamy o 'a' (97), pozostałe znaki ignorujemy.
 * Maksymalnie może być 2_000_000 znaków i to jednej litery, więc ptrzebujemy typu,
 * w którym możemy zmieścić liczby od 0 do 2 milionów - w JavaScript mamy typy dynamiczne
 * a maksymalna liczba całkowita to 9007199254740991:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
 * Za klasyfikację liter odpowiedzialna jest funkcja classifyCharacter().
 * Za odnalezienie najliczniejszejszej i najrzadszej litery odpowiedzialna jest funkcja findMinMax().
 * Za całość analizy odpowiedzialna jest funkcja analyseText().
 *
 * */

 const A_ASCII_CODE = 'A'.charCodeAt(0)
 const Z_ASCII_CODE = 'Z'.charCodeAt(0)
 const SA_ASCII_CODE = 'a'.charCodeAt(0)
 const SZ_ASCII_CODE = 'z'.charCodeAt(0)

// klasyfikacja liter
function classifyCharacters(inputText, statistic) {
    for (var i=0; i<inputText.length; i++) {
        var c = inputText.charCodeAt(i);
        if ((c >= A_ASCII_CODE) && (c <= Z_ASCII_CODE)) {
            statistic[c - A_ASCII_CODE]++;
        } else if ((c >= SA_ASCII_CODE) && (c <= SZ_ASCII_CODE)) {
            statistic[c - SA_ASCII_CODE]++;
        }
    }
}

// odnalezienie najliczniejszej i najrzadszej litery
function findMinMax(statistic) {
    var minCharCount = Number.MAX_SAFE_INTEGER;
    var minCharIdx = 0;
    var maxCharCount = 0;
    var maxCharIdx = 0;
    for (var i = 0; i < statistic.length; i++) {
        var charCount = statistic[i];
        if (charCount > 0) {
            if (charCount < minCharCount) {
                minCharCount = charCount;
                minCharIdx = i;
            }
            if (charCount > maxCharCount) {
                maxCharCount = charCount;
                maxCharIdx = i;
            }
        }
    }
    // jeżeli były jakieś litery w tekście
    if (maxCharCount > 0) {
        // przesuwamy liczby do wartości małych liter
        var minChar = String.fromCharCode(minCharIdx + SA_ASCII_CODE);
        var maxChar = String.fromCharCode(maxCharIdx + SA_ASCII_CODE);
        // składamy wynik w jeden łańcuch
        return maxChar + " " + minChar;
    } else {
        return "   ";
    }
}

// analiza tekstu
function analyseText(inputText) {
    var statisticSize = Z_ASCII_CODE - A_ASCII_CODE + 1; // rozmiar 26 inaczej zapisany
    // zmienna tablicowa na liczby wystąpień każdego znaku
    var statistic = [];
    // wyzerowanie tablicy
    for (var i = 0; i < statisticSize; i++) {
        statistic[i] = 0;
    }
    classifyCharacters(inputText, statistic);
    return findMinMax(statistic);
}

// funkcja pomocnicza sprawdzająca zadany przypadek testowy
function testCase(caseNo, inputText, expectedResult) {
    result = analyseText(inputText);
    if (result == expectedResult) {
        console.log("Test Case " + caseNo + " OK. Result: " + result);
    } else {
        console.error("Test Case " + caseNo + " FAILS! Result: " + result + ", but expected: " + expectedResult);
    }
}

// wszystkie przypadki testowe
function runAllTests() {
    testCase(0, "Jedzie, jedzie Mazureczek,\nWiezie, wiezie moj wianeczek,\nrozmarynowy.", "e u");
    testCase(1, "ala ma kota", "a k");
    testCase(2, "AlA ma kotA", "a k");
    testCase(3, "ktory jest biAlym krolIkiem", "i a");
    // testy skrajnych przypadków
    testCase(4, "aAaAaA", "a a");
    testCase(5, "", "   ");
}

function main(inptText) {
    return analyseText(inptText);
}