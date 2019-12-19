var obj = {
    count: 0,
    countUp: function() {
        return ++this.count;
    }
};

var closer = function(){ // 使用不可
    var b = 1;
    Logger.log("obj.count = " + obj.countUp());
    return function(plusOr){
        Logger.log("plusor = " + plusOr);
        if (plusOr == 1){
            Logger.log("++b = " + ++b);
            return b;
        }else{
            return b;
        }
    };
}();

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1"); // "シート1"を取得

function doGet() {
    Logger.log('doGet関数呼び出し完了');
    try {
        var template = HtmlService.createTemplateFromFile("hello").evaluate(); // テンプレートオブジェクトの取得
    } catch(e) {
        Logger.log(e.message);
    }
    return template;
}

function QAInfo(count) { // evaluate後に呼び出されるので, doGet関数の定義の後でOK
    Logger.log('QAInfo関数呼び出し完了');
    var data = sheet.getRange(count+1, 1, 1, 6).getValues(); // セルの値を取得し, テンプレートに付与
    Logger.log('gsファイルでの' + count + '番目の問題文 = ' + data[0][0]);
    
    return data;
}

function answerButtonClick(click_value, numQ) {
    Logger.log('answerButtonClickの呼び出し完了, click_value = ' + click_value);
//    Logger.log("F" + closer(1) + "であればOK : F" + (numQ + 1));
    if(sheet.getRange("F" + (numQ + 1)).getValues() == Number(click_value)){
        Logger.log('正解');
        return 1;
    } else {
        Logger.log('不正解');
        return 0;
    }
} // function