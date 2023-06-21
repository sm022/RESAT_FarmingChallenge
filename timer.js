let timerInterval;
let timerRunning = false;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

const inputContainer = document.getElementById('input-container');

function startTimer() {
  if (timerRunning) {
    return;
  }

  const hoursInput = document.getElementById('hour-input');
  const minutesInput = document.getElementById('minute-input');
  const secondsInput = document.getElementById('second-input');

  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  let totalTime = hours * 3600 + minutes * 60 + seconds;
  if (totalTime === 0) {
    return;
  }

  timerRunning = true;
  inputContainer.style.display = 'none';

  timerInterval = setInterval(function() {
    if (totalTime <= 0) {
      stopTimer();
      return;
    }

    hours = Math.floor(totalTime / 3600);
    minutes = Math.floor((totalTime % 3600) / 60);
    seconds = totalTime % 60;

    hoursDisplay.textContent = padZero(hours);
    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);

    totalTime--;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetTimer() {
  stopTimer();
  inputContainer.style.display = 'block';

  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';

  const hoursInput = document.getElementById('hour-input');
  const minutesInput = document.getElementById('minute-input');
  const secondsInput = document.getElementById('second-input');

  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}

// 이벤트 리스너 등록
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('stop-btn').addEventListener('click', stopTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);


