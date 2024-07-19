# 🍽️ Dinner scheduler

Diese Beispielprojekt wurde mit vite auf https://stackblitz.com erstellt.

🌐 **Link**: https://stackblitz.com/~/github.com/jsbase/dinnerscheduler

---

## 📋 Projektübersicht

Der Dinner Scheduler ist ein Minimum Viable Product (MVP), welches demonstriert wie mit Hilfe von vite bzw. vue3 schnell eine funktionale Lösung zu implementieren ist, die alle Anforderungen erfüllt und als Grundlage für zukünftige iterative Entwicklungen dient.

## 🛠️ Technologie-Stack

- Frontend: Vue.js 3 mit Composition API
- State Management: Pinia
- HTTP-Client: Axios
- Styling: Scoped Vanilla CSS

## 🧩 Kernkomponenten

1.  `src/components/DinnerScheduler.vue` (Hauptkomponente)
    - `src/components/ButtonShowUser.vue`
    - `src/components/ButtonSaveSchedule.vue`
      - `src/components/Notification.vue` 
    - `src/components/ButtonShowSchedules.vue`
2. `src/utils/pairingUtils.js` (Logik für die Paarbildung)
3. Pinia Store
   - `src/stores/userStore.js` (für Benutzerdaten)
   - `src/stores/scheduleStore.js` (für gespeicherte Zeitpläne)

## 🧮 Logik für die Paarbildung

Die Funktion `buildPairIndexes` in der `pairingUtils.js` ist das Herzstück des Paarbildungsalgorithmus. Sie implementiert eine Variante des Round-Robin-Turnierplans, auch bekannt als das "Alle-gegen-Alle"- oder "Jeder-gegen-Jeden"-Turnier.

### 📐 Mathematische Grundlage

Der Algorithmus basiert auf dem Circle Method Scheduling, einer eleganten Lösung für die Erstellung von Paarungen in einem Turnier mit `n` Teilnehmern, wobei `n` gerade sein muss.

### ⚙️ Funktionsweise

Der Algorithmus erstellt Paarungen für `n` Teilnehmer (wobei `n` gerade sein muss) über `n - 1` Runden, sodass jeder Teilnehmer genau einmal mit jedem anderen gepaart wird.

Der Algorithmus funktioniert wie folgt:

1. In jeder Runde bleibt ein Teilnehmer immer an einer fester Position.
2. Die anderen Teilnehmer rotieren im Uhrzeigersinn.
3. Dies garantiert, dass jeder Teilnehmer genau einmal mit jedem anderen gepaart wird.

Die mathematische Umsetzung verwendet Indizes statt Buchstaben:

1. Die Variable `max` wird als `n - 1` definiert, wobei `n` die Gesamtzahl der Teilnehmer ist.
2. Der feste Teilnehmer hat den Index `max`.
3. Die anderen Indizes werden durch die Formeln `(i + k) % max` und `(max + i - k) % max` berechnet.

Dieser Ansatz ist effizient und fair, da er alle möglichen Paarungen in der minimalen Anzahl von Runden erzeugt, ohne Wiederholungen oder Auslassungen.

## 🚀 MVP und iterative Entwicklung

Der Dinner Scheduler wurde als MVP konzipiert, der alle grundlegenden Anforderungen erfüllt. Dies ermöglicht eine schnelle Bereitstellung einer funktionsfähigen Lösung, die in nachfolgenden Scrum-Sprints weiterentwickelt und verfeinert werden kann.

#### 💡 Vorteile dieses Ansatzes:

1. Schnelle Bereitstellung einer Basisfunktionalität
2. Frühes Feedback von UX/UI, QA & Usern
3. Flexibilität für Anpassungen und Erweiterungen
4. Risikominimierung durch inkrementelle Entwicklung
5. Kontinuierliche Verbesserung durch regelmäßige Iterationen

#### 🔮 Ausblick:
- Verbesserung der Benutzeroberfläche und User Experience
- Implementierung zusätzlicher Funktionen (z.B. Essensvorlieben, Allergien)
- Optimierung der Performance und Skalierbarkeit
- Erweiterung der Filterfunktionen
- Integration von Benachrichtigungssystemen

## 🤔 Technische Entscheidungen für den MVP

Bei der Entwicklung dieses MVPs wurden bewusst einige Entscheidungen getroffen, um eine schnelle Umsetzung und Präsentation zu ermöglichen:

1. **CSS-Framework**
   - Es wurde auf den Einsatz von CSS-Bibliotheken wie Tailwind verzichtet.
   - Stattdessen wurde Vanilla CSS mit Scoped Styles verwendet.
   - Begründung: Reduzierung von externen Abhängigkeiten und schnellere initiale Entwicklung.
   - In einer Produktionsumgebung würde die Implementierung einer Pattern Library oder eines Styleguides in Betracht gezogen.

2. **TypeScript**
   - Der MVP wurde in JavaScript statt TypeScript entwickelt.
   - Begründung: Beschleunigung des initialen Entwicklungsprozesses.
   - In späteren Iterationen kann eine Migration zu TypeScript erfolgen, um die Codequalität und Wartbarkeit zu verbessern.

3. **Frontend-Tests**
   - Auf die Implementierung von Frontend-Tests (z.B. mit Jest oder Cypress) wurde vorerst verzichtet.
   - Begründung: Fokus auf schnelle Funktionalitätsbereitstellung für den MVP.
   - In nachfolgenden Entwicklungsphasen könnte hier der  Fokus auf die Einführung umfassender Testsuites liegen, um mehr Codequalität und Zuverlässigkeit zu gewährleisten.

## 🏁 Fazit

Der Dinner Scheduler MVP demonstriert die Fähigkeit, komplexe Algorithmen in einer modernen Webapplikation zu implementieren und dabei agile Entwicklungsprinzipien zu berücksichtigen. Das Projekt bietet eine solide Grundlage für zukünftige Erweiterungen und Verbesserungen, die in weiteren Iterationen sukzessive eingeführt und optimiert werden können, um den Anforderungen eines robusten, skalierbaren Produktionssystems gerecht zu werden.
