// scraping server side content using javascript https://w3collective.com/scrape-sever-side-content-javascript/

const axios = require("axios");
const cheerio = require("cheerio");

axios('https://solanalysis.com/')
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    console.log($);
    const marketCap = $(".flex");
    // console.log(marketCap);
    
    // with lobste.rs
    // const storyItem = $(".story");
    // const stories = [];
    // storyItem.each(function() {
    //   const title = $(this).find(".u-url").text();
    //   const domain = $(this).find("domain").text();
    //   const points = $(this).find(".score").text();
    //   stories.push({
    //     title,
    //     domain,
    //     points
    //   });
    // });
    // console.log(stories);
  })
  .catch(console.error);