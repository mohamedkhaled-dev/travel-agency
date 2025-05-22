import { InfoPillProps } from "@/types";
import Image from "next/image";

const InfoPill = ({ text, image }: InfoPillProps) => {
  return (
    <figure className="info-pill">
      <Image width={20} height={20} src={image} alt={text} />

      <figcaption>{text}</figcaption>
    </figure>
  );
};

export default InfoPill;
