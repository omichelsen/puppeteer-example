import puppeteer from 'puppeteer'

// create a new browser and open a page
const browser = await puppeteer.launch()
const page = await browser.newPage()

// set the size of the browser window
await page.setViewport({ width: 500, height: 300, deviceScaleFactor: 2 })

// open the URL you want to capture and wait for loading to complete
await page.goto(`http://localhost:4000`, {
	waitUntil: 'networkidle0',
})

// take a screenshot of the window
await page.screenshot({ path: 'page.png' })

// close the browser (or the script will hang)
await browser.close()
