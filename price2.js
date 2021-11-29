//211123 20:48

var bal_prz;
var tool_prz;
var ivt_prz;
var area_prz;
var result_prz;


function calcs() {
    var f = document.form1;
    var xs = parseInt(f.x.value); //x width
    var ys = parseInt(f.y.value); //y width
    var es = parseInt(f.ea.value); // EA
    var AR = parseFloat(f.area.value); //area ratio
    var ivtN = f.sp_iv.checked; //inverter form nom
    var ivtC = f.ch_iv.checked; //inverter form channel
    var area = 0;
    var sheetprc = 0;
    var bal_prc = 0;
    var price = 0;
    var ivt_prc = 0;
    var tool_prc = 0;
    var area_ratio = 0;

    //면적계산
    if (AR <= 1) {
        area_ratio = xs * ys * AR;       //el 시트 실제 면적 1개당
        area = xs * ys * 2.5 * es;     //실사출력 총갯수
        sheetprc = area_ratio * es; //el시트가격 총갯수
        sheetprc = Math.round(sheetprc);
        area = Math.round(area);
        // console.log(sheetprc);
    } else {
        alert('면적 입력 오류입니다.');
        document.getElementById("form1").reset();
    }

    if (area_ratio <= 1000) {
        bal_prc = sheetprc*40;
    } else {
        switch (AR) {
            case 5:
                alert('면적 입력 오류입니다.');
                document.getElementById("form1").reset();
                break;
            case 1:
                bal_prc = sheetprc*70;
                break;
            case 0.7:
                bal_prc = sheetprc*60;
                break;
            case 0.5:
                bal_prc = sheetprc*50;
                break;
            case 0.3:
                bal_prc = sheetprc*40;
                break;
        }

    }


    // console.log(area_ratio);
    // console.log(sheetprc);
    // console.log(bal_prc);

    //최종가격
    price = bal_prc + area;

    if (ivtN && ivtC) {
        alert('인버터 방식을 선택해 주세요');
    } else if (!ivtN && !ivtC) {
        alert('인버터 방식을 선택해 주세요');
    } else if (ivtC) {
        if (area_ratio > 3600) {
            alert('발광면적이 3600cm²를 초과하였습니다.');
        } else if (area_ratio > 2400) {
            price = price + 80000 * es + 600000;
            ivt_prc = 80000 * es;
            tool_prc = 600000;
            console.log(price);
        } else if (area_ratio > 1200) {
            price = price + 60000 * es + 500000;
            ivt_prc = 60000 * es;
            tool_prc = 500000;
            console.log(price);
        } else {
            price = price + 30000 * es + 400000;
            ivt_prc = 30000 * es;
            tool_prc = 400000;
            console.log(price);
        }
    } else {
        if (area_ratio > 3600) {
            alert('발광면적이 3600cm²를 초과하였습니다.');
        } else if (area_ratio > 2400) {
            price = price + 60000 * es + 600000;
            ivt_prc = 60000 * es;
            tool_prc = 600000;
            console.log(price);
        } else if (area_ratio > 1200) {
            price = price + 40000 * es + 500000;
            ivt_prc = 40000 * es;
            tool_prc = 500000;
            console.log(price);
        } else {
            price = price + 20000 * es + 400000;
            ivt_prc = 20000 * es;
            tool_prc = 400000;
            console.log(price);
        }
    }

    var price = price.toLocaleString('ko-KR');
    var tool_prc = tool_prc.toLocaleString('ko-KR');
    var ivt_prc = ivt_prc.toLocaleString('ko-KR');
    var area = area.toLocaleString('ko-KR');
    var bal_prc = bal_prc.toLocaleString('ko-KR');

    //updated 211123
    // f.result.value = price;
    // f.tool.value = tool_prc;
    // f.ivt.value = ivt_prc;
    // f.area1.value = area;
    // f.bal_prc.value = bal_prc;

    bal_prz = bal_prc;
    tool_prz = tool_prc;
    ivt_prz = ivt_prc;
    area_prz = area;
    result_prz = price;
    console.log(bal_prz);
    // console.log(f.bal_prc);

}

function output() {
    document.getElementById("bal_prz").value = bal_prz;
    document.getElementById("tool_prz").value = tool_prz;
    document.getElementById("ivt_prz").value = ivt_prz;
    document.getElementById("area_prz").value = area_prz;
    document.getElementById("result_prz").value = result_prz;
}


//pdf 2021-1126-1617 pdf기능 완료 update
function savePDF() {
    //저장 영역 div id
    html2canvas($('#pdfArea')[0]).then(function (canvas) {

        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var margin = 10; // 출력 페이지 여백설정
        var doc = new jsPDF('p', 'mm');
        var position = 0;

        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);

        var today = new Date();  //date함수를 보기쉽게 변환 yyyy-dd-mm

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var date = year + '-' + month + '-' + day;


        doc.save(`${date}el.pdf`); //백틱으로 해결

    });
}
