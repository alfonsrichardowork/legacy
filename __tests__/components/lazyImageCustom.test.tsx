import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockImage } from "../mockData/mock"
import { LazyImageCustom } from "@/app/(legacy)/components/lazyImageCustom"


describe("lazyImageCustom Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render the lazyImageCustom component", () => {
      render(<LazyImageCustom src={mockImage.src} alt={mockImage.alt} width={mockImage.width} height={mockImage.height} classname=""/>)
      const lazyImageElement = screen.getByTestId("lazy-image-custom")
      expect(lazyImageElement).toBeInTheDocument()
    })
    
    test("should render lazyImageCustom with its alt", () => {
      render(<LazyImageCustom src={mockImage.src} alt={mockImage.alt} width={mockImage.width} height={mockImage.height} classname=""/>)
      const imageAlt = screen.getByAltText(mockImage.alt) as HTMLImageElement
      expect(imageAlt).toBeInTheDocument()
    })
  })
})