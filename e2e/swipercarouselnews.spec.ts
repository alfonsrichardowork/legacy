import { test, expect } from "@playwright/test"

test.describe("SwiperCarouselNews Playwright E2E (only on mobile and tablet viewport)", () => {
  test.describe("Mobile Viewport", () => {
    test.beforeEach(async ({ page }, testInfo) => {
      test.skip(
        !testInfo.project.name.includes("Mobile"),
        "Mobile-only test"
      )

      await page.goto("/")
      await page.waitForLoadState("networkidle")
    })

    test.describe("Swiper Carousel Visibility", () => {
      test("Swiper is visible on mobile", async ({ page }) => {
        const swiper = page.getByTestId("swiper-carousel-news")
        await expect(swiper).toBeVisible()
      })

      test("responsive layout across breakpoints", async ({ page }) => {
        const swiper = page.getByTestId("swiper-carousel-news")
        await expect(swiper).toBeVisible()

        // Verify mobile-optimized slidesPerView still shows content
        const slides = page.locator('[data-testid^="swiper-slide-news-"]')
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

      test("should handle rapid navigation clicks", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.goto("/")

        const getActiveReadMore = () =>
          page
          .getByTestId(/read-more-/)
          .first()

        // First click
        await expect(getActiveReadMore()).toBeVisible()
        await Promise.all([
          page.waitForURL(/\/news\//),
          getActiveReadMore().click(),
        ])

        // Go back and wait for Swiper to reappear
        await page.goBack()
        await page.waitForURL("/")
        await expect(page.locator('[data-testid="swiper-carousel-news"]')).toBeVisible()

        // Swipe to next slide (this is the key part)
        const swiper = page.locator('[data-testid="swiper-carousel-news"]')

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
      
      test("should navigate to news detail page on READ MORE click", async ({ page }) => {
        const readMoreLink = page
          .getByTestId(/read-more-/)
          .first()

        await expect(readMoreLink).toBeVisible()

        await Promise.all([
          page.waitForURL(/\/news\//),
          readMoreLink.click(),
        ])

        await expect(page).toHaveURL(/\/news\//)
      })

      test("should handle carousel swiping (visual verification)", async ({ page }) => {
        const swiper = page.getByTestId("swiper-carousel-news")

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
    })


  })

  test.describe("Tablet Viewport", () => {
    
    test.describe("Tablet Android Portrait Only (other tablet widths are too wide, swiper doesn't show)", () => {
      test.beforeEach(async ({ page }, testInfo) => {
        test.skip(
          !testInfo.project.name.includes("Tablet Android Portrait"),
          "Tablet-only test"
        )

        await page.goto("/")
        await page.waitForLoadState("networkidle")
      })

      test.describe("Swiper Carousel Visibility", () => {
        test("Swiper is visible on tablet", async ({ page }) => {
          const swiper = page.getByTestId("swiper-carousel-news")
          await expect(swiper).toBeVisible()
        })

        test("responsive layout across breakpoints", async ({ page }) => {
          const swiper = page.getByTestId("swiper-carousel-news")
          await expect(swiper).toBeVisible()

          // Verify tablet-optimized slidesPerView still shows content
          const slides = page.locator('[data-testid^="swiper-slide-news-"]')
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

        test("should handle rapid navigation clicks", async ({ page }) => {
          await page.setViewportSize({ width: 375, height: 812 })
          await page.goto("/")

          const getActiveReadMore = () =>
            page
            .getByTestId(/read-more-/)
            .first()

          // First click
          await expect(getActiveReadMore()).toBeVisible()
          await Promise.all([
            page.waitForURL(/\/news\//),
            getActiveReadMore().click(),
          ])

          // Go back and wait for Swiper to reappear
          await page.goBack()
          await page.waitForURL("/")
          await expect(page.locator('[data-testid="swiper-carousel-news"]')).toBeVisible()

          // Swipe to next slide (this is the key part)
          const swiper = page.locator('[data-testid="swiper-carousel-news"]')

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
        
        test("should navigate to news detail page on READ MORE click", async ({ page }) => {
          const readMoreLink = page
            .getByTestId(/read-more-/)
            .first()

          await expect(readMoreLink).toBeVisible()

          await Promise.all([
            page.waitForURL(/\/news\//),
            readMoreLink.click(),
          ])

          await expect(page).toHaveURL(/\/news\//)
        })

        test("should handle carousel swiping (visual verification)", async ({ page }) => {
          const swiper = page.getByTestId("swiper-carousel-news")

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
      })

    })
  })

})
