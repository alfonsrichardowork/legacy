import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import SwiperCarouselKeunggulan from "@/app/(legacy)/components/swipercarouselkeunggulan"
import { mockKeunggulan } from "../mockData/mock"
import { superior } from "@prisma/client"


describe("SwiperCarouselKeunggulan Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the swiper component", () => {
      render(<SwiperCarouselKeunggulan unggulan={mockKeunggulan} />)
      const swiperElement = screen.getByTestId("swiper-carousel-keunggulan")
      expect(swiperElement).toBeInTheDocument()
    })
    
    test("should handle empty array", () => {
      const { container } = render(<SwiperCarouselKeunggulan unggulan={[]} />)
      expect(container.querySelector(".mySwiper")).toBeInTheDocument()
    })

    test("should handle single keunggulan", () => {
      render(<SwiperCarouselKeunggulan unggulan={[mockKeunggulan[0]]} />)
      expect(screen.queryByTestId("swiper-slide-keunggulan-0")).toBeInTheDocument()
      expect(screen.getByText(mockKeunggulan[0].name)).toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-keunggulan-1")).not.toBeInTheDocument()
    })
    
    test("should render large keunggulan", () => {
      const largeKeunggulan : superior[] = Array.from({ length: 50 }, (_, i) => ({
        name: `Mock Keunggulan ${i + 1}`,
        id: `${i + 1}`,
        updatedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        url: "localhost:3001/uploads/mock/image.jpg"
      }))

      render(<SwiperCarouselKeunggulan unggulan={largeKeunggulan} />)

      // Verify all items are rendered
      largeKeunggulan.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-keunggulan-${index}`)).toBeInTheDocument()
      })
    })

    test("should render keunggulan name as p", () => {
      render(<SwiperCarouselKeunggulan unggulan={mockKeunggulan} />)
      mockKeunggulan.forEach((unggul) => {
        const headingByText = screen.getByText(unggul.name)
        expect(headingByText.tagName).toBe('P')
        expect(screen.getByText(unggul.name)).toBeInTheDocument()
      })
    })
    
    test("should render keunggulan image with its alt", () => {
      render(<SwiperCarouselKeunggulan unggulan={mockKeunggulan} />)
      mockKeunggulan.forEach((unggul, index) => {
        const image = screen.getByTestId(`keunggulan-image-${index}`) as HTMLImageElement
        expect(image).toBeInTheDocument()

        const imageAlt = screen.getByAltText(unggul.name) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
      })
    })
  })
})