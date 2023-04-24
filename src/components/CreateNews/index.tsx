import Layout from "@/components/Layout";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import { useState } from "react";
import classes from "./CreateNews.module.scss";
import useFetchData from "@/hooks/useFetchData";
import "react-quill/dist/quill.core.css";
import { Button, Input, DragAndDropInput, ButtonOptions } from "damnkit";
import clsx from "clsx";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function CreateNews() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [additionalImage, setAdditionalImage] = useState<string[]>([]);
  const { user } = useAuth();
  const { createNews, loading } = useFetchData();

  const handleSend = () => {
    createNews({
      description,
      imageUrl: previewImage[0],
      imageUrl2: additionalImage[0],
      text,
      title,
      email: user?.email || "",
    });
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user || !user.email || user.email.length === 0) {
    return (
      <Layout>
        <h1>You have to sign in for create news</h1>
        <Button mixName="primary" href="/sign-in">
          Sign in
        </Button>
      </Layout>
    );
  }

  const disabledButton = 
    text.length === 0 || 
    title.length === 0 || 
    description.length === 0 || 
    previewImage.length === 0 || 
    additionalImage.length === 0

  return (
    <Layout>
      <div className={classes.flexContainer}>
        <Input
          mixName="input"
          placeholder="Title"
          value={title}
          className={classes.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          mixName="input"
          placeholder="Description"
          value={description}
          className={classes.title}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DragAndDropInput
          className={clsx(
            classes.dragAndDrop,
            previewImage.length > 0 && classes.dragAndDropDone
          )}
          files={previewImage}
          onFilesLoaded={(base64Arr) => setPreviewImage(base64Arr)}
          showFiles={false}
        />
        <DragAndDropInput
          className={clsx(
            classes.dragAndDrop,
            additionalImage.length > 0 && classes.dragAndDropDone
          )}
          files={additionalImage}
          onFilesLoaded={(base64Arr) => setAdditionalImage(base64Arr)}
          showFiles={false}
        />
        <ReactQuill
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
        <Button
          mixName="primary"
          onClick={handleSend}
          className={classes.sendButton}
          disabled={disabledButton}
          disableStyles={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            cursor: 'not-allowed'
          }}
        >
          Create
        </Button>
      </div>
    </Layout>
  );
}

export default CreateNews;
