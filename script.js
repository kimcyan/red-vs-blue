/* 추가/삭제되는 클래스 정리
category 선택하면 category-box에 page-show 추가, 해당 content-page에 content-show 추가
선택된 table에 selected 추가
목록에서 container에 bottom-click 추가
*/
let scoreRed = 0;
let scoreBlue = 0;
const redArea = document.querySelector('#red-area');
const blueArea = document.querySelector('#blue-area');
const midArea = document.querySelector('#mid-area');

const container = document.querySelector('#container');
const topArea = document.querySelector('#top-nav');
const bottomArea = document.querySelector('#bottom');

const pages = document.querySelectorAll('.page');

redArea.addEventListener('mouseover', () => {
  if (!redArea.parentNode.classList.contains('after')) {
    blueArea.style.right = '-102%';
  }
});
redArea.addEventListener('mouseout', () => {
  if (!redArea.parentNode.classList.contains('after')) {
    blueArea.style.right = '-100%';
  }
});
blueArea.addEventListener('mouseover', () => {
  if (!redArea.parentNode.classList.contains('after')) {
    blueArea.style.right = '-98%';
  }
});
blueArea.addEventListener('mouseout', () => {
  if (!redArea.parentNode.classList.contains('after')) {
    blueArea.style.right = '-100%';
  }
});
blueArea.addEventListener('click', () => {
  if (!redArea.parentNode.classList.contains('after')) {
    blueArea.style.right = '0%';
    blueArea.style.transform = 'skew(0)';
    startPage();
    if (contentPages[15].classList.contains('red-clicked')) {
      contentPages[15].classList.remove('red-clicked');
      scoreRed--;
    }
    contentPages[15].classList.add('blue-clicked');
    scoreBlue++;
  }
});
redArea.addEventListener('click', () => {
  if (!redArea.parentNode.classList.contains('after')) {
    blueArea.style.right = '-200%';
    blueArea.style.transform = 'skew(0)';
    midArea.style.transform = 'skew(0)';
    startPage();
    if (contentPages[15].classList.contains('blue-clicked')) {
      contentPages[15].classList.remove('blue-clicked');
      scoreBlue--;
    }
    contentPages[15].classList.add('red-clicked');
    scoreRed++;
  }
});
const choiceTotal = document.querySelector('#choice-total');
const choiceRed = document.querySelector('#choice-red');
const choiceBlue = document.querySelector('#choice-blue');
function updateScore() {
  let scoreTotal = scoreRed + scoreBlue;
  choiceTotal.innerHTML = scoreTotal;
  choiceRed.innerHTML = scoreRed;
  choiceBlue.innerHTML = scoreBlue;
}

// table 클릭 이벤트
const tables = document.querySelectorAll('.table');
let selectedIndex = 0;

function updateAreas() {
  let spans = document.querySelectorAll('.table.selected span');
  let data = Array.from(spans).map((span) => span.textContent);
  console.log(data);
  blueArea.style.right = (data[3] / data[0]) * 100 - 150 + '%';
  if (data[3] == 0 || data[3] == data[0]) {
    blueArea.style.transform = 'skew(0)';
  } else {
    blueArea.style.transform = 'skew(-16deg)';
  }
  if (data[2] == 0) {
    midArea.style.transform = 'skew(0)';
    midArea.style.right = '-150%';
  } else if (data[2] == data[0]) {
    midArea.style.transform = 'skew(0)';
    midArea.style.right =
      ((parseInt(data[2]) + parseInt(data[3])) / data[0]) * 100 - 150 + '%';
  } else {
    midArea.style.transform = 'skew(-16deg)';
    midArea.style.right =
      ((parseInt(data[2]) + parseInt(data[3])) / data[0]) * 100 - 150 + '%';
  }
  if (data[0] == data[1]) {
    midArea.style.transform = 'skew(0)';
    blueArea.style.transform = 'skew(0)';
  }
}

function setSelectedIndex(index) {
  selectedIndex = index;
  tables.forEach((otherTable, otherIndex) => {
    if (otherIndex !== selectedIndex) {
      otherTable.classList.remove('selected');
    } else {
      otherTable.classList.add('selected');
    }
  });
  updateAreas();
}

tables.forEach((table, index) => {
  table.addEventListener('click', () => {
    setSelectedIndex(index);
  });
});

//top title 데이터
const ptitle = {
  red: ['　', 'Red', '　'],
  mid: ['발견', 'vs', '진실'],
  blue: ['　', 'Blue', '　'],
};
const title = {
  first: [
    '축구',
    '축구',
    '야구',
    '야구',
    '농구',
    '농구',
    '배구',
    '대학 스포츠 대항전',
    '대학 스포츠 대항전',
    '리그 오브 레전드',
    '카트라이더',
    '전자 기업',
    '콜라',
    'CPU',
    '정치 진영',
  ],
  red: [
    'FC 서울',
    '포항 스틸러스',
    'KIA 타이거즈',
    '롯데 자이언츠',
    '서울 삼성 썬더스',
    '울산 현대모비스 피버스',
    'KGC인삼공사',
    '고려대학교',
    '포항공대',
    '레드 진영',
    '레드팀',
    'LG전자',
    '코카콜라',
    'AMD',
    '보수당',
    'Red',
  ],
  mid: ['vs'],
  blue: [
    '인천 유나이티드 FC',
    '울산 현대',
    '삼성 라이온즈',
    'NC 다이노스',
    '창원 LG 세이커스',
    '전주 KCC 이지스',
    '한국도로공사',
    '연세대학교',
    '카이스트',
    '블루 진영',
    '블루팀',
    '삼성전자',
    '펩시코',
    'Intel',
    '민주당',
    'Blue',
  ],
  last: ['　', '　', '　', '　', '　'],
};
const categoryBox = document.querySelector('#category-box');

let categoryList = '';
for (let i = 0; i < 15; i++) {
  if (i == 5) {
    categoryList += `
    <div class="category">
    <div class="category-container">
    <div class="info">${title.first[i]}</div>
    <div class="red-team" style="letter-spacing: -1px;">${title.red[i]}</div>
    <div id="mid-text">vs</div>
    <div class="blue-team">${title.blue[i]}</div>
    <div class="next-button">　</div>
    </div>
    </div>`;
  } else {
    categoryList += `
    <div class="category">
    <div class="category-container">
    <div class="info">${title.first[i]}</div>
    <div class="red-team">${title.red[i]}</div>
    <div id="mid-text">vs</div>
    <div class="blue-team">${title.blue[i]}</div>
    <div class="next-button">　</div>
    </div>
    </div>`;
  }
}
categoryList += `
    <p class="text-bottom">
      <span class="mark bottom-next-btn">연구의 진실 확인하기→</span>
    </p>`;
categoryBox.innerHTML = categoryList;

const categories = document.querySelectorAll('.category');

categories.forEach((category) => {
  category.addEventListener('click', () => {
    categoryBox.classList.add('page-show');
    addBottomClick();
  });
});

const titleArea = document.querySelector('#title');
const Rtitle = document.querySelector('#Rtitle');
const Mtitle = document.querySelector('#Mtitle');
const Btitle = document.querySelector('#Btitle');

function updatePTitle(index) {
  Rtitle.textContent = ptitle.red[index];
  Mtitle.textContent = ptitle.mid[index];
  Btitle.textContent = ptitle.blue[index];
}
function updateTitle(index) {
  Rtitle.textContent = title.red[index];
  Mtitle.textContent = 'vs';
  Btitle.textContent = title.blue[index];
}

//bottom 데이터
const pbottom = [
  '스포츠에서 이기려면 빨간 유니폼을 입어라',
  'RED vs BLUE 당신의 선택',
  '그들의 연구는 통계학적으로 잘못되었다',
];
const bottom = [
  '2023년 2월 기준 K리그 경인 더비 전적',
  '2023년 4월 기준 K리그 동해안 더비 전적',
  'KBO 리그 88고속도로 씨리즈 전적',
  '2023년 4월 기준 KBO 리그 낙동강 시리즈 전적',
  '2022-23시즌 기준 한국프로농구 전자 더비 전적',
  '2022-23시즌 기준 한국프로농구 현대가 더비 전적',
  '2022-23시즌 기준 V-리그 공사더비 전적',
  '대학교 스포츠 대항전 연고전-고연전 1965 - 2022',
  '대학교 스포츠 대항전 카포전-포카전 2002 - 2022',
  '리그 오브 레전드 2022년 리그별 전적',
  '2022 카트라이더 리그 팀전 전적',
  '대한민국 대표 전자 기업 2023년 2분기',
  '세기의 라이벌 콜라 브랜드 2023년 2분기',
  'CPU 라이벌 2023년 2분기',
  '대한민국의 정치 진영',
  '당신의 선택 --- RED ---',
  '당신의 선택 --- BLUE ---',
];
const bottomText = document.querySelectorAll('.bottom-txt');
function updatePBottom(index) {
  for (i = 0; i < 4; i++) {
    bottomText[i].textContent = pbottom[index];
  }
}
function updateBottom(index) {
  for (i = 0; i < 4; i++) {
    bottomText[i].textContent = bottom[index];
  }
}
//page 이벤트
const topPrev = document.querySelector('#top-prev');
const topNext = document.querySelector('#top-next');

let currentPageIndex = 0;

function showPage(pageIndex) {
  console.log(`showPage: ${pageIndex}`);
  pages.forEach((page, index) => {
    updatePTitle(pageIndex);
    updatePBottom(pageIndex);
    if (index === pageIndex) {
      setTimeout(() => {
        page.style.display = 'block';
      }, 200);
      setTimeout(() => {
        page.style.opacity = '1';
      }, 400);
    } else {
      page.style.opacity = '0';
      setTimeout(() => {
        page.style.display = 'none';
      }, 200);
    }
  });
}

const contentPages = document.querySelectorAll('.content-page');
const bottomNext = document.querySelectorAll('.bottom-next-btn');
const bottomToFirst = document.querySelector('#bottom-prev-btn');

//category 리스트의 마지막 페이지 이벤트
function addBottomClick() {
  console.log('bottomclickevent1 start');
  console.log(currentPageIndex);
  if (currentPageIndex === 1 && !categoryBox.classList.contains('page-show')) {
    console.log('bottomclickevent2 pageindex = 1');
    container.classList.add('bottom-click');
  } else {
    console.log('bottomclickevent3');
    container.classList.remove('bottom-click');
  }
}
//첫 페이지로 돌아가는 함수
function toFirstPage() {
  closeAllPopup();
  topArea.style.opacity = '0';
  bottomArea.style.opacity = '0';
  redArea.style.zIndex = '1';
  midArea.style.zIndex = '0';
  blueArea.style.zIndex = '2';
  blueArea.style.right = '-100%';
  midArea.style.right = '-150%';
  setTimeout(() => {
    blueArea.style.transform = 'skew(-16deg)';
    container.classList.remove('after');
  }, 200);
}

//이전 페이지 이벤트
topPrev.addEventListener('click', () => {
  closeAllPopup();
  topNext.style.opacity = 1;
  topNext.style.cursor = 'pointer';
  console.log(`topPrev clicked / ${currentPageIndex}`);
  if (categoryBox.classList.contains('page-show')) {
    showPage(currentPageIndex);
    categoryBox.classList.remove('page-show');
  } else if (currentPageIndex > 0) {
    currentPageIndex--;
    showPage(currentPageIndex);
  } else {
    toFirstPage();
  }
  addBottomClick();
});
bottomToFirst.addEventListener('click', () => {
  topNext.style.opacity = 1;
  topNext.style.cursor = 'pointer';
  currentPageIndex = 0;
  toFirstPage();
  addBottomClick();
});
//다음 페이지 이벤트
function toNextPage() {
  closeAllPopup();
  console.log(`toNextPage index: ${currentPageIndex}`);
  if (currentPageIndex < pages.length - 1 && topNext.style.opacity == '1') {
    currentPageIndex++;
    showPage(currentPageIndex);
  }
  if (currentPageIndex == pages.length - 1) {
    topNext.style.opacity = 0;
    topNext.style.cursor = 'default';
  }
  addBottomClick();
}
bottomNext.forEach((nextBtn) => {
  nextBtn.addEventListener('click', toNextPage);
});
topNext.addEventListener('click', toNextPage);

function showContentPage(index) {
  //카테고리 숨기기
  setTimeout(() => {
    categoryBox.style.opacity = 0;
    topNext.style.opacity = 0;
    topNext.style.cursor = 'default';
  }, 200);
  setTimeout(() => {
    categoryBox.style.display = 'none';
  }, 400);
  // 해당 content-page 보여주기
  contentPages[index].classList.add('content-show');
  setTimeout(() => {
    contentPages[index].style.display = 'block';
  }, 400);
  setTimeout(() => {
    contentPages[index].style.opacity = 1;
  }, 600);

  const selectedTable = document.querySelector('.selected');
  selectedTable.classList.remove('selected');
  const firstTable = document.querySelectorAll('.content-show .table');
  firstTable[0].classList.add('selected');
  updateAreas();
}

function hideContentPages() {
  // 모든 content-page 숨기기
  contentPages.forEach((contentPage) => {
    contentPage.classList.remove('content-show');
    contentPage.style.opacity = 0;
    setTimeout(() => {
      contentPage.style.display = 'none';
    }, 400);
  });
}
categories.forEach((category, index) => {
  category.addEventListener('click', () => {
    updateTitle(index);
    updateBottom(index);
    hideContentPages();
    showContentPage(index);
  });
});

topPrev.addEventListener('click', () => {
  hideContentPages();
  setTimeout(() => {
    categoryBox.style.display = 'block';
  }, 200);
  setTimeout(() => {
    categoryBox.style.opacity = 1;
  }, 400);
});
bottomArea.addEventListener('click', () => {
  if (container.classList.contains('bottom-click')) {
    updateScore();
    updateTitle(15);
    if (contentPages[15].classList.contains('red-clicked')) {
      console.log('red-clicked');
      updateBottom(15);
    } else {
      console.log('blue-clicked');
      updateBottom(16);
    }
    hideContentPages();
    showContentPage(15);
    categoryBox.classList.add('page-show');
    addBottomClick();
  }
});
//page 진입 이벤트
function startPage() {
  container.classList.add('after');
  redArea.style.zIndex = '-3';
  midArea.style.zIndex = '-2';
  blueArea.style.zIndex = '-1';
  setTimeout(() => {
    topArea.style.opacity = '1';
    bottomArea.style.opacity = '1';
  }, 200);
  showPage(currentPageIndex);
}

VanillaTilt.init(categories, {
  max: 20,
  speed: 200,
  axis: 'y',
  reverse: true,
});

// 설명 페이지 논모달 팝업 이벤트
const marks = document.querySelectorAll('.click-info');
const popups = document.querySelectorAll('.popup-wrap');
const popupCloseBtns = document.querySelectorAll('.popup-close');

marks.forEach((mark, index) => {
  mark.addEventListener('click', () => {
    if (!popups[index].classList.contains('show-popup')) {
      openPopup(mark, popups[index], index);
    }
  });
});

popupCloseBtns.forEach((button, index) => {
  button.addEventListener('click', () => {
    closePopup(popups[index]);
  });
});

const textBox = document.querySelectorAll('.text-box');

function openPopup(element, popup, index) {
  const elementRect = element.getBoundingClientRect();
  const popupWidth = 212;
  let textBoxRect = 0;
  if (index < 5) {
    textBoxRect = textBox[0].getBoundingClientRect();
  } else {
    textBoxRect = textBox[1].getBoundingClientRect();
  }

  if (elementRect.width >= textBoxRect.width - 90) {
    popup.style.right = 'initial';
    popup.style.left = 'initial';
  } else if (elementRect.left + popupWidth > textBoxRect.right) {
    popup.style.right = 0;
    popup.style.left = 'initial';
  } else {
    popup.style.right = 'initial';
    popup.style.left = '0';
  }

  popup.classList.add('show-popup');
}
function closePopup(popup) {
  popup.classList.remove('show-popup');
}

function closeAllPopup() {
  popups.forEach((popup) => [closePopup(popup)]);
}
