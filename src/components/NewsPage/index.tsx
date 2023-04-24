import Layout from "@/components/Layout";
import { NewsItemType } from "@/types/news";
import React, { useState } from "react";
import classes from "./NewsPage.module.scss";
import { Button } from "damnkit";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import useFetchData from "@/hooks/useFetchData";
import { useRouter } from "next/router";
import Image from "next/image";
import IconApprove from "../common/Icons/IconApprove";

type NewsItemWithoutDate = Omit<NewsItemType, "date">;
type NewsItem = NewsItemWithoutDate & { date: string };

type NewsPageProps = {
  newsItem: NewsItem;
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewsPage: React.FC<NewsPageProps> = ({ newsItem }) => {
  const [text, setText] = useState(newsItem.text);
  const [isEditing, setEditing] = useState(false);
  const { user } = useAuth();
  const { createNews, loading } = useFetchData();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSave = () =>
    createNews({
      ...newsItem,
      text,
    });

  const handleButtonClick = () => {
    if (isEditing) {
      if (text !== newsItem.text) {
        handleSave()
          .catch((err) => setError(err))
          .then(() => router.push("/"));
      }
      setEditing((prev) => !prev);
    } else {
      setEditing((prev) => !prev);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      {error.length > 0 && <div>{error}</div>}
      <div className={classes.flexContainer}>
        <h1 className={classes.title}>{newsItem.title}</h1>
        <div>{newsItem.email}</div>
      </div>
      <div className={classes.flexContainer}>
        <time>{newsItem.date}</time>
        {user?.email && user.email.length > 0 && user.email === newsItem.email && (
          <Button
            mixName="primary"
            onClick={handleButtonClick}
            leftIcon={isEditing ? <IconApprove className={classes.approveIcon} /> : <></>}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        )}
      </div>
      <div className={classes.imageContainer}>
        <div className={classes.coverImage}>
          <Image
            src={newsItem.imageUrl}
            alt="cover-image"
            layout="fill"
            objectFit="cover"
            sizes="100%"
            className={classes.image}
          />
        </div>
      </div>
      <main className={classes.textBlock}>
        {isEditing && (
          <ReactQuill
            className={classes.textWrapper}
            value={text}
            onChange={setText}
            modules={{
              toolbar: {
                container: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ align: [] }],
                  ["link", "image"],
                  ["clean"],
                  [{ color: [] }],
                ],
              },
            }}
          />
        )}
        {!isEditing && (
          <div
            className={classes.textWrapper}
            dangerouslySetInnerHTML={{ __html: newsItem.text }}
          />
        )}
      </main>
    </Layout>
  );
};

export default NewsPage;
