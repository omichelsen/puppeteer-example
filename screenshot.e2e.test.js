import puppeteer from 'puppeteer'
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder'

describe('puppeteer-example e2e', () => {
	let browser
	let page
	let recorder

	beforeAll(async () => {
		browser = await puppeteer.launch()
		page = await browser.newPage()
		await page.setViewport({ width: 500, height: 300, deviceScaleFactor: 2 })

		// record the e2e test
		recorder = new PuppeteerScreenRecorder(page)
	})

	afterAll(() => browser.close())

	it('should greet me', async () => {
		// start recording
		await recorder.start('./e2e.mp4')

		await page.goto(`http://localhost:4000`, {
			waitUntil: 'networkidle0',
		})

		// type in the name and submit
		await page.type('input', 'Mr McDuck')
		await page.click('button')

		// find the text element and assert that the name is shown
		const text = await page.$eval('h2', (e) => e.textContent)
		expect(text).toContain('Hi, Mr McDuck!')

		// stop recording
		await recorder.stop()
	})
})
