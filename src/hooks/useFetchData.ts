import { useState } from "react";
import { useRouter } from "next/router";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { CreateNewsDataType, NewsItemType } from "@/types/news";
import { nanoid } from "nanoid";

const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  async function createNews(newsData: CreateNewsDataType) {
    setLoading(true);
    const newData = {
      id: nanoid(),
      date: new Date(),
      ...newsData,
    };

    try {
      await setDoc(doc(db, "news", newData.id), newData);
      router.push("/");
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  async function getNews(id: string) {
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      setError({ message: "No such document!", name: "Document not found" });
    }
  }

  return { loading, error, createNews, getNews };
};

export default useFetchData;
