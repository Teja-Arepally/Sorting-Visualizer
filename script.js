const barsContainer = document.getElementById("bars-container");
let array = [];

function generateArray() {
    // Clear existing bars
    barsContainer.innerHTML = "";

    // Generate random array
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);

    // Create bars for the array
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; // Scale height
        barsContainer.appendChild(bar);
    });
}

async function startSorting() {
    await bubbleSort();
}

async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Highlight bars being compared
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await pause(100); // Pause to show comparison

            if (array[j] > array[j + 1]) {
                // Swap in array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Swap bar heights
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }

            // Reset color after comparison
            bars[j].style.backgroundColor = "#007bff";
            bars[j + 1].style.backgroundColor = "#007bff";
        }
        // Mark the sorted part in green
        bars[array.length - i - 1].style.backgroundColor = "green";
    }

    // Mark the first element in green at the end
    bars[0].style.backgroundColor = "green";
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate an initial array on page load
generateArray();
