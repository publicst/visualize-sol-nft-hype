// https://www.browserstack.com/guide/automation-using-selenium-javascript
// var webdriver = require('selenium-webdriver');
// var browser_name = new webdriver.Builder();

// withCapabilities(webdriver.Capabilities.chrome()).build();

// browser.get('http://www.google.com');
// var promise = browser_name.getTitle();

// promise.then(function(title) {
//   console.log(title);
// });

// browser.quit();
// (； ･`д･´) no bueno

// prereq
// 1. npm install –save selenium-webdriver
// 2. https://www.npmjs.com/package/selenium-webdriver (Chrome)
// https://www.youtube.com/watch?v=fj0Ud16YJJw
// check https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Options.html
const {Builder, By, Key, util} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
async function example () {
  // add option to not show any browser
  var options = new chrome.Options();
  options.addArguments('--headless');

  // make the browser
  let driver = await new Builder().forBrowser("chrome")
                                  // .setChromeOptions(options) // https://stackoverflow.com/a/42095309/1076116
                                  .build();

  // use newly created browser to manipulate browser_name
  // access google.com
  await driver.get('http://www.google.com');
  // go to search bar, type the text and press enter (search)
  await driver.findElement(By.name("q")).sendKeys("selenium-webdriver javascript", Key.RETURN);
  // get the title of the browser
  var title = await driver.getTitle();
  console.log(title);
  
  // ヾ(:3ﾉｼヾ)ﾉｼ below seems like old way of writing it
  // var promise = browser_name.getTitle();
  // promise.then(function(title) {
  //   console.log(title);
  // });

  // by making By.css('div.result-stats') it returns "no such element"
  // makes sence since it should be div#result-stats
  // but pointing to proper element returns ECONNREFUSED connect ECONNREFUSED
  // ٩(ˊᗜˋ*)و console.log needed to await the getText!!!!!!!!!
  let elem = await driver.findElement(By.css('div#result-stats')); 
  console.log(await elem.getText()); 

  driver.quit();
}

// example()

// ALWAYS REFER TO https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/
// depending on language, the implementation and functions are different!
async function scrapeMarketCap () {
  // add option to not show any browser
  var options = new chrome.Options();
  options.addArguments('--headless');

  // make the browser
  let driver = await new Builder().forBrowser("chrome")
                                  .setChromeOptions(options) // https://stackoverflow.com/a/42095309/1076116
                                  .build();

  // wait for it to load for about 5 seconds. One liner found in https://stackoverflow.com/a/51939030/1076116
  await driver.get('https://solanalysis.com/');

  await new Promise(resolve => setTimeout(resolve, 5000)); 

  // search for the element by class 
  // elem = await driver.findElements(By.className('flex').className('items-baseline'));
  // ((((；ﾟДﾟ)))) did not work because there are multiple elements

  // so search for the element by cssSelector https://stackoverflow.com/questions/21713280/find-div-element-by-multiple-class-names
  elems = await driver.findElements(By.css('div.flex.items-baseline'));
  console.log('count of elements : ' + elems.length);
  
  // ((((；ﾟДﾟ)))) somehow forEach async is throwing ECONNREFUSED (which was caused because await was not called properly)
  // elems.forEach(async (elem)=>{
  //   text = await elem.getText();
  //   console.log(text);
  // })
  // ((((；ﾟДﾟ))))

  for (i = 0; i < elems.length; i++) {
    text = await elems[i].getText();
    text = text.substring(0, text.indexOf('\n')); // remove anything after new line since that is previous day's info
    num = Number(text.replace(/[^0-9.-]+/g,""));
    if (i == 0) {         // first one should be market cap
      marketCap = num;
    } else if (i == 1) {  // second one should be 7 days volume
      sevenDaysVolume = num;
    }
  }

  console.log(marketCap);
  console.log(sevenDaysVolume);

  // problem 1 : fixed : child span gets loaded in the WebElement
  // problem 2 : fixed : findElements has to be used because 7 Day Volume also uses EXACT SAME CSS selector... why...

  driver.quit();
}

scrapeMarketCap();