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
  sendSlackMessage(range.getValue())
}

function sendSlackMessage(Id){
  const token = PropertiesService.getScriptProperties().getProperty("TOKEN");
  
  let slackApp = SlackApp.create(token);
  let channelId = "#代々木ベース";
  let message = `<!${Id}>さんが今日の日直です！`;
  slackApp.postMessage(channelId, message);
}
