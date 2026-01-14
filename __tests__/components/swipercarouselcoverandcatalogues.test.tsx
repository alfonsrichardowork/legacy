import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import SwiperCarouselOneProduct from "@/app/(legacy)/components/swipercarouselcoverandcatalogues"
import { mockOneProductCatalogues, mockOneProductCover } from "../mockData/mock"
import { FilesProp } from "@/app/(legacy)/types"


describe("swipercarouselcoverandcatalogues Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the swiper component", () => {
      render(<SwiperCarouselOneProduct cover={mockOneProductCover} image_catalogues={mockOneProductCatalogues} />)
      const swiperElement = screen.getByTestId("swiper-carousel-cover-catalogues")
      expect(swiperElement).toBeInTheDocument()
    })
    
    test("should handle empty array", () => {
      const { container } = render(<SwiperCarouselOneProduct cover={mockOneProductCover} image_catalogues={[]} />)
      expect(container.querySelector(".mySwiper2")).toBeInTheDocument()
    })

    test("should handle single catalogue", () => {
      render(<SwiperCarouselOneProduct cover={mockOneProductCover} image_catalogues={[mockOneProductCatalogues[0]]} />)
      expect(screen.queryByTestId("swiper-slide-cover")).toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-catalogues-1")).toBeInTheDocument()
    })
    
    test("should render large catalogue", () => {
      const largeCatalogue : FilesProp[] = Array.from({ length: 50 }, (_, i) => ({
        name: `One Product Catalogue ${i + 1}`,
        url: "localhost:3001/uploads/mock/image.jpg",
        productId: '1'
      }))

      render(<SwiperCarouselOneProduct cover={mockOneProductCover} image_catalogues={largeCatalogue} />)

      // Verify all items are rendered
      largeCatalogue.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-catalogues-${index + 1}`)).toBeInTheDocument()
      })
    })
    
    test("should render image with its alt", () => {
      render(
        <SwiperCarouselOneProduct
          cover={mockOneProductCover}
          image_catalogues={mockOneProductCatalogues}
        />
      )

      mockOneProductCatalogues.forEach((prod, index) => {
        const image = screen.getByAltText(
          `${prod.name} - Catalogues - ${index}`
        )

        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute("alt", `${prod.name} - Catalogues - ${index}`)
      })
    })

    test("should render pagination button", () => {
      render(<SwiperCarouselOneProduct cover={mockOneProductCover} image_catalogues={mockOneProductCatalogues} />)

      expect(screen.getByTestId("swiper-slide-pagination-button-0")).toBeInTheDocument()
      
      mockOneProductCatalogues.forEach((_, index) => {
        const link = screen.getByTestId(`swiper-slide-pagination-button-${index + 1}`) as HTMLAnchorElement
        expect(link).toBeInTheDocument()
      })
    })
  })
})