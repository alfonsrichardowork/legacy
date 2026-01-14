import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { mockNews } from "../mockData/mock"
import NewsCard from "@/app/(legacy)/components/news-card"


describe("NewsCard Vitest", () => {
  describe("Rendering Tests", () => {
    test("should render NewsCard component", () => {
      render(<NewsCard data={mockNews[0]} />)
      const swiperElement = screen.getByTestId("news-card")
      expect(swiperElement).toBeInTheDocument()
    })

    test("should render news title as H2", () => {
      render(<NewsCard data={mockNews[0]} />)
      const headingByText = screen.getByText(mockNews[0].title)
      expect(headingByText.tagName).toBe('H2')
      expect(screen.getByText(mockNews[0].title)).toBeInTheDocument()
    })
    
    test("should render news desc as H3", () => {
      render(<NewsCard data={mockNews[0]} />)
      const headingByText = screen.getByTestId(`news-description`)
      expect(headingByText.tagName).toBe('H3')
      expect(screen.getByText(mockNews[0].description)).toBeInTheDocument()
    })
    
    test("should render news image with its alt", () => {
      render(<NewsCard data={mockNews[0]} />)
      const image = screen.getByTestId(`news-image`) as HTMLImageElement
      expect(image).toBeInTheDocument()

      const imageAlt = screen.getByAltText(mockNews[0].title) as HTMLImageElement
      expect(imageAlt).toBeInTheDocument()
    })

    test("should render read more button and links with correct hrefs", () => {
      render(<NewsCard data={mockNews[0]} />)
      const link = screen.getByTestId(`read-more`) as HTMLAnchorElement
      // verify link exist and correct
      expect(link).toHaveAttribute("href", `/news/${mockNews[0].slug}`)
    })
  })
})