import React, { useCallback, useRef, useState } from "react";
import styles from "./DragAndDropInput.module.scss";
import { clsx } from "clsx";

type DragAndDropInputProps = {
  onFileLoaded: (base64: string) => void;
  className?: string;
};

const DragAndDropInput: React.FC<DragAndDropInputProps> = ({
  onFileLoaded,
  className,
}) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    },
    []
  );

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const base64 = await fileToBase64(file);
        onFileLoaded(base64);
      }
    },
    [onFileLoaded]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const base64 = await fileToBase64(file);
        onFileLoaded(base64);
      }
    },
    [onFileLoaded]
  );

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div
      className={clsx(styles.dragAndDropInput, className)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div>
        {dragging ? "Drop here" : "Drag and drop an image or click to select"}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        onMouseDown={handleFileInputClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
        }}
      />
    </div>
  );
};

export default DragAndDropInput;
