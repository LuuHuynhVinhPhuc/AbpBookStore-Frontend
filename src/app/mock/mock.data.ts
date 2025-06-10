import { BookType } from '@proxy/marcus/book-store/books';
import { BookDTO } from '@proxy/marcus/book-store/books/dtos';

export const featuredBooks: BookDTO[] = [
  {
    id: 'a3c89a8f-9b2b-4e2c-a9f1-1c8c871ef001',
    name: 'The Great Gatsby',
    type: BookType.Adventure,
    publishDate: '1925-04-10',
    price: 15.99,
    authors: [
      {
        id: '11a222b3-c1d4-4e5f-b7dd-23156edc1aa1',
        name: 'F. Scott Fitzgerald',
        birthdate: '1896-09-24',
        shortBio: 'An American novelist known for The Great Gatsby.',
      },
    ],
  },
  {
    id: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
    name: 'To Kill a Mockingbird',
    type: BookType.Dystopia,
    publishDate: '1960-07-11',
    price: 12.99,
    authors: [
      {
        id: '22b333c4-d2e5-5f6f-c8ee-34267fed2bb2',
        name: 'Harper Lee',
        birthdate: '1926-04-28',
        shortBio: 'Pulitzer Prize-winning author of To Kill a Mockingbird.',
      },
    ],
  },
  {
    id: '9c9d4a64-8c4b-4f24-8792-ff9e1121e012',
    name: '1984',
    type: BookType.Dystopia,
    publishDate: '1949-06-08',
    price: 14.99,
    authors: [
      {
        id: '33c444d5-e3f6-6789-d9ff-45378ged3cc3',
        name: 'George Orwell',
        birthdate: '1903-06-25',
        shortBio: 'British author known for 1984 and Animal Farm.',
      },
    ],
  },
  {
    id: '1f5f2e4e-95ed-4c7b-8a7c-4f318f129e6d',
    name: 'Pride and Prejudice',
    type: BookType.Science,
    publishDate: '1813-01-28',
    price: 11.99,
    authors: [
      {
        id: '44d555e6-f4g7-7890-e0aa-56489hfe4dd4',
        name: 'Jane Austen',
        birthdate: '1775-12-16',
        shortBio: 'English novelist known for romantic fiction.',
      },
    ],
  },
];
