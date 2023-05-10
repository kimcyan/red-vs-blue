const redArea = document.querySelector('#red_area');
const blueArea = document.querySelector('#blue_area');
const midArea = document.querySelector('#mid_area');

const container = document.querySelector("#container");
const topArea = document.querySelector('#top_nav');
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
    }
});
redArea.addEventListener('click', () => {
    if (!redArea.parentNode.classList.contains('after')) {
        blueArea.style.right = '-200%';
    }
});

// table 클릭 이벤트
const tables = document.querySelectorAll('.table');
let selectedIndex = 0;

function updateAreas() {
    let spans = document.querySelectorAll('.table.selected span');
    let data = Array.from(spans).map(span => span.textContent);
    console.log(data);
    blueArea.style.right = data[3] / data[0] * 100 - 150 + '%';
    blueArea.style.transform = 'skew(-16deg)';
    if (data[2] !== 0) {
        midArea.style.right = (parseInt(data[2])+parseInt(data[3])) / data[0] * 100 - 150 + '%';
    } else {
        midArea.style.right = '-100%';
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


//title 데이터
const ptitle = {
    red: ['　', 'Red', '　'],
    mid: ['발견', 'vs', '진실'],
    blue: ['　', 'Blue', '　']
}
const title = {
    first: ['축구', '축구', '야구', '야구', '농구', '대학 스포츠 대항전', '대학 스포츠 대항전', '리그 오브 레전드', '한국 정치 진영', '콜라', '한국 전자제품'],
    red: ['FC 서울', '포항 스틸러스', 'KIA 타이거즈', '롯데 자이언츠', '서울 삼성 썬더스', '고려대학교', '포항공대', '레드 진영', '보수당', '코카콜라', 'LG전자'],
    mid: ['vs'],
    blue: ['인천 유나이티드 FC', '울산 현대', '삼성 라이온즈', 'NC 다이노스', '창원 LG 세이커스', '연세대학교', '카이스트', '블루 진영', '민주당', '펩시', '삼성전자'],
    last: ['　', '　', '　', '　', '　']
}
const categoryBox = document.querySelector('#categories');

let categoryList = '';
for(let i = 0; i<11; i++){
    categoryList += `
    <div class="category">
    <div class="info">${title.first[i]}</div>
    <div class="red-team">${title.red[i]}</div>
    <div id="mid-text">vs</div>
    <div class="blue-team">${title.blue[i]}</div>
    <div class="next-button">　</div>
    </div>`
}
categoryBox.innerHTML = categoryList;
categoryBox.addEventListener('click', () => {
    categoryBox.classList.add('page-show');
})

const titleArea = document.querySelector('#title');
const Rtitle = document.querySelector('#Rtitle');
const Mtitle = document.querySelector('#Mtitle');
const Btitle = document.querySelector('#Btitle');

function updatePTitle(index) {
    Rtitle.textContent = ptitle.red[index];
    Mtitle.textContent = ptitle.mid[index];
    Btitle.textContent = ptitle.blue[index];
    console.log('1'+ Rtitle.textContent);
}
function updateTitle(index) {
    Rtitle.textContent = title.red[index];
    Mtitle.textContent = "vs";
    Btitle.textContent = title.blue[index];
    console.log('2'+Rtitle.textContent);
}

//bottom 데이터
const pbottom = ['스포츠에서 이기려면 빨간 유니폼을 입어라',
'RED vs BLUE 당신의 선택',
'그들의 연구는 통계학적으로 잘못되었다']
const bottom = ['2023년 2월 기준 한국 축구 경인 더비 전적',
'2023년 4월 22일 기준 한국 축구 동해안 더비 전적', 'KBO 리그 라이벌 매치 88고속도로 씨리즈 전적', '2023년 4월 기준 KBO 리그 라이벌 매치 낙동강 시리즈 전적', '2022-23시즌 기준 한국프로농구 전자 더비 전적',
'대학교 스포츠 대항전 연고전-고연전', '대학교 스포츠 대항전 카포전-포카전 2002 - 2022', '리그 오브 레전드 월드 챔피언십', '대한민국의 정치 진영', '세기의 라이벌 2023년 1분기 재무 비교', '대한민국 대표 전자 기업 2023년 1분기 재무 비교']
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
const topPrev = document.querySelector('#top_prev');
const topNext = document.querySelector('#top_next');


let currentPageIndex = 0;

function showPage(pageIndex) {
  pages.forEach((page, index) => {
    if(!categoryBox.classList.contains('page-show')){
        updatePTitle(pageIndex);
        updatePBottom(pageIndex);
    }
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
const categories = document.querySelectorAll('.category');
const contentPages = document.querySelectorAll('.content-page');

topPrev.addEventListener('click', () => {
    if (categoryBox.classList.contains('page-show')) {
        showPage(currentPageIndex);
        categoryBox.classList.remove('page-show');
    }
    else if (currentPageIndex > 0) {
        currentPageIndex--;
        showPage(currentPageIndex);
    }
    else {
        location.reload();
    }
});

topNext.addEventListener('click', () => {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        showPage(currentPageIndex);
    }
});


function showContentPage(index) {
    //카테고리 숨기기
    setTimeout(() => {
        categoryBox.style.opacity = 0;
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

//page 진입 이벤트
container.addEventListener('click', () => {
    container.classList.add('after');
    redArea.style.zIndex = '-3';
    midArea.style.zIndex = '-2';
    blueArea.style.zIndex = '-1';
    setTimeout(() => {
        topArea.style.opacity = '1';
        bottomArea.style.opacity = '1';
    }, 200);
    showPage(currentPageIndex);
})