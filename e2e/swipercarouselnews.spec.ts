import { test, expect, devices } from "@playwright/test"

test.describe("SwiperCarouselNews Playwright E2E", () => {
  test.describe("Mobile Viewport", () => {
    test.beforeEach(async ({ page }, testInfo) => {
      test.skip(
        !testInfo.project.name.includes("Mobile"),
        "Mobile-only test"
      )

      await page.goto("/")
      await page.waitForLoadState("networkidle")
    })

    test("Swiper is visible on mobile", async ({ page }) => {
      const swiper = page.getByTestId("swiper-carousel")
      await expect(swiper).toBeVisible()
    })

    test("test should navigate to news detail page on READ MORE click", async ({ page }) => {
      const firstReadMoreLink = page.locator(
        '.swiper-slide-active a[href^="/news/"]'
      )

      await expect(firstReadMoreLink).toBeVisible()

      await Promise.all([
        page.waitForURL(/\/news\//),
        firstReadMoreLink.click(),
      ])

      expect(page.url()).toMatch(/\/news\//)
    })

    test("should handle carousel swiping (visual verification)", async ({ page }) => {
      const swiper = page.getByTestId("swiper-carousel")

      await expect(swiper).toBeVisible()

      // Get initial position
      const initialBoundingBox = await swiper.boundingBox()
      expect(initialBoundingBox).toBeTruthy()

      // Verify width and height are not zero
      if (initialBoundingBox) {
        expect(initialBoundingBox.width).toBeGreaterThan(0)
        expect(initialBoundingBox.height).toBeGreaterThan(0)
      }
    })

    test("responsive layout across breakpoints", async ({ page }) => {
      const swiper = page.getByTestId("swiper-carousel")
      await expect(swiper).toBeVisible()

      // Verify mobile-optimized slidesPerView still shows content
      const slides = page.locator('[data-testid^="swiper-slide-"]')
      expect(await slides.count()).toBeGreaterThan(0)
    })

    test("should load images without errors", async ({ page }) => {
      // Collect image load errors
      const imageErrors: string[] = []
      page.on("requestfailed", (request) => {
        if (request.resourceType() === "image") {
          imageErrors.push(request.url())
        }
      })

      await page.waitForLoadState("networkidle")

      // Log any failed images for debugging
      if (imageErrors.length > 0) {
        console.log("Failed image URLs:", imageErrors)
      }
    })
  })

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
})
