import puppeteer from "puppeteer";

(async () => {
  console.log("Launching Chrome via Puppeteer...");

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome-stable",  // your working Chrome
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://example.com", { waitUntil: "domcontentloaded" });

  console.log("Page title:", await page.title());

  // keep browser open 5s
  await new Promise(r => setTimeout(r, 5000));

  await browser.close();
  console.log("Done.");
})();
