import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NewsType } from "@/app/(legacy)/types"
import SwiperCarouselNews from "@/app/(legacy)/components/ui/swipercarouselnews"
import { mockNews } from "../mockData/mock"

describe("SwiperCarouselNews Component", () => {
  // Rendering Tests
  describe("Component Rendering", () => {
    test("should render the swiper component", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      const swiperElement = screen.getByTestId("swiper-carousel")
      expect(swiperElement).toBeInTheDocument()
    })

    test("should render all news items", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      mockNews.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-${index}`)).toBeInTheDocument()
      })
    })

    test("should render news titles", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      mockNews.forEach((news) => {
        expect(screen.getByText(news.title)).toBeInTheDocument()
      })
    })

    test("should render read more links with correct hrefs", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      mockNews.forEach((news) => {
        const link = screen.getByTestId(`read-more-${news.slug}`) as HTMLAnchorElement
        expect(link).toHaveAttribute("href", `/news/${news.slug}`)
      })
    })
  })

  // Props Handling Tests
  describe("Props Handling", () => {
    test("should handle empty news array", () => {
      const { container } = render(<SwiperCarouselNews news={[]} />)
      expect(container.querySelector(".mySwiper")).toBeInTheDocument()
    })

    test("should handle single news item", () => {
      const singleNews = [mockNews[0]]
      render(<SwiperCarouselNews news={singleNews} />)
      expect(screen.getByText(mockNews[0].title)).toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-1")).not.toBeInTheDocument()
    })

    test("should handle news with image URLs starting with /uploads/", () => {
      const newsWithUpload: NewsType[] = [
        {
          ...mockNews[0],
          news_img_url: "localhost:3001/uploads/mock/image.jpg",
        },
      ]
      render(<SwiperCarouselNews news={newsWithUpload} />)
      const image = screen.getByTestId("news-image") as HTMLImageElement
      expect(image).toBeInTheDocument()
    })
  })

  // Accessibility Tests
  describe("Accessibility", () => {
    test("should have descriptive alt text for images", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      mockNews.forEach((news) => {
        const image = screen.getByAltText(news.title) as HTMLImageElement
        expect(image).toBeInTheDocument()
      })
    })

    test("should have link text content visible", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      const links = screen.getAllByText("READ MORE")
      expect(links.length).toBe(mockNews.length)
    })
  })

  // Styling Tests
  describe("Styling & Classes", () => {
    test("should apply correct padding classes based on position", () => {
      render(<SwiperCarouselNews news={mockNews} />)
      const firstSlide = screen.getByTestId("swiper-slide-0").parentElement
      const middleSlide = screen.getByTestId("swiper-slide-1").parentElement
      const lastSlide = screen.getByTestId("swiper-slide-2").parentElement

      // First item should have pr-4
      expect(firstSlide?.querySelector(".pr-4")).toBeInTheDocument()

      // Middle item should have px-2
      expect(middleSlide?.querySelector(".px-2")).toBeInTheDocument()

      // Last item should have pl-4
      expect(lastSlide?.querySelector(".pl-4")).toBeInTheDocument()
    })
  })
})
