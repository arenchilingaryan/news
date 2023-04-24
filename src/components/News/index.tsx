import React, { forwardRef } from "react";
import Image from "next/image";
import styles from "./News.module.scss";
import Link from "next/link";

interface NewsProps {
  title: string;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  date: string;
  id: string;
}

const News = forwardRef<HTMLDivElement, NewsProps>(
  ({ title, description, imageUrl, imageUrl2, date, id }, ref) => {
    return (
      <Link href={`/news/${id}`}>
        <div className={styles.news} ref={ref}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                sizes="100%"
                className={styles.image}
              />
              <Image
                src={imageUrl2}
                alt={title}
                layout="fill"
                objectFit="cover"
                sizes="100%"
                className={`${styles.image} ${styles.imageHover}`}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.titleAndDate}>
              <h3 className={styles.title}>{title}</h3>
              <span className={styles.date}>{date}</span>
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </Link>
    );
  }
);

News.displayName = "News";

export default News;
