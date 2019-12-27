var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1"); // "シート1"を取得
var scriptProperties = PropertiesService.getScriptProperties();

function doGet() {
    scriptProperties.setProperty('closer', '1');
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
    Logger.log('data[0][3] = ' + data[0][3]);
    
    return data;
}

function answerButtonClick(click_value, numQ) {
    scriptProperties.setProperty('closer', "a".replace("a", function (){return String(Number(scriptProperties.getProperty('closer')) + 1);}));
    Logger.log('answerButtonClickの呼び出し完了, click_value = ' + click_value);
    Logger.log("F" + scriptProperties.getProperty('closer') + "であればOK : F" + (numQ + 1));
    if(sheet.getRange("F" + (numQ + 1)).getValues() == Number(click_value)){
        Logger.log('正解');
        return 1;
    } else {
        Logger.log('不正解');
        return 0;
    }
} // function