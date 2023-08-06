"use client";

import { useMount } from "@/hooks";
import { ImagePlus, Trash } from "lucide-react";
import { FC, MouseEvent } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  images: string[];
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  images,
}): JSX.Element | null => {
  const { isMounted } = useMount();

  if (!isMounted) return null;

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <aside>
      <ul className="mb-4 items-center gap-4">
        {images.map((image) => {
          return (
            <li
              key={image}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <Button
                type="button"
                onClick={() => onRemove(image)}
                className="z-10 absolute top-2 right-2"
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Image fill className="object-cover" alt="Image" src={image} />
            </li>
          );
        })}
      </ul>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ybkccyvp">
        {({ open }) => {
          const handleClick = (event: MouseEvent<HTMLElement>) => {
            event.preventDefault();
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={handleClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
            </Button>
          );
        }}
      </CldUploadWidget>
    </aside>
  );
};

export default ImageUpload;
