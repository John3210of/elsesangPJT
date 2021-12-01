//20211201 REFACTORING

var real_print_prc;
var all_el_prc;
var ivt_prc;
var tool_prc;
var price;
var temp;

function calcs() {
    var f = document.form1;
    var xs = parseInt(f.x.value); //x width
    var ys = parseInt(f.y.value); //y width
    var es = parseInt(f.ea.value); // EA
    var AR = parseFloat(f.area.value); //area ratio
    var ivtN = f.sp_iv.checked; //inverter (normal type)
    var ivtC = f.ch_iv.checked; //inverter (channel type)



    //면적계산
    if (AR <= 1) {
        real_print_prc = xs * ys * es * 2.5;     //실사출력 총 가격
        var el_area = xs * ys * AR;       //el 시트 발광 면적
        var all_el_area = el_area * es; // el시트 총 발광면적

        all_el_area = Math.round(all_el_area); //
        temp= 0.1*real_print_prc;
        temp= Math.round(temp);
        real_print_prc= 10*temp;

    } else {
        alert('면적 입력 오류입니다.');
        document.getElementById("form1").reset();
    }

    if (el_area <= 1000) {
        all_el_prc = el_area * 40;
    } else { // 총 실사출력비 , 총 el출력비 계산 완료
        {
                switch (AR) {
                    case 5:
                        alert('면적 입력 오류입니다.');
                        document.getElementById("form1").reset();
                        break;
                    case 1:
                        all_el_prc = all_el_area*70;
                        break;
                    case 0.7:
                        all_el_prc = all_el_area*60;
                        break;
                    case 0.5:
                        all_el_prc = all_el_area*50;
                        break;
                    case 0.3:
                        all_el_prc = all_el_area*40;
                        break;
                }

            }
    }

    //총 가격 계산
    temp = real_print_prc + all_el_prc;

    if (ivtN && ivtC) {
        alert('인버터 방식을 선택해 주세요');
    } else if (!ivtN && !ivtC) {
        alert('인버터 방식을 선택해 주세요');
    } else if (ivtC) {
        if (el_area > 3600) {
            alert('발광면적이 3600cm²를 초과하였습니다.');
        } else if (el_area > 2400) {
            ivt_prc = 80000*es;
            tool_prc = 600000;
        } else if (el_area > 1200) {
            ivt_prc = 60000*es;
            tool_prc = 500000;
        } else {
            ivt_prc = 30000*es;
            tool_prc = 400000;
        }
    } else {
        if (el_area > 3600) {
            alert('발광면적이 3600cm²를 초과하였습니다.');
        } else if (el_area > 2400) {
            ivt_prc = 60000 * es;
            tool_prc = 600000;
        } else if (el_area > 1200) {
            ivt_prc = 40000 * es;
            tool_prc = 500000;
        } else {
            ivt_prc = 20000 * es;
            tool_prc = 400000;
        }
    }

    price = temp + ivt_prc + tool_prc;

    // 출력부 1000마다 콤마 찍어내기
    real_print_prc = real_print_prc.toLocaleString('ko-KR');
    all_el_prc = all_el_prc.toLocaleString('ko-KR');
    ivt_prc = ivt_prc.toLocaleString('ko-KR');
    tool_prc = tool_prc.toLocaleString('ko-KR');
    price = price.toLocaleString('ko-KR');

}

function output() {
    //html 로 연동된 ID들
    document.getElementById("area_prz").value = real_print_prc;
    document.getElementById("bal_prz").value = all_el_prc;
    document.getElementById("ivt_prz").value = ivt_prc;
    document.getElementById("tool_prz").value = tool_prc;
    document.getElementById("result_prz").value = price;
}


//pdf 2021-1126-1617 pdf기능 완료 update
function savePDF() {
    //저장 영역 div id
    html2canvas($('#pdfArea')[0],{
        scale : 3
    }

    ).then(function (canvas) {

        var imgData = canvas.toDataURL('image/jpg');
        var imgWidth = 210;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var margin = 10; // 출력 페이지 여백설정
        var doc = new jsPDF('p', 'mm');
        var position = 10;

        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);

        var today = new Date();  //date함수를 보기쉽게 변환 yyyy-dd-mm
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var date = year + '-' + month + '-' + day;

        doc.save(`${date}el.pdf`); //백틱으로 해결

    });
}