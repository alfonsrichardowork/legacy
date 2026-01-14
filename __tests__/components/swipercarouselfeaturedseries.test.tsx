import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import SwiperCarouselFeaturedSeries from "@/app/(legacy)/components/swipercarouselfeaturedseries"
import { mockfeaturedSeries } from "../mockData/mock"
import { featuredseries } from "@prisma/client"


describe("SwiperCarouselFeaturedSeries Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the swiper component", () => {
      render(<SwiperCarouselFeaturedSeries seri={mockfeaturedSeries} />)
      const swiperElement = screen.getByTestId("swiper-carousel-featured-series")
      expect(swiperElement).toBeInTheDocument()
    })
    
    test("should handle empty array", () => {
      const { container } = render(<SwiperCarouselFeaturedSeries seri={[]} />)
      expect(container.querySelector(".mySwiper")).toBeInTheDocument()
    })

    test("should handle single featured series", () => {
      render(<SwiperCarouselFeaturedSeries seri={[mockfeaturedSeries[0]]} />)
      expect(screen.queryByTestId("swiper-slide-featured-series-0")).toBeInTheDocument()
      expect(screen.getByText(mockfeaturedSeries[0].name)).toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-featured-series-1")).not.toBeInTheDocument()
    })
    
    test("should render large featured series", () => {
      const largeSeries : featuredseries[] = Array.from({ length: 50 }, (_, i) => ({
        name: `Mock Featured Series ${i + 1}`,
        id: `${i + 1}`,
        href: `/drivers/mock-series-${i + 1}`,
        img: "localhost:3001/uploads/mock/image.jpg",
        alt: `Mock Featured Series ${i + 1}`,
        desc: `Featured Mock Series Description ${i + 1}`,
        updatedBy: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      render(<SwiperCarouselFeaturedSeries seri={largeSeries} />)

      // Verify all items are rendered
      largeSeries.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-featured-series-${index}`)).toBeInTheDocument()
      })
    })

    test("should render featured series title as H3", () => {
      render(<SwiperCarouselFeaturedSeries seri={mockfeaturedSeries} />)
      mockfeaturedSeries.forEach((series) => {
        const headingByText = screen.getByText(series.name)
        expect(headingByText.tagName).toBe('H3')
        expect(screen.getByText(series.name)).toBeInTheDocument()
      })
    })
    
    test("should render featured series desc as H4", () => {
      render(<SwiperCarouselFeaturedSeries seri={mockfeaturedSeries} />)
      mockfeaturedSeries.forEach((series) => {
        const headingByText = screen.getByText(`${series.desc}`)
        expect(headingByText.tagName).toBe('H4')
        expect(headingByText).toBeInTheDocument()
      })
    })
    
    test("should render featured series image with its alt", () => {
      render(<SwiperCarouselFeaturedSeries seri={mockfeaturedSeries} />)
      mockfeaturedSeries.forEach((series, index) => {
        const image = screen.getByTestId(`featured-series-image-${index}`) as HTMLImageElement
        expect(image).toBeInTheDocument()

        const imageAlt = screen.getByAltText(series.alt) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
      })
    })

    test("should have links with correct hrefs", () => {
      render(<SwiperCarouselFeaturedSeries seri={mockfeaturedSeries} />)

      mockfeaturedSeries.forEach((series) => {
        const link = screen.getByTestId(`link-${series.name}`) as HTMLAnchorElement
        // verify link exist and correct
        expect(link).toHaveAttribute("href", `${series.href}`)
      })
    })
  })
})