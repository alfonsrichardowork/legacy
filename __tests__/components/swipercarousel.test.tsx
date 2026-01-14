import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockfeaturedProducts } from "../mockData/mock"
import SwiperCarousel from "@/app/(legacy)/components/swipercarousel"
import { FeaturedProducts } from "@/app/(legacy)/types"


describe("SwiperCarousel Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the swiper component", () => {
      render(<SwiperCarousel slides={mockfeaturedProducts} />)
      const swiperElement = screen.getByTestId("swiper-carousel")
      expect(swiperElement).toBeInTheDocument()
    })
    
    test("should handle empty array", () => {
      const { container } = render(<SwiperCarousel slides={[]} />)
      expect(container.querySelector(".mySwiper")).toBeInTheDocument()
    })

    test("should handle single featured product", () => {
      render(<SwiperCarousel slides={[mockfeaturedProducts[0]]} />)
      expect(screen.queryByTestId("swiper-slide-0")).toBeInTheDocument()
      expect(screen.getByText(mockfeaturedProducts[0].name)).toBeInTheDocument()
      expect(screen.queryByTestId("swiper-slide-1")).not.toBeInTheDocument()
    })
    
    test("should render large featured products", () => {
      const largeProd : FeaturedProducts[] = Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Mock Featured Product ${i + 1}`,
        slug: `mock-featured-product-${i + 1}`,
        featuredImgUrl: 'localhost:3001/uploads/mock/image.jpg',
        featuredDesc: `Featured Mock Product Description ${i + 1}`,
        series: `Series ${i + 1}`,
      }))

      render(<SwiperCarousel slides={largeProd} />)

      // Verify all items are rendered
      largeProd.forEach((_, index) => {
        expect(screen.getByTestId(`swiper-slide-${index}`)).toBeInTheDocument()
      })
    })

    test("should render featured product title as H3", () => {
      render(<SwiperCarousel slides={mockfeaturedProducts} />)
      mockfeaturedProducts.forEach((prod) => {
        const headingByText = screen.getByText(prod.name)
        expect(headingByText.tagName).toBe('H3')
        expect(screen.getByText(prod.name)).toBeInTheDocument()
      })
    })
    
    test("should render featured product series as H4", () => {
      render(<SwiperCarousel slides={mockfeaturedProducts} />)
      mockfeaturedProducts.forEach((prod) => {
        const headingByText = screen.getByText(`${prod.series} SERIES`)
        expect(headingByText.tagName).toBe('H4')
        expect(screen.getByText(`${prod.series} SERIES`)).toBeInTheDocument()
      })
    })
    
    test("should render news image with its alt", () => {
      render(<SwiperCarousel slides={mockfeaturedProducts} />)
      mockfeaturedProducts.forEach((prod, index) => {
        const image = screen.getByTestId(`featured-product-image-${index}`) as HTMLImageElement
        expect(image).toBeInTheDocument()

        const imageAlt = screen.getByAltText(prod.name) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
      })
    })

    test("should render learn more button and links with correct hrefs", () => {
      render(<SwiperCarousel slides={mockfeaturedProducts} />)

      const links = screen.getAllByText("LEARN MORE")
      expect(links.length).toBe(mockfeaturedProducts.length)

      mockfeaturedProducts.forEach((prod) => {
        const link = screen.getByTestId(`learn-more-${prod.slug}`) as HTMLAnchorElement
        const container = screen.getByTestId(`learn-more-container-${prod.slug}`)

        // Verify the button container exists
        expect(container).toBeInTheDocument()
        // verify link exist and correct
        expect(link).toHaveAttribute("href", `/products/${prod.slug}`)
      })
    })
  })
})