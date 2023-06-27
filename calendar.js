      document.addEventListener('DOMContentLoaded', function() {

        // "has-memo" 클래스를 가진 모든 요소를 선택하고 클래스 추
      const memoCells = document.querySelectorAll('.calendar-table td.has-memo');
      memoCells.forEach(cell => {
        cell.classList.add('has-memo');
      });
        // 캘린더 상수
        const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];
        const MONTHS_OF_YEAR = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

        // 현재 날짜 가져오기
        const currentDate = new Date();

        // 캘린더 상태
        let selectedDate = null;
        let memoData = {};
        let editMode = false; // Add editMode variable and set initial value to false


        // 로컬 스토리지에서 메모 데이터 불러오기 
        const storedMemoData = localStorage.getItem('memoData');
        if (storedMemoData) {
          memoData = JSON.parse(storedMemoData);
        }

        // DOM 요소
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

        // 캘린더 렌더링
    function renderCalendar() {
      // 캘린더 초기화 
      calendarTableBody.innerHTML = '';

      // 현재 Month 세부 정보 가져오기 
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

      // 현재 Month text 설정
      currentMonthElement.textContent = currentYear + '년 ' + MONTHS_OF_YEAR[currentMonth];

      // 캘린더 행과 셀 생성 
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
              cell.classList.add('has-memo'); // 메모가 있는 셀에 .has-memo 클래스 추가
              const memoIndicator = document.createElement('div');
              memoIndicator.classList.add('memo-indicator');
              cell.appendChild(memoIndicator);
            }

            // 메모 click 이벤트리스너 추가
            cell.addEventListener('click', function(event) {
              event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파 방지
              selectDate(cell); // 클릭된 셀과 함께 selectDate 함수를 호출
            });

            row.appendChild(cell);
            date++;
          }
        }

        calendarTableBody.appendChild(row);
      }
    }



    // 폼 없이 메모 보기
function showMemo() {
  if (selectedDate) {
    const dateString = selectedDate.toISOString().split('T')[0];
    const memoContent = memoData[dateString] || '';

    memoOverlay.style.display = 'flex';

    if (memoContent) {
      // 선택된 날짜에 메모가 있을 경우
      memoTextarea.value = memoContent;
      memoTextarea.readOnly = true;
      saveMemoButton.style.display = 'none'; // 저장 버튼 숨기기
      editMemoButton.style.display = 'inline-block'; // 수정 버튼 보이기
    } else {
      // 선택된 날짜에 메모가 없을 경우
      memoTextarea.value = '';
      memoTextarea.readOnly = false;
      saveMemoButton.style.display = 'inline-block'; // 저장 버튼 숨기기
      editMemoButton.style.display = 'none'; // 수정 버튼 보이기
    }
  }
}


        // 날짜 선택 
function selectDate(dayElement) {
  const day = parseInt(dayElement.textContent);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  selectedDate = new Date(currentYear, currentMonth, day);
  renderCalendar();

  if (memoData[selectedDate.toISOString().split('T')[0]]) {
    // 선택된 날짜에 메모가 있는 경우
    editMode = true; // 수정 모드를 true로 설정
    openMemoDialog();
  } else {
    // 선택된 날짜에 메모가 없는 경우
    editMode = false; // 수정 모드를 false로 설정
    openMemoDialog();
  }
}



        // 메모창 열기
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



      // 메모 수정
function editMemo() {
  if (selectedDate) {
    const dateString = selected창 닫기
    renderCalendar(); // 메모 indicator 업데이트를 위해 캘린더 다시 렌더링

    // 메모 데이터를 로컬 스토리지에 저장
    localStorage.setItem('memoData', JSON.stringify(memoData));
  }

      // 메모창 닫
      function closeMemoDialog() {
        memoOverlay.style.display = 'none';
        memoTextarea.value = '';
        selectedDate = null;
      }


        // 이벤트 리스너
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

        // 초기 렌더링
        renderCalendar(); 
        
      });
