import Image from "next/image";
import { useState } from "react";

interface Props {
  videoKey: string;
  alt: string;
}

export function YouTubeThumbnail({ videoKey, alt }: Props) {
  const [src, setSrc] = useState(
    `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`
  );

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setSrc("/fallback.png")}
    />
  );
}
