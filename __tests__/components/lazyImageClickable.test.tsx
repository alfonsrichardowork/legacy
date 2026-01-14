import { describe, test, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { mockImage } from "../mockData/mock"
import { LazyImageClickable } from "@/app/(legacy)/components/lazyImageClickable"


describe("lazyImageClickable Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the lazyImageClickable component", () => {
      render(<LazyImageClickable src={mockImage.src} alt={mockImage.alt} width={mockImage.width} height={mockImage.height} />)
      const lazyImageElement = screen.getByTestId("lazy-image-clickable")
      expect(lazyImageElement).toBeInTheDocument()
    })
    
    test("should render lazyImageClickable with its alt", () => {
        render(<LazyImageClickable src={mockImage.src} alt={mockImage.alt} width={mockImage.width} height={mockImage.height} />)
        const imageAlt = screen.getByAltText(mockImage.alt) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
    })
  })
})