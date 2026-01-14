import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockImage } from "../mockData/mock"
import { LazyImageContact } from "@/app/(legacy)/components/lazyImageContact"


describe("lazyImageContact Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the lazyImageContact component", () => {
      render(<LazyImageContact src={mockImage.src} alt={mockImage.alt} />)
      const lazyImageElement = screen.getByTestId("lazy-image-contact")
      expect(lazyImageElement).toBeInTheDocument()
    })
    
    test("should render lazyImageContact with its alt", () => {
        render(<LazyImageContact src={mockImage.src} alt={mockImage.alt} />)
        const imageAlt = screen.getByAltText(mockImage.alt) as HTMLImageElement
        expect(imageAlt).toBeInTheDocument()
    })
  })
})