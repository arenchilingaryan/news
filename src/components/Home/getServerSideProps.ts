import { NewsItemType } from "@/types/news";
import { convertTimestampsInMyData } from "@/utils/convertTimestamps";
import { db } from "@/utils/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { GetServerSideProps } from "next";

async function getAllNews() {
  const a = query(collection(db, "news"));
  const data: NewsItemType[] = [];

  const querySnapshot = await getDocs(a);
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as NewsItemType);
  });

  return data;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllNews();
  const dataWithDateAsTimeStamp = data.map(convertTimestampsInMyData);
  return {
    props: {
      newsData: dataWithDateAsTimeStamp,
    },
  };
};
