import { useGridSlice } from "@/utils/useGridSlice";
import Grid from "../Grid";
import Layout from "../Layout";
import News from "../News";
import { useRef } from "react";
import classes from "./Home.module.scss";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { Button, Slider } from "damnkit";

type NewsItemType = {
  imageUrl: string;
  imageUrl2: string;
  description: string;
  id: string;
  title: string;
  date: string;
};

type NewsType = NewsItemType[];

type HomePropsType = {
  newsData: NewsType;
};

const Home: React.FC<HomePropsType> = ({ newsData }) => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const { step, ref } = useGridSlice(cardsRef, newsData.length);
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Layout>
      <div className={classes.flexContainer}>
        {user?.email && user.email.length > 0 && <Button mixName="primary" onClick={() => router.push("/new")}>Create news</Button>}
      </div>
      <h1>All news</h1>
      <Grid ref={ref}>
        {[...newsData].slice(0, step).map((newsItem, index) => (
          <News
            ref={index === 0 ? cardsRef : null}
            date={newsItem.date}
            imageUrl2={newsItem.imageUrl2}
            key={newsItem.id}
            title={newsItem.title}
            description={newsItem.description}
            imageUrl={newsItem.imageUrl}
            id={newsItem.id}
          />
        ))}
      </Grid>
      <h1>Recommended news</h1>
      <Slider>
        {newsData.map((newsItem) => (
          <News
            date={newsItem.date}
            imageUrl2={newsItem.imageUrl2}
            key={newsItem.id}
            title={newsItem.title}
            description={newsItem.description}
            imageUrl={newsItem.imageUrl}
            id={newsItem.id}
          />
        ))}
      </Slider>
      <Grid>
        {[...newsData].slice(step).map((newsItem) => (
          <News
            date={newsItem.date}
            imageUrl2={newsItem.imageUrl2}
            key={newsItem.id}
            title={newsItem.title}
            description={newsItem.description}
            imageUrl={newsItem.imageUrl}
            id={newsItem.id}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;
