import { describe, test, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import SwiperCarouselNews from "@/app/(legacy)/components/swipercarouselnews"
import { mockNews } from "../mockData/mock"
import { NewsType } from "@/app/(legacy)/types"


describe("SwiperCarouselNews Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the swiper component", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      const swiperElement = screen.getByTestId("swiper-carousel-news")
      expect(swiperElement).toBeInTheDocument()
    })
    
    test("should handle empty news array", () => {
      const { container } = render(<SwiperCarouselNews news={[]} />)
      expect(container.querySelector(".mySwiper")).toBeInTheDocument()
    })

    test("should handle single news item", () => {
      const singleNews = [mockNews[0]]
      render(<SwiperCarouselNews news={singleNews} />)
      expect(screen.queryByTestId("swiper-slide-news-0")).toBeInTheDocument()
      expect(screen.getByText(mockNews[0].title)).toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-news-1")).not.toBeInTheDocument()
    })
    
    test("should render large news array", () => {
      const largeNews : NewsType[] = Array.from({ length: 50 }, (_, i) => ({
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
      largeNews.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-news-${index}`)).toBeInTheDocument()
      })
    })

    test("should render news title as H3", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      mockNews.forEach((news) => {
        const headingByText = screen.getByText(news.title)
        expect(headingByText.tagName).toBe('H3')
        expect(screen.getByText(news.title)).toBeInTheDocument()
      })
    })
    
    test("should render news desc as H4", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      mockNews.forEach((news, index) => {
        const headingByText = screen.getByTestId(`news-description-${index}`)
        expect(headingByText.tagName).toBe('H4')
        expect(screen.getByText(news.description)).toBeInTheDocument()
      })
    })
    
    test("should render news image with its alt", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      mockNews.forEach((news, index) => {
        const image = screen.getByTestId(`news-image-${index}`) as HTMLImageElement
        expect(image).toBeInTheDocument()

        const imageAlt = screen.getByAltText(news.title) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
      })
    })

    test("should render read more button and links with correct hrefs", () => {
      render(<SwiperCarouselNews news={mockNews} />)

      // Verify the number of READ MORE links is visible and matches news items
      const links = screen.getAllByText("READ MORE")
      expect(links.length).toBe(mockNews.length)

      mockNews.forEach((news) => {
        const link = screen.getByTestId(`read-more-${news.slug}`) as HTMLAnchorElement
        const readmoreContainer: HTMLElement = link.closest(".items-start")!

        // Verify the button container exists
        expect(readmoreContainer).toBeInTheDocument()
        // verify link exist and correct
        expect(link).toHaveAttribute("href", `/news/${news.slug}`)
      })
    })
  })
})