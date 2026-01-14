import { AllFilterProductsOnlyType, FeaturedProducts, FilesProp, NewsType } from "@/app/(legacy)/types";
import { featuredseries, superior } from "@prisma/client";

export const mockNews: NewsType[] = [
  {
    id: '1',
    title: "First News Item",
    news_img_url: "localhost:3001/uploads/mock/image.jpg",
    description: "This is the first news description.",
    slug: "first-news",
    link_url: "",
    link_placeholder: "",
    event_date: new Date(),
    updatedAt: ''
  },
  {
    id: '2',
    title: "Second News Item",
    news_img_url: "localhost:3001/uploads/mock/image.jpg",
    description: "This is the second news description.",
    slug: "second-news",
    link_url: "",
    link_placeholder: "",
    event_date: new Date(),
    updatedAt: ''
  },
  {
    id: '3',
    title: "Third News Item",
    news_img_url: "localhost:3001/uploads/mock/image.jpg",
    description: "This is the third news description.",
    slug: "third-news",
    link_url: "",
    link_placeholder: "",
    event_date: new Date(),
    updatedAt: ''
  },
  {
    id: '4',
    title: "Fourth News Item",
    news_img_url: "localhost:3001/uploads/mock/image.jpg",
    description: "This is the fourth news description.",
    slug: "fourth-news",
    link_url: "",
    link_placeholder: "",
    event_date: new Date(),
    updatedAt: ''
  },
]

export const mockImage = {
  src: "localhost:3001/uploads/mock/image.jpg",
  alt: "Mock Image",
  width: 500,
  height: 500,
}

export const mockProduct: AllFilterProductsOnlyType = {
  products: {
    name: 'Mock Product',
    id: '1',
    slug: 'mock-product',
    cover_img: {
      url: 'localhost:3001/uploads/mock/product.jpg',
    }
  },
  size: {
    name: '12 Inch',
    value: '12'
  },
  specs: [{
    childname: 'Sensitivity',
    value: '98',
    slug: 'sensitivity',
    notes: 'Mock news',
    unit: 'dB'
  }]
}

export const mockfeaturedProducts: FeaturedProducts[] = [
  {
    id: '1',
    name: 'Mock Featured Product 1',
    slug: 'mock-featured-product-1',
    featuredImgUrl: 'localhost:3001/uploads/mock/image.jpg',
    featuredDesc: 'Featured Mock Product Description 1',
    series: 'Series 1',
  },
  {
    id: '2',
    name: 'Mock Featured Product 2',
    slug: 'mock-featured-product-2',
    featuredImgUrl: 'localhost:3001/uploads/mock/image.jpg',
    featuredDesc: 'Featured Mock Product Description 2',
    series: 'Series 2',
  },
  {
    id: '3',
    name: 'Mock Featured Product 3',
    slug: 'mock-featured-product-3',
    featuredImgUrl: 'localhost:3001/uploads/mock/image.jpg',
    featuredDesc: 'Featured Mock Product Description 3',
    series: 'Series 3',
  }
]

export const mockfeaturedSeries: featuredseries[] = [
  {
    name: "Mock Featured Series 1",
    id: "1",
    href: "/drivers/mock-series-1",
    img: "localhost:3001/uploads/mock/image.jpg",
    alt: "Mock Featured Series 1",
    desc: "Featured Mock Series Description 1",
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mock Featured Series 2",
    id: "2",
    href: "/drivers/mock-series-2",
    img: "localhost:3001/uploads/mock/image.jpg",
    alt: "Mock Featured Series 2",
    desc: "Featured Mock Series Description 2",
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Mock Featured Series 3",
    id: "3",
    href: "/drivers/mock-series-3",
    img: "localhost:3001/uploads/mock/image.jpg",
    alt: "Mock Featured Series 3",
    desc: "Featured Mock Series Description 3",
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const mockKeunggulan: superior[] = [
  {
    name: "Mock Keunggulan 1",
    id: '1',
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: "localhost:3001/uploads/mock/image.jpg"
  },
  {
    name: "Mock Keunggulan 2",
    id: '2',
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: "localhost:3001/uploads/mock/image.jpg"
  },
  {
    name: "Mock Keunggulan 3",
    id: '3',
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    url: "localhost:3001/uploads/mock/image.jpg"
  }
]

export const mockOneProductCover: FilesProp = 
{
  name: "One Product Cover",
  url: "localhost:3001/uploads/mock/image.jpg",
  productId: '1'
}

export const mockOneProductCatalogues: FilesProp[] = [
  {
    name: "One Product Catalogue 1",
    url: "localhost:3001/uploads/mock/image.jpg",
    productId: '1'
  },
  {
    name: "One Product Catalogue 2",
    url: "localhost:3001/uploads/mock/image.jpg",
    productId: '1'
  },
  {
    name: "One Product Catalogue 3",
    url: "localhost:3001/uploads/mock/image.jpg",
    productId: '1'
  }
]

export const mockOneProductDrawing: FilesProp[] = [
  {
    name: "One Product Drawing 1",
    url: "localhost:3001/uploads/mock/image.jpg",
    productId: '1'
  }
]

export const mockOneProductGraph: FilesProp[] = [
  {
    name: "One Product Graph 1",
    url: "localhost:3001/uploads/mock/image.jpg",
    productId: '1'
  }
]

export const mockOneProductImpedance: FilesProp[] = [
  {
    name: "One Product Impedance 1",
    url: "localhost:3001/uploads/mock/image.jpg",
    productId: '1'
  }
]