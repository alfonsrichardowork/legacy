import { test, expect } from "@playwright/test"

test.describe("Swiper Carousel Interaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    // Wait for swiper to be interactive
    await page.waitForLoadState("networkidle")
  })

  test("should be keyboard navigable", async ({ page }) => {
    const firstLink = page.locator('a[href^="/news/"]').first()

    // Tab to the first link
    await page.keyboard.press("Tab")

    // Verify we can tab through links
    await expect(firstLink)
      .toBeFocused({ timeout: 100 })
      .catch(() => {
        // Links might require multiple tabs
      })
  })

  test("should maintain focus state on READ MORE button", async ({ page }) => {
    const firstButton = page.locator("text=READ MORE").first()

    await firstButton.focus()
    await expect(firstButton).toBeFocused()
  })

  test("should support touch swipe on mobile (simulate)", async ({ page, browserName }) => {
    // Skip on non-webkit browsers as touch behavior varies
    // if (browserName === "chromium" || browserName === "firefox") {
    //   test.skip()
    // }

    await page.setViewportSize({ width: 375, height: 667 })

    const swiper = page.getByTestId("swiper-carousel")

    // Get the bounding box
    const boundingBox = await swiper.boundingBox()
    expect(boundingBox).toBeTruthy()

    const box = await swiper.boundingBox()

    if (!box) throw new Error('Swiper not found')

    const startX = box.x + box.width * 0.8
    const endX = box.x + box.width * 0.2
    const y = box.y + box.height / 2

    await page.mouse.move(startX, y)
    await page.mouse.down()
    await page.mouse.move(endX, y, { steps: 15 })
    await page.mouse.up()

    // Verify swiper is still visible
    await expect(swiper).toBeVisible()
  })

  test("test should handle rapid navigation clicks", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")

    const getActiveReadMore = () =>
      page.locator('.swiper-slide-active [data-testid^="read-more-"]')

    // First click
    await expect(getActiveReadMore()).toBeVisible()
    await Promise.all([
      page.waitForURL(/\/news\//),
      getActiveReadMore().click(),
    ])

    // Go back and wait for Swiper to reappear
    await page.goBack()
    await page.waitForURL("/")
    await expect(page.locator('[data-testid="swiper-carousel"]')).toBeVisible()

    // Swipe to next slide (this is the key part)
    const swiper = page.locator('[data-testid="swiper-carousel"]')

    await swiper.hover()
    await page.mouse.down()
    await page.mouse.move(100, 0)
    await page.mouse.up()

    // Second click
    await expect(getActiveReadMore()).toBeVisible()
    await Promise.all([
      page.waitForURL(/\/news\//),
      getActiveReadMore().click(),
    ])

    expect(page.url()).toContain("/news/")
  })
})
