document.addEventListener("DOMContentLoaded", () => {
    const calendarContainer = document.getElementById("calendar");
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    
    // Fonction pour ajouter la classe "closed" aux samedis et dimanches
    const markWeekends = (dateCell, day) => {
    if (day === 6 || day === 0) {
        dateCell.classList.add("closed");
    }
    };

    // Fonction pour construire le calendrier
    const buildCalendar = (year, holidays) => {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const monthDiv = document.createElement("div");
        monthDiv.classList.add("month");
        const monthHeader = document.createElement("h2");
        monthHeader.textContent = months[monthIndex];
        monthDiv.appendChild(monthHeader);

        for (let day = 1; day <= 31; day++) {
        const dateCell = document.createElement("div");
        dateCell.classList.add("day");

          // Vérifier si c'est un jour férié
        const holidayDate = `${year}-${(monthIndex + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        if (holidays.includes(holidayDate)) {
            dateCell.classList.add("holiday");
        }

          // Marquer les weekends
        markWeekends(dateCell, new Date(year, monthIndex, day).getDay());

        dateCell.textContent = day;
        monthDiv.appendChild(dateCell);
        }

        calendarContainer.appendChild(monthDiv);
    }
    };

    // Appel de l'API Fetch pour obtenir la liste des jours fériés en France pour 2023
    fetch("https://date.nager.at/Api/v2/PublicHolidays/2023/FR")
    .then(response => response.json())
    .then(data => {
        const holidays = data.map(holiday => holiday.date);
        buildCalendar(2023, holidays);
    })
    .catch(error => console.error("Une erreur s'est produite lors de la récupération des jours fériés.", error));
});
