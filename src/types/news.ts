type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type NewsItemType = {
  title: string;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  date: string | Timestamp;
  id: string;
  text: string;
  email: string;
};

export type CreateNewsDataType = Omit<Omit<NewsItemType, "id">, "date">;
