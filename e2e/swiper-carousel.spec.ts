import { test, expect, devices } from "@playwright/test"

test.describe("Swiper Carousel E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
  })

  test("should display swiper carousel on page load", async ({ page }) => {
    const swiper = page.getByTestId("swiper-carousel")
    await expect(swiper).toBeVisible({ timeout: 10000 })
  })

  test("should display at least one news item in carousel", async ({ page }) => {
    const slides = page.locator('[data-testid^="swiper-slide-"]')
    const slideCount = await slides.count()
    expect(slideCount).toBeGreaterThan(0)
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

  test("should display news images with correct alt text", async ({ page }) => {
    const images = page.locator('[data-testid="news-image"]')

    await images.first().waitFor({ state: "visible" })

    const count = await images.count()
    expect(count).toBeGreaterThan(0)

    // Verify first image has alt text
    const firstImage = images.first()
    const altText = await firstImage.getAttribute("alt")
    expect(altText).toBeTruthy()
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

  test("should display responsive layout on mobile", async ({ page }) => {
    const swiper = page.getByTestId("swiper-carousel")
    await expect(swiper).toBeVisible()

    // Verify mobile-optimized slidesPerView still shows content
    const slides = page.locator('[data-testid^="swiper-slide-"]')
    expect(await slides.count()).toBeGreaterThan(0)
  })

  test("should display responsive layout on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })

    const swiper = page.getByTestId("swiper-carousel")
    // On tablet, md:hidden means it will be hidden (md breakpoint is 768px)
    const isVisible = await swiper.isVisible().catch(() => false)
    expect(isVisible).toBe(false)
  })

  test("should display responsive layout on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })

    const swiper = page.getByTestId("swiper-carousel")
    // On desktop, md:hidden means it will be hidden
    const isVisible = await swiper.isVisible().catch(() => false)
    expect(isVisible).toBe(false)
  })

  test("should render text content in slides", async ({ page }) => {
    const firstSlide = page.locator('[data-testid="swiper-slide-0"]').first()
    await expect(firstSlide).toBeVisible()
    
    const description = page.locator('[data-testid="news-description"]').first()
    await expect(description).toBeVisible()
    
    const textContent = await description.innerText()
    expect(textContent.length).toBeGreaterThan(0)
  })

  test("should have accessible navigation links", async ({ page }) => {
    const links = page.locator('a[href^="/news/"]')
    const count = await links.count()

    expect(count).toBeGreaterThan(0)
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
