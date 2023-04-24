import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import styles from "./Grid.module.scss";

type GridProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, ...rest }, ref) => (
    <div className={styles.grid} ref={ref} {...rest}>
      {children}
    </div>
  )
);

Grid.displayName = "Grid";

export default Grid;
