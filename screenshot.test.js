import puppeteer from 'puppeteer'

// extend Jest with expect - usually put this in a Jest setup file (setupFilesAfterEnv)
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot })

describe('puppeteer-example', () => {
	let browser
	let page

	beforeAll(async () => {
		browser = await puppeteer.launch()
		page = await browser.newPage()
		await page.setViewport({ width: 500, height: 300, deviceScaleFactor: 2 })
	})

	afterAll(() => browser.close())

	it('page renders correctly', async () => {
		await page.goto('http://localhost:4000/')
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot()
	})

	it('component renders correctly', async () => {
		await page.goto('http://localhost:4000/')
		const element = await page.$('input')
		const image = await element.screenshot()
		expect(image).toMatchImageSnapshot()
	})
})
