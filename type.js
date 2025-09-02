import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        executablePath: "/usr/bin/google-chrome-stable",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    const page = await browser.newPage()

    await page.goto("https://keybr.com", { waitUntil: 'networkidle2' })

    console.log("Page title: ", await page.title());
    
    await page.waitForSelector('a.U5FFRcTPG5.raIxoFOyiC');
    await page.click('a.U5FFRcTPG5.raIxoFOyiC');

    const input = await page.waitForSelector("div.VWtF2mmR6I.oP9Cza085L.vvFljv9VP8.kYHw0ywlCg")
    const text = await page.$eval('div.VWtF2mmR6I.oP9Cza085L.vvFljv9VP8.kYHw0ywlCg', el => el.innerText)
    const op = text.replace(/\uE000/g, " ");

    const config = {
       mistakes: {
            chance: 5,
            delay: { min: 100, max: 300 }
       },
        delays: {
            space: { chance: 50, min: 100, max: 300 }
        }
    }
   
    console.log('Text to type: ', op);
    await new Promise(r => setTimeout(r, 50000));
    // await typeInto(input, text, config)
    await browser.close();
})();
