import Image from "next/image";

export default function CardRoundedShadow(props) {
  return (
    <div
      className={`grid justify-items-stretch items-center bg-white shadow ${
        props.roundXl ? "rounded-3xl" : "rounded-xl"
      } ${props.className}`}
    >
<div className="relative w-full aspect-[2/1] max-h-[500px] rounded-xl overflow-hidden">
  <Image
    src={props.src}
    alt="Carrousel image"
    fill
    style={{ objectFit: "cover" }} // o "contain"
    className="rounded-xl"
  />
</div>
    </div>
  );
}