// 만든사람 : 장주호
// github.com/JOOHOJANG

// 야매 boj 스크래퍼입니다
// 1. 크롬이 깔려있어야 합니다. 
// 2. boj 접속시 자동 로그인이 되어야 합니다. 
// 3. 열려있는 크롬 창이 없어야 합니다.
// *주의 : 한번 사용시 크롬 확장프로그램 다 날아가서 다시 깔아야함!!!!!!!!!

const puppeteer = require("puppeteer");
const fs = require('fs');

function delay( timeout ) {
  return new Promise(( resolve ) => { 
    setTimeout( resolve, timeout );
  });
}
puppeteer.launch({
     headless : false  
   , devtools : true  
   , executablePath : "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"//크로미움으로 boj 접속시 그림찾기가 나타남. 
   //                                                                                크로미움 대신 크롬으로 동작함.
   , userDataDir : "C:/Users/DELL/AppData/Local/Google/Chrome/User Data" //DELL 부분에 사용자 계정 입력해야합니다.
  
}).then(async browser => {
  let id = "";//boj 아이디 입력 해주세요.
  let starturl = "http://www.acmicpc.net/user/"
  starturl+=id;
  const page = await browser.newPage();
  await page.goto(starturl, {waitUntil : "networkidle0"});
  const options = await page.$$eval('div.panel > div.panel-body > span.problem_number > a.result-ac', options => options.map(option => option.textContent));

  var len = options.length;
  for(var  i =0 ; i<len; i++){
    let url = "https://www.acmicpc.net/status?from_mine=1&problem_id="
    let url2 = "&user_id=";
    url2+=id;
    url+=options[i];
    url+=url2;
    await page.goto(url, {waitUntil : "networkidle0"});
    const element = await page.$('tbody > tr > td');
    const num = await page.evaluate(element => element.textContent, element);
    let url3 = "https://www.acmicpc.net/submit/";
    url3+=options[i];
    url3+="/";
    url3+=num;
    await page.goto(url3, {waitUntil : "networkidle0"});
    const opt = await page.$$eval('pre.CodeMirror-line', opt => opt.map(option => option.textContent));
    var res = "";
    for(var j = 0; j<opt.length ;j++){
      res+=opt[j];
      res+="\n";
    }
    let savelocation = ""; //저장 경로 입력해주세요.
    savelocation+=`${options[i]}.cpp`;
    fs.writeFile(savelocation, res, 'utf-8',   function(err){ 
      if(err) {
          console.log(err);
          return;
      }
      console.log(`${options[i]}.cpp is saved`);
  })  

  }
  console.log("scarpy out");
  await page.close();
})
