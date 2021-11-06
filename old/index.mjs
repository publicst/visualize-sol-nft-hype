import fetch from 'node-fetch';

// (￣ー￣)ｂｸﾞｯ!
// import jsdom from 'jsdom';
// const {JSDOM} = jsdom; // what is this {} doing here? -> destructuring assignment https://stackoverflow.com/a/25188048/1076116
// commenting above to check proper way works with this
// (￣ー￣)ｂｸﾞｯ!
import {JSDOM} from 'jsdom'; // seems to work now

(async ()=> {
  // const res = await fetch('https://ncode.syosetu.com/n2413ep/'); // works
  const res = await fetch('https://solanalysis.com/');
  // ( ﾟдﾟ)ﾊｯ! I think the issue is website is not loaded. (it has loading screen)
  // ( ﾟдﾟ)ﾊｯ! Search how I can wait for the site to load. https://w3collective.com/scrape-sever-side-content-javascript/
  const html = await res.text();
  console.log(html);
  const dom = new JSDOM(html);
  const document = dom.window.document;
  // const node = document.querySelector('#longstop'); // works
  const node = document.querySelector('.flex.items-baseline'); // does not work. returns null
  console.log(node);
  // console.log(node.textContent.trim());
})();

/* TS version

import fetch, { RequestInfo } from 'node-fetch'
import { JSDOM } from 'jsdom'

export async function fetchHtml (url: RequestInfo): Promise<Document> {
  const resp = await fetch(url)
  const body = await resp.text()
  const { window } = new JSDOM(body)
  const { document } = window
  return document
}

*/