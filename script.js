document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progressBar");
    const progressBtn = document.getElementById("progressBtn");
    const resetBtn = document.getElementById("resetBtn");
    const timeDisplay = document.getElementById("timeDisplay");

    const stopwatchDisplay = document.getElementById("stopwatchDisplay");
    const startStopwatchBtn = document.getElementById("startStopwatchBtn");
    const resetStopwatchBtn = document.getElementById("resetStopwatchBtn");

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let currentProgress = 0;
    let totalTime = 60 * 60; // 60 minutes in seconds
    let elapsedTime = 0;
    let isRunning = false;

    let stopwatchTime = 0;
    let stopwatchInterval;
    let stopwatchRunning = false;

    function updateProgressBar() {
        currentProgress = (elapsedTime / totalTime) * 100;
        progressBar.style.width = `${currentProgress}%`;
    }

    function updateTimeDisplay() {
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    }

    function incrementProgress() {
        if (elapsedTime < totalTime) {
            elapsedTime += 5 * 60; // Increment by 5 minutes (300 seconds)
            if (elapsedTime > totalTime) {
                elapsedTime = totalTime;
            }
            updateProgressBar();
            updateTimeDisplay();
            progressBtn.classList.add("pulse");
            setTimeout(() => progressBtn.classList.remove("pulse"), 2000);
        }

        if (elapsedTime >= totalTime) {
            progressBtn.textContent = "Completed!";
            progressBtn.disabled = true;
        }
    }

    function resetTimer() {
        elapsedTime = 0;
        currentProgress = 0;
        progressBar.style.width = "0%";
        updateTimeDisplay();
        progressBtn.textContent = "Start Focus";
        progressBtn.disabled = false;
        isRunning = false;
    }

    function updateStopwatchDisplay() {
        const minutes = Math.floor(stopwatchTime / 60);
        const seconds = stopwatchTime % 60;
        stopwatchDisplay.textContent = `${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;
    }

    function startStopwatch() {
        if (!stopwatchRunning) {
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                updateStopwatchDisplay();
            }, 1000);
            stopwatchRunning = true;
            startStopwatchBtn.textContent = "Stop";
        } else {
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
            startStopwatchBtn.textContent = "Start";
        }
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        stopwatchRunning = false;
        updateStopwatchDisplay();
        startStopwatchBtn.textContent = "Start";
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = document.createElement("li");
        taskItem.classList.add(
            "flex",
            "items-center",
            "justify-between",
            "p-2",
            "border",
            "border-gray-300",
            "rounded"
        );

        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskText;
        taskTextElement.classList.add("flex-grow");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("bg-red-500", "text-white", "p-2", "rounded");
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(taskItem);
        });

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add(
            "bg-green-500",
            "text-white",
            "p-2",
            "rounded",
            "ml-2"
        );
        completeBtn.addEventListener("click", () => {
            taskTextElement.classList.toggle("line-through");
        });

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(deleteBtn);
        taskItem.appendChild(completeBtn);
        taskList.appendChild(taskItem);

        taskInput.value = "";
    }

    progressBtn.addEventListener("click", () => {
        if (!isRunning) {
            isRunning = true;
            progressBtn.textContent = "Progress 5 Minutes";
        }
        incrementProgress();
    });

    resetBtn.addEventListener("click", resetTimer);

    startStopwatchBtn.addEventListener("click", startStopwatch);
    resetStopwatchBtn.addEventListener("click", resetStopwatch);

    addTaskBtn.addEventListener("click", addTask);

    // Initialize display
    updateTimeDisplay();
    updateStopwatchDisplay();
});
