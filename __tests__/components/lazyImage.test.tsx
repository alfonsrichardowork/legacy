import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockImage } from "../mockData/mock"
import { LazyImage } from "@/app/(legacy)/components/lazyImage"


describe("LazyImage Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the lazyimage component", () => {
      render(<LazyImage src={mockImage.src} alt={mockImage.alt} width={mockImage.width} height={mockImage.height} />)
      const lazyImageElement = screen.getByTestId("lazy-image")
      expect(lazyImageElement).toBeInTheDocument()
    })
    
    test("should render lazyimage with its alt", () => {
        render(<LazyImage src={mockImage.src} alt={mockImage.alt} width={mockImage.width} height={mockImage.height} />)
        const imageAlt = screen.getByAltText(mockImage.alt) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
    })
  })
})