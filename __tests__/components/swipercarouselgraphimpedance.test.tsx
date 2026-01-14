import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import SwiperCarouselGraphImpedance from "@/app/(legacy)/components/swipercarouselgraphimpedance"
import { mockOneProductDrawing, mockOneProductGraph, mockOneProductImpedance } from "../mockData/mock"
import { FilesProp } from "@/app/(legacy)/types"


describe("swipercarouselgraphimpedance Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the swiper component", () => {
      render(<SwiperCarouselGraphImpedance drawing={mockOneProductDrawing} graph={mockOneProductGraph} impedance={mockOneProductImpedance}/>)
      const swiperElement = screen.getByTestId("swiper-carousel-graph-impedance")
      expect(swiperElement).toBeInTheDocument()
    })
    
    test("should handle empty array", () => {
      const { container } = render(<SwiperCarouselGraphImpedance drawing={[]} graph={[]} impedance={[]} />)
      expect(container.querySelector(".mySwiper2")).toBeInTheDocument()
    })

    test("should handle single drawing", () => {
      render(<SwiperCarouselGraphImpedance drawing={[mockOneProductDrawing[0]]} graph={[]} impedance={[]} />)
      expect(screen.queryByTestId("swiper-slide-drawing-1")).toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-graph-1")).not.toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-impedance-1")).not.toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-drawing-2")).not.toBeInTheDocument()
    })
    
    test("should render large catalogue", () => {
      const largeDrawing : FilesProp[] = Array.from({ length: 50 }, (_, i) => ({
        name: `One Product Drawing ${i + 1}`,
        url: "localhost:3001/uploads/mock/image.jpg",
        productId: '1'
      }))
      const largeGraph : FilesProp[] = Array.from({ length: 50 }, (_, i) => ({
        name: `One Product Graph ${i + 1}`,
        url: "localhost:3001/uploads/mock/image.jpg",
        productId: '1'
      }))
      const largeImpedance : FilesProp[] = Array.from({ length: 50 }, (_, i) => ({
        name: `One Product Impedance ${i + 1}`,
        url: "localhost:3001/uploads/mock/image.jpg",
        productId: '1'
      }))

      render(<SwiperCarouselGraphImpedance drawing={largeDrawing} graph={largeGraph} impedance={largeImpedance} />)

      // Verify all items are rendered
      largeDrawing.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-drawing-${index + 1}`)).toBeInTheDocument()
      })
      largeGraph.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-graph-${index + 1}`)).toBeInTheDocument()
      })
      largeImpedance.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-impedance-${index + 1}`)).toBeInTheDocument()
      })
    })
    
    test("should render image with its alt", () => {
      render(<SwiperCarouselGraphImpedance drawing={mockOneProductDrawing} graph={mockOneProductGraph} impedance={mockOneProductImpedance}/>)
      mockOneProductDrawing.forEach((prod, idx) => {
        // const image = screen.getByTestId(`lazy-image-custom`) as HTMLImageElement
        // expect(image).toBeInTheDocument()

        const imageAlt = screen.getByAltText(`${prod.name} - Drawing - ${idx + 1}`) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
      })
      mockOneProductGraph.forEach((prod, idx) => {
        // const image = screen.getByTestId(`lazy-image-custom`) as HTMLImageElement
        // expect(image).toBeInTheDocument()

        const imageAlt = screen.getByAltText(`${prod.name} - Graph - ${idx + 1}`) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
      })
      mockOneProductImpedance.forEach((prod, idx) => {
        // const image = screen.getByTestId(`lazy-image-custom`) as HTMLImageElement
        // expect(image).toBeInTheDocument()

        const imageAlt = screen.getByAltText(`${prod.name} - Impedance - ${idx + 1}`) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
      })
    })

    test("should render pagination button", () => {
      render(<SwiperCarouselGraphImpedance drawing={mockOneProductDrawing} graph={mockOneProductGraph} impedance={mockOneProductImpedance}/>)
      
      const originalSlides  = [...mockOneProductDrawing, ...mockOneProductGraph, ...mockOneProductImpedance];
      const slides = originalSlides.length === 2 ? [...originalSlides, ...originalSlides] : originalSlides;
      const repeated = originalSlides.length !== slides.length
      slides.map((_, index) => {
        if(repeated && index < originalSlides.length) {
          const link = screen.getByTestId(`swiper-slide-pagination-button-${index + 1}`) as HTMLAnchorElement
          expect(link).toBeInTheDocument()
        }
      })
    })
  })
})