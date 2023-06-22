let timerInterval;
let timerRunning = false;
let totalTime = 0; // 총 경과 시간 변수 추가
let remainingTime = 0; // 멈춘 시점에서 남은 시간 변수 추가

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

  let additionalTime = hours * 3600 + minutes * 60 + seconds; // 추가로 입력한 시간

  if (additionalTime === 0) {
    return;
  }

  if (!timerRunning) {
    totalTime = additionalTime; // 타이머가 멈춰있을 때만 totalTime 값을 업데이트
    if (remainingTime === 0) {
      remainingTime = totalTime; // 멈춘 시점에서 남은 시간을 저장
    }
  }

  timerRunning = true;
  inputContainer.style.display = 'none';

  timerInterval = setInterval(function() {
    if (remainingTime <= 0) {
      stopTimer();
      return;
    }

    hours = Math.floor(remainingTime / 3600);
    minutes = Math.floor((remainingTime % 3600) / 60);
    seconds = remainingTime % 60;

    hoursDisplay.textContent = padZero(hours);
    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);

    remainingTime -= 1; // 남은 시간을 감소시킴
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function resetTimer() {
  stopTimer();
  inputContainer.style.display = 'block';

  const hoursInput = document.getElementById('hour-input');
  const minutesInput = document.getElementById('minute-input');
  const secondsInput = document.getElementById('second-input');

  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';

  // totalTime, remainingTime 값을 0으로 재설정하여 초기화
  totalTime = 0;
  remainingTime = 0;

  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
}

function padZero(number) {
  return number.toString().padStart(2, '0');
}

// 이벤트 리스너 등록
document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('stop-btn').addEventListener('click', stopTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
