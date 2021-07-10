// "sheetFor_question_Choice_Answer"を取得
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheetFor_question_Choice_Answer"); 
var scriptProperties = PropertiesService.getScriptProperties();

function doGet() {
  scriptProperties.setProperty('closer', '1');
  Logger.log('doGet関数呼び出し完了');
  try {
    Logger.log('テンプレート作成完了');
    var template = HtmlService.createTemplateFromFile("hello").evaluate(); // テンプレートオブジェクトの取得
  } catch(e) {
    Logger.log('エラー発生(HtmlService利用時)');
    Logger.log(e.message);
  }
  return template;
}

function getQuestionAndChoices(count) { // evaluate後に呼び出されるので, doGet関数の定義の後でOK
  Logger.log('getQuestionAndChoices関数呼び出し完了');
  Logger.log('countの値 : ' + count);
  let sumChoicesNum = sheet.getRange(count+1, 3).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn() - 2;
  Logger.log('問題数 : ' + sumChoicesNum);
  let data = sheet.getRange(count+1, 2, 1, sumChoicesNum+1).getValues(); // セルの値を取得し, テンプレートに付与
  Logger.log('gsファイルでの' + count + '番目の問題文 = ' + data[0][0]);
  return [data, sumChoicesNum];
}

function answerButtonClick(click_value, numQ) {
  //getProperty('closer'))+1だったらだめなのか?
  scriptProperties.setProperty('closer', "a".replace("a", function (){return String(Number(scriptProperties.getProperty('closer')) + 1);}));
  Logger.log('answerButtonClickの呼び出し完了, click_value = ' + click_value);
  Logger.log("F" + scriptProperties.getProperty('closer') + "であればOK : F" + (numQ + 1));
  var correctNum = sheet.getRange(numQ+1, 1).getValues();
  var correctAns = sheet.getRange(numQ+1, Number(correctNum)+2).getValue(); //正解の取得
  Logger.log("correctNum : " + correctNum + " , correctAns : " + correctAns + " , typeof correctNum : " + typeof correctNum + " , typeof correctNum+1 : " + typeof (correctNum+1) + " , typeof numQ+1 : " + typeof (numQ+1));
  Logger.log("correctNum+1 : " + correctNum+1);
  if(correctNum == Number(click_value)){
    Logger.log('正解');
    return [1, correctAns];
  } else {
    Logger.log('不正解');
    return [0, correctAns];
  }
}