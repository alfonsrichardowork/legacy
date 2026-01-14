import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockProduct } from "../mockData/mock"
import ProductCard from "@/app/(legacy)/components/product-card"


describe("ProductCard Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render ProductCard component", () => {
      render(<ProductCard data={mockProduct} />)
      const swiperElement = screen.getByTestId("product-card")
      expect(swiperElement).toBeInTheDocument()
    })

    test("should render product title as H2", () => {
      render(<ProductCard data={mockProduct} />)
      const headingByText = screen.getByText(mockProduct.products.name)
      expect(headingByText.tagName).toBe('H2')
      expect(screen.getByText(mockProduct.products.name)).toBeInTheDocument()
    })
    
    test("should render product image with its alt", () => {
      render(<ProductCard data={mockProduct} />)
      const image = screen.getByTestId(`lazy-image-clickable`) as HTMLImageElement
      expect(image).toBeInTheDocument()

      const imageAlt = screen.getByAltText(mockProduct.products.name) as HTMLImageElement
      expect(imageAlt).toBeInTheDocument()
    })

    test("should render DETAIL button and links with correct hrefs", () => {
      render(<ProductCard data={mockProduct} />)
      const detailButton = screen.getByText(`DETAIL`)
      expect(detailButton).toBeInTheDocument()
      // verify link exist and correct
      const detailButtonLink = screen.getByTestId(`product-card`)
      expect(detailButtonLink).toHaveAttribute("href", `/products/${mockProduct.products.slug}`)
    })
  })
})