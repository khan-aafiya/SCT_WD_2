// Initialize variables
let timer; // Stores the interval ID for the stopwatch
let timeElapsed = 0; // Tracks the total elapsed time in milliseconds
let running = false; // Keeps track of whether the stopwatch is running
let startBtn = document.getElementById('start');
let lapBtn = document.getElementById('lap');
let lapsBox = document.querySelector('.laps-box');
let countLaps = 0; // Tracks the Number laps
let totalLaps = 0; // Store the total laps time
const updateInterval = 10; // Update interval in milliseconds (10ms for smooth display)
let table = document.getElementById("laps-table");

/**
 * Formats the time in milliseconds into a readable string: "HH:MM:SS.mmm".
 * @param {number} ms - Time in milliseconds.
 * @returns {string} - Formatted time string.
 */
function formatTime(ms) {
    const hrs = Math.floor(ms / 3600000).toString().padStart(2, '0'); 
    const mins = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0'); 
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0'); 
    const milSecs = Math.floor(ms % 1000).toString().padStart(3, '0'); 
    return `${ hrs }:${ mins }:${ secs }.${ milSecs }`; 
}

/**
 * Updates the stopwatch display with the formatted time.
 */
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = formatTime(timeElapsed);
}


startBtn.addEventListener('click', () => {
    if (!running) { 
        running = true; 
        timer = setInterval(() => {
            timeElapsed += updateInterval; // Increment elapsed time by the update interval
            updateDisplay(); // Update the display
        }, updateInterval); // Fire the interval every 10m
        startBtn.innerText = "Stop";
    } else {
        clearInterval(timer); // Stop the interval
        running = false;
        startBtn.innerText = "Start";
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer); // Stop the interval if running
    running = false;
    timeElapsed = 0;
    deleteAllData();
    updateDisplay();
    startBtn.innerText = "Start";
});

/**
 * Clears all laps from the table and resets lap data.
 */
function deleteAllData() {
    // Clear laps from the table
    while (table.rows.length > 1) { // Keep the header row intact
        table.deleteRow(1);
    }
    lapsBox.classList.add("hide"); // Hide laps box if needed
    countLaps = 0; // Reset lap count
    totalLaps = 0; // Reset total laps
    console.log("All laps have been deleted.");
}



lapBtn.addEventListener('click', () => {
    lapsBox.classList.remove("hide");
    countLaps++;
    let crr = timeElapsed; // current time
    totalLaps = crr + totalLaps;

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = countLaps;
    let td2 = document.createElement("td");
    td2.innerText = formatTime(crr);
    let td3 = document.createElement("td");
    td3.innerText = formatTime(totalLaps);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);

    if (countLaps == 5) {
        lapsBox.classList.add("over");
    }
});


// Initialize the display when the page loads
updateDisplay();