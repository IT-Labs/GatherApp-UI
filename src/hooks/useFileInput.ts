// hooks/methods
import { useEffect, useState } from "react";

export type FileInputReturnType = {
  value: File;
  hasChanged: boolean;
  isValid: boolean;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLElement>) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  reset: () => void;
  resetFile: () => void;
  imageUrl: string;
  tooltip: string;
  allowedFileExtensions: string[];
};

type InputProps = {
  initialFile?: File;
  initialUrl?: string;
  maxFileSize?: number;
  allowedFileExtensions?: string[];
};

const useFileInput = ({
  initialFile = new File([], ""),
  initialUrl = "",
  maxFileSize = 5000000,
  allowedFileExtensions = ["image/jpeg", "image/jpg", "image/png"],
}: InputProps): FileInputReturnType => {
  const [file, setFile] = useState(initialFile);

  const [imageUrl, setImageUrl] = useState(initialUrl);
  const hasChanged = file.size > 0 && file.name.length > 0;

  let isValid = false;
  let errorMessage = "";

  const fileSizeInMB = maxFileSize / 1000000;
  const fileExtensionsAsString = allowedFileExtensions
    .map((item, index, array) => {
      const extension = item.split("/").pop();
      return index === array.length - 1 ? `and ${extension}` : extension;
    })
    .join(", ");

  const tooltip = `Maximum ${fileSizeInMB}MB. Only ${fileExtensionsAsString} files are supported.`;

  if (file.size >= maxFileSize) {
    errorMessage = `Maximum file size is ${fileSizeInMB}MB`;
  } else if (hasChanged && !allowedFileExtensions.includes(file.type)) {
    errorMessage = `Only ${fileExtensionsAsString} formats are supported.`;
  } else {
    isValid = true;
  }

  useEffect(() => {
    // This effect will run whenever initialUrl prop changes
    setImageUrl(initialUrl);
    setFile(initialFile);
  }, [initialUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) return;
    setFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onloadend = (readerEvent) => {
      if (readerEvent.target) {
        if (typeof readerEvent.target.result === "string") {
          setImageUrl(readerEvent.target.result);
        }
      }
    };
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer.files || e.dataTransfer.files[0] === undefined) return;
    setFile(e.dataTransfer.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.dataTransfer.files[0]);
    fileReader.onloadend = (readerEvent) => {
      if (readerEvent.target) {
        if (typeof readerEvent.target.result === "string") {
          setImageUrl(readerEvent.target.result);
        }
      }
    };
  };

  const reset = () => {
    setFile(initialFile);
    setImageUrl(initialUrl);
  };

  const resetFile = () => {
    setFile(initialFile);
  };

  return {
    value: file,
    hasChanged,
    isValid,
    errorMessage,
    onChange: handleChange,
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
    reset,
    resetFile,
    imageUrl,
    tooltip,
    allowedFileExtensions,
  };
};

export default useFileInput;
