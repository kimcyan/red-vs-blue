const redArea = document.querySelector('#red_area');
const blueArea = document.querySelector('#blue_area');
const grayArea = document.querySelector('#gray_area');

const container = document.querySelector("#container");
const topArea = document.querySelector('#top_nav');
const footerArea = document.querySelector('#footer');

const pages = document.querySelectorAll('.page');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

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

//table 데이터
const data = {
    data1: [63,52,8,3],
    data2: [26,22,2,2],
    data3: [20,16,4,0],
    data4: [17,14,2,1],
    data5: ['종합', 'K리그1', '리그컵', 'FA컵']
};

// table 클릭 이벤트
const tables = document.querySelectorAll('.table');
let selectedIndex = 0;

function updateAreas(index) {
    blueArea.style.right = data.data4[index] / data.data1[index] * 100 - 150 + '%';
    blueArea.style.transform = 'skew(-16deg)';
    if (data.data3[index] !== 0) {
      grayArea.style.right = data.data3[index] / data.data1[index] * 100 - 71 + '%';
    } else {
      grayArea.style.right = '-100%';
    }
  }
  
function setSelectedIndex(index) {
    selectedIndex = index;
    updateAreas(index);
    tables.forEach((otherTable, otherIndex) => {
        if (otherIndex !== selectedIndex) {
        otherTable.classList.remove('selected');
        } else {
        otherTable.classList.add('selected');
        }
    });
}
  
  tables.forEach((table, index) => {
    table.addEventListener('click', () => {
      setSelectedIndex(index);
    });
  });


//title 데이터
const title = {
    red: ['　', 'FC 서울', '포항 스틸러스', '고려대학교'],
    mid: ['발견', 'vs', 'vs', 'vs'],
    blue: ['　', '인천 유나이티드 FC', '울산 현대', '연세대학교']
}
const titleArea = document.querySelector('#title');
const Rtitle = document.querySelector('#Rtitle');
const Mtitle = document.querySelector('#Mtitle');
const Btitle = document.querySelector('#Btitle');


function updateTitle(index) {
    Rtitle.textContent = title.red[index];
    Mtitle.textContent = title.mid[index];
    Btitle.textContent = title.blue[index];
}

//footer 데이터
const footer = ['2005년 영국의 저명한 과학 학술지 Nature',
'2023년 2월 기준 한국 축구 경인 더비 전적']
const footerText = document.querySelectorAll('.footer-txt');
function updateFooter(index) {
    for (i = 0; i < 4; i++) {
        footerText[i].textContent = footer[index];
    }
}
//page 이벤트
let currentPageIndex = 0;

function showPage(pageIndex) {
  pages.forEach((page, index) => {
    updateTitle(pageIndex);
    updateFooter(pageIndex);
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

prevButton.addEventListener('click', () => {
    updateAreas(selectedIndex);
    if (currentPageIndex > 0) {
        currentPageIndex--;
        showPage(currentPageIndex);
    }
    else {
        location.reload();
    }
});

nextButton.addEventListener('click', () => {
    updateAreas(selectedIndex);
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        showPage(currentPageIndex);
    }
});

//page 진입 이벤트
container.addEventListener('click', () => {
    container.classList.add('after');
    redArea.style.zIndex = '-3';
    grayArea.style.zIndex = '-2';
    blueArea.style.zIndex = '-1';
    setTimeout(() => {
        topArea.style.opacity = '1';
        footerArea.style.opacity = '1';
    }, 200);
    showPage(currentPageIndex);
})