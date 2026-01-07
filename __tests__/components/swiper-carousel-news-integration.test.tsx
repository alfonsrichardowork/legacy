import { describe, test, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import SwiperCarouselNews from "@/app/(legacy)/components/ui/swipercarouselnews"
import { mockNews } from "../mockData/mock"



describe("SwiperCarouselNews Integration Tests", () => {
  test("should render complete news card structure", () => {
    render(<SwiperCarouselNews news={mockNews} />)

    mockNews.forEach((news) => {
      // Verify the card container structure
      const readMoreLink = screen.getByTestId(`read-more-${news.slug}`)
      const cardContainer: HTMLElement = readMoreLink.closest(".items-start")!

      expect(cardContainer).toBeInTheDocument()
      expect(within(cardContainer!).getByRole("link")).toHaveAttribute("href", `/news/${news.slug}`)
    })
  })

  test("should maintain proper DOM hierarchy", () => {
    const { container } = render(<SwiperCarouselNews news={mockNews} />)

    // Swiper > SwiperSlide > div structure
    const swiper = container.querySelector(".mySwiper")
    const slides = container.querySelectorAll('[data-testid^="swiper-slide-"]')

    expect(swiper).toBeInTheDocument()
    expect(slides.length).toBe(mockNews.length)
  })

  test("should handle large news datasets", () => {
    const largeNews = Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`,
        title: `News Item ${i + 1}`,
        news_img_url: `https://example.com/news${i}.jpg`,
        description: `Description for news item ${i + 1}`,
        slug: `news-item-${i + 1}`,
        link_url: "",
        link_placeholder: "",
        event_date: new Date(),
        updatedAt: ''
    }))

    render(<SwiperCarouselNews news={largeNews} />)

    // Verify all items are rendered
    largeNews.forEach((news, index) => {
      expect(screen.getByTestId(`swiper-slide-${index}`)).toBeInTheDocument()
    })
  })
})
