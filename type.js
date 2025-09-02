import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        executablePath: "/usr/bin/google-chrome-stable",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    const page = await browser.newPage()

    await page.goto("https://play.typeracer.com", { waitUntil: 'networkidle2' })

    console.log("Page title: ", await page.title());
    const input = await page.waitForSelector("input.txtInput")
    const text = await page.evaluate(() => {
        return document.querySelector('.nonSelectable')?.innerText || "";
    })

    const config = {
       mistakes: {
            chance: 5,
            delay: { min: 100, max: 300 }
       },
        delays: {
            space: { chance: 50, min: 100, max: 300 }
        }
    }
    console.log('Text to type: ', text);
    await new Promise(r => setTimeout(r, 10000));
    // await typeInto(input, text, config)
    await browser.close();
})();
