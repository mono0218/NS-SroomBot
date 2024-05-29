//スプレッドシート設定
const spreadId = PropertiesService.getScriptProperties().getProperty("SPREAD_ID");
const spreadSheet = SpreadsheetApp.openById(spreadId);

function getShiftName() {
  const now = new Date("2024/06/03")

  //シート設定
  const sheet = spreadSheet.getSheetByName(`${now.getMonth()+1}月`)

  //Date型の制約（月＋１＆日＋2）
  const text = sheet.createTextFinder(`${now.getMonth()+1}/${now.getDay()+2}`);
  const column = text.findAll()[0].getColumn()
  const row = text.findAll()[0].getRow() +2

  //日直の氏名を入手
  const range = sheet.getRange(row, column);
  getSlackId(range.getValue())
}

function getSlackId(name){
  //シート設定
  const sheet = spreadSheet.getSheetByName(`名簿`)
  //氏名検索
  const text = sheet.createTextFinder(name);
  const column = text.findAll()[0].getColumn()+1
  const row = text.findAll()[0].getRow()

  //氏名からIdを入手
  const  range = sheet.getRange(row, column);
  console.log(range.getValue())
}

function sendSlackMessage(Id){
  const url = PropertiesService.getScriptProperties().getProperty("WSURL");
  
  const payload = {
      "text": `<!${id}> さんが今日の日直です！`,
      "channel":"#代々木ベース"
  };
 
  const options = {
      "method" : "post",
      "contentType" : "application/json",
      "payload" : JSON.stringify(payload)
  };
 
  // HTTP リクエストでPOST送信
  UrlFetchApp.fetch(url, options);
}
