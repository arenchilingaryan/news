import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { db } from "../../utils/firebase";
import { convertTimestampsInMyData } from "@/utils/convertTimestamps";
import { NewsItemType } from "@/types/news";

export const getServerSideProps: GetServerSideProps = async (context) => {
  async function getNews(id: string) {
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data();
    }
  }

  if (
    !context.params ||
    !context.params.id ||
    Array.isArray(context.params.id)
  ) {
    return {
      notFound: true,
    };
  }
  const { id } = context.params;
  const news = await getNews(id) as NewsItemType;
  const data = [news].map(convertTimestampsInMyData)[0];

  return {
    props: {
      newsItem: data,
    },
  };
};
