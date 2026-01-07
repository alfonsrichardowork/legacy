import { NewsType } from "@/app/(legacy)/types";

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