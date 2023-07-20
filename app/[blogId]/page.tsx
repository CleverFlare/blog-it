import BannerContainer from "@/components/bannerContainer";
import ContentContainer from "@/components/contentContainer";
import Image from "next/image";

interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <main className="p-2">
      <BannerContainer>
        <Image
          src="/thumbnail.jpg"
          alt="banner"
          width={2000}
          height={1000}
          className="object-cover object-center h-[450px] w-full rounded-3xl"
        />
      </BannerContainer>
      <ContentContainer className="flex flex-col gap-4 mt-10">
        <h1 className="text-4xl font-bold">This is the first heading</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          molestiae repellat fugit sequi quae odit perspiciatis quibusdam,
          aperiam placeat harum doloremque temporibus. In veritatis, libero
          explicabo ex beatae dicta aspernatur!
        </p>
        <p className="border-blue-500 border-s-4 text-muted-foreground ps-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nemo
          esse error quidem, assumenda inventore suscipit. Illo assumenda autem,
          perferendis suscipit repellendus maxime voluptatibus quo qui veritatis
          facere, impedit similique.
        </p>
        <ol className="list-decimal list-inside">
          <li>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
            animi.
          </li>
          <li>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
            animi.
          </li>
          <li>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
            animi.
          </li>
          <li>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
            animi.
          </li>
          <li>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste,
            animi.
          </li>
        </ol>
      </ContentContainer>
    </main>
  );
}
