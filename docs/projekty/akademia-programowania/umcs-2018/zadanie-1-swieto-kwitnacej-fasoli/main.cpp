#include <iostream>
#include <sstream>

using namespace std;

/*
 * Program zlicza litery łacińskie bez względu na ich wielkość a następnie wyświetla  najczęściej
 * i najrzadziej występującą literę (małe litery rozdzielone spacją).
 * Kody dziesiętne liter z tablicy ASCII https://www.asciitable.com/
 * A - 65, a - 97
 * ...
 * Z - 90, z - 122
 * Liter o różnych znakach jest 26: 90-65+1 = 122-97+1 == 'Z'-'A'+1 == 'z'-'a'+1
 * (bo znaki typu char są w C tak na prawdę kodem dziesiętnym je reprezentującym).
 * Wszystkie litery trzymamy w tablicy rozpoczynającej się od zera, więc znaki 'A'..'Z' przesuwamy o 'A' (65)
 * a 'a'..'z' przesuwamy o 'a' (97), pozostałe znaki ignorujemy.
 * Maksymalnie może być 2_000_000 znaków i to jednej litery, więc ptrzebujemy typu,
 * w którym możemy zmieścić liczby od 0 do 2 milionów - typ int (— 2,147,483,648 do 2,147,483,647):
 * https://msdn.microsoft.com/pl-pl/library/s3f49ktz.aspx
 *
 * Za klasyfikację liter odpowiedzialna jest funkcja classifyCharacter().
 * Za odnalezienie najliczniejszejszej i najrzadszej litery odpowiedzialna jest funkcja findMinMax().
 * Za całość analizy odpowiedzialna jest funkcja analyseText().
 *
 * */

// klasyfikacja liter
void classifyCharacters(const string &inputText, int *statistic){
    for (char c : inputText) {
        if ((c >= 'A') && (c <= 'Z')) {
            statistic[c - 'A']++;
        }
        else if ((c >= 'a') && (c <= 'z')) {
            statistic[c - 'a']++;
        }
    }
}

// odnalezienie najliczniejszej i najrzadszej litery
string findMinMax(const int *statistic, const char statisticSize) {
    int minCharCount = INT32_MAX;
    char minCharIdx = 0;
    int maxCharCount = 0;
    char maxCharIdx = 0;
    for (char i = 0; i < statisticSize; i++) {
        int charCount = statistic[i];
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
        char minChar = minCharIdx + 'a';
        char maxChar = maxCharIdx + 'a';
        // składamy wynik w jeden łańcuch
        stringstream result;
        result << maxChar << " " << minChar;
        return result.str();
    }
    else {
        return "   ";
    }
}

// analiza tekstu
string analyseText(const string &inputText) {
    const char statisticSize = 'Z' - 'A' + 1; // rozmiar 26 inaczej zapisany
    // zmienna tablicowa na liczby wystąpień każdego znaku
    int statistic[statisticSize];
    // wyzerowanie tablicy
    for (int &i : statistic) {
        i = 0;
    }
    classifyCharacters(inputText, statistic);
    return findMinMax(statistic, statisticSize);
}

// funkcja pomocnicza sprawdzająca zadany przypadek testowy
void testCase(int caseNo, const string &inputText, const string &expectedResult) {
    string result = analyseText(inputText);
    if (result == expectedResult) {
        cout << "Test Case " << caseNo << " OK. Result: " << result << endl;
    } else {
        cerr << "Test Case " << caseNo << " FAILS! Result: " << result << ", but expected: " << expectedResult << endl;
    }
}

void waitForAnyKey() {
    cout << "Press any key...";
    cin.get();
}

// wszystkie przypadki testowe
void runAllTests() {
    testCase(0, "Jedzie, jedzie Mazureczek,\nWiezie, wiezie moj wianeczek,\nrozmarynowy.", "e u");
    testCase(1, "ala ma kota", "a k");
    testCase(2, "AlA ma kotA", "a k");
    testCase(3, "ktory jest biAlym krolIkiem", "i a");
    // testy skrajnych przypadków
    testCase(4, "aAaAaA", "a a");
    testCase(5, "", "   ");
    waitForAnyKey();
}

void runConsole() {
    std::string inputText;
    char ch;
    do {
        cin >> ch;
        inputText += ch;
    } while (ch != '^'); // warunek pozostania w pętli, znak '^' kończy
    cout << analyseText(inputText);
}

int main() {
    //runConsole();
    runAllTests();
}