document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class "has-memo" and add the class to them
  const memoCells = document.querySelectorAll('.calendar-table td.has-memo');
  memoCells.forEach(cell => {
    cell.classList.add('has-memo');
  });

  // Calendar Constants
  const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];
  const MONTHS_OF_YEAR = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // Get current date
  const currentDate = new Date();

  // Calendar State
  let selectedDate = null;
  let memoData = {};
  let editMode = false; // Add editMode variable and set initial value to false

  // Load memo data from local storage
  const storedMemoData = localStorage.getItem('memoData');
  if (storedMemoData) {
    memoData = JSON.parse(storedMemoData);
  }

  // DOM Elements
  const currentMonthElement = document.querySelector('.current-month');
  const calendarTableBody = document.querySelector('.calendar-table tbody');
  const prevMonthButton = document.querySelector('.prev-month');
  const nextMonthButton = document.querySelector('.next-month');
  const memoOverlay = document.querySelector('.memo-overlay');
  const memoDialog = document.querySelector('.memo-dialog');
  const memoTextarea = document.querySelector('.memo-textarea');
  const editMemoButton = document.querySelector('.edit-memo');
  const saveMemoButton = document.querySelector('.save-memo');
  const closeDialogButton = document.querySelector('.close-dialog');

  // Render Calendar
  function renderCalendar() {
    // Clear calendar
    calendarTableBody.innerHTML = '';

    // Get current month details
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    // Set current month text
    currentMonthElement.textContent = currentYear + '년 ' + MONTHS_OF_YEAR[currentMonth];

    // Create calendar rows and cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          const cell = document.createElement('td');
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          const cell = document.createElement('td');
          const cellContent = document.createElement('div');
          cellContent.textContent = date;
          cell.appendChild(cellContent);
          cell.dataset.date = `${currentYear}-${currentMonth + 1}-${date}`;

          if (selectedDate && selectedDate.getTime() === new Date(`${currentYear}-${currentMonth + 1}-${date}`).getTime()) {
            cell.classList.add('selected');
          }

          const dateKey = cell.dataset.date;
          if (memoData[dateKey]) {
            cell.classList.add('has-memo'); // Add .has-memo class to cells with memo
            const memoIndicator = document.createElement('div');
            memoIndicator.classList.add('memo-indicator');
            cell.appendChild(memoIndicator);
          }

          // Add memo click event listener
          cell.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click event from propagating to parent elements
            selectDate(cell); // Call selectDate function with the clicked cell
          });

          row.appendChild(cell);
          date++;
        }
      }

      calendarTableBody.appendChild(row);
    }
  }

  // Select Date
  function selectDate(dayElement) {
    const day = parseInt(dayElement.textContent);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    selectedDate = new Date(currentYear, currentMonth, day);
    renderCalendar();

    if (memoData[selectedDate.toISOString().split('T')[0]]) {
      editMemo();
    } else {
      openMemoDialog();
    }
  }

  // Open Memo Dialog
  function openMemoDialog() {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      const memoContent = memoData[dateString] || '';
      memoTextarea.value = memoContent;
      memoTextarea.readOnly = false;
      saveMemoButton.style.display = 'inline-block';
      editMemoButton.style.display = 'none';
      memoOverlay.style.display = 'flex';
      memoTextarea.focus();
    }
  }

  // Edit Memo
  function editMemo() {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      const memoContent = memoData[dateString] || '';
      memoTextarea.value = memoContent;
      memoTextarea.readOnly = true;
      saveMemoButton.style.display = 'inline-block';
      editMemoButton.style.display = 'none';
      memoOverlay.style.display = 'flex';
      memoTextarea.focus();
    }
  }

  // Save memo
  function saveMemo() {
    if (selectedDate) {
      const date = selectedDate.toISOString().split('T')[0];
      memoData[date] = memoTextarea.value;

      // Update selected cell with memo indicator
      const selectedCell = calendarTableBody.querySelector(`[data-date="${date}"]`);
      if (selectedCell) {
        const memoIndicator = selectedCell.querySelector('.memo-indicator');
        if (memoData[date]) {
          if (!memoIndicator) {
            const newMemoIndicator = document.createElement('div');
            newMemoIndicator.classList.add('memo-indicator');
            selectedCell.appendChild(newMemoIndicator);
          }
        } else {
          if (memoIndicator) {
            selectedCell.removeChild(memoIndicator);
          }
        }
      }
    }

    editMode = false;
    closeMemoDialog(); // Close the dialog after saving the memo
    renderCalendar(); // Render the calendar to update memo indicators

    // Save memo data to local storage
    localStorage.setItem('memoData', JSON.stringify(memoData));
  }

  // Close Memo Dialog
  function closeMemoDialog() {
    memoOverlay.style.display = 'none';
    memoTextarea.value = '';
    selectedDate = null;
  }

  // Event Listeners
  prevMonthButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  calendarTableBody.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'DIV' && target.parentNode.tagName === 'TD') {
      selectDate(target.parentNode);
    }
  });

  saveMemoButton.addEventListener('click', saveMemo);
  editMemoButton.addEventListener('click', editMemo);
  closeDialogButton.addEventListener('click', closeMemoDialog);

  // Initial Render
  renderCalendar();
});
