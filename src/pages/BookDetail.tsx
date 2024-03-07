import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useBook } from "../hooks/useBook";
import { getImgSrc } from "../utils/image";
import Title from "../components/common/Title";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from "../utils/format";
import { Link } from "react-router-dom";
import EllipsisBox from "../components/common/EllipsisBox";
import LikeButton from "../components/book/LikeButton";
import AddToCart from "../components/book/AddToCart";

const bookInfoList = [
  {
    label: "카테고리",
    key: "category_name",
    filter: (book: IBookDetail) => <Link to={`/books?category_id=${book.category_id}`}>
      {book.category_name}</Link>
  },
  {
    label: "포맷",
    key: "form"
  },
  {
    label: "페이지",
    key: "pages"
  },
  {
    label: "ISBN",
    key: "isbn"
  },
  {
    label: "출간일",
    key: "pub_date",
    filter: (book: IBookDetail) => {
      return formatDate(book.pub_date);
    }
  },
  {
    label: "가격",
    key: "price",
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)} 원`;
    }
  },
]

function BookDetail() {
  const { bookId } = useParams();
  const { book, likeToggle } = useBook(bookId);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl>
              <dt>{item.label}</dt>
              <dd>{item.filter ? item.filter(book) : 
              book[item.key as keyof IBookDetail]}</dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>

          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Title size="medium">상세 설명</Title>
        <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>

        <Title size="medium">목차</Title>
        <p className="index">{book.contents}</p>
      </div>
    </BookDetailStyle>
  )
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({theme}) => theme.color.secondary};
        }
        a {
          color: ${({theme}) => theme.color.primary};
        }
      }
    }
  }

  .content {
    .detail {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
`;

export default BookDetail;