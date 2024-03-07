import React from "react";
import { render } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";

const dummyBook = {
  id: 1,
  title: "Dummy Book",
  img: 5,
  category_id: 1,
  summary: "Dummy Summary",
  detail: "Dummy Detail",
  price: 10000,
  likes: 1,
  form: "paperback",
  isbn: "Dummy ISBN",
  author: "Dummy Author",
  pages: 100,
  contents: "Dummy Contents",
  pub_date: "2024-01-01"
};

describe("BookItem", () => {
  it("렌더 여부", () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    // expect(getByText(dummyBook.title)).toBeInTheDocument();
    // expect(getByText(dummyBook.summary)).toBeInTheDocument();
    // expect(getByText(dummyBook.author)).toBeInTheDocument();
    // expect(getByText("10,000원")).toBeInTheDocument();
    // expect(getByText(dummyBook.likes)).toBeInTheDocument();
    // expect(getByAltText(dummyBook.title)).toHaveAttribute(
    //   "src", `https://picsum.photos/id/${dummyBook.img}/300/300`
    // );
  });
});