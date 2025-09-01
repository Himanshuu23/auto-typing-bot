const { default: puppeteer } = require("puppeteer")

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto("https://play.typeracer.com/")

    const input = await page.waitForSelector("input.goey")
    const text = await page.evaluate(() => {
        document.querySelector('.non-selectable-text').innerText
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

    await typeInto(input, text, config)
    await browser.close();
})