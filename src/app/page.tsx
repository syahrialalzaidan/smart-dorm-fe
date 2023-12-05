import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-[30vw] bg-[#6930B7] pl-[5%] flex justify-between pt-24">
        <div className="flex flex-col pb-20 w- justify-between h-full">
          <h1 className="font-bold text-3xl md:text-8xl text-white">
            Smart Dorm
          </h1>
          <h3 className="text-white text-xl md:text-4xl">
            Ketika kenyamanan bertemu konektivitas.
          </h3>
        </div>

        <Image
          alt="landing iamge"
          src="/landing-img.svg"
          width={1200}
          height={500}
          className="w-[52%] relative bottom-0 right-0"
        />
      </div>

      <div className="flex justify-center mt-6">
        <Link
          href="/login"
          className="bg-[#6930B7] py-4 px-2 text-center font-semibold self-center rounded-lg w-44 text-white mt-6"
        >
          Login
        </Link>
      </div>

      <div className="bg-[url('/landing-bg.svg')] bg-no-repeat bg-right">
        <div className="p-20 flex gap-6 items-center bg-[url('/landing-kanan.svg')] bg-left bg-no-repeat">
          <div className="w-2/3 flex flex-col gap-6">
            <h1 className="font-semibold text-5xl">Mengapa Smart Dorm?</h1>

            <div className="bg-white p-7 rounded-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              eu libero turpis. In nunc purus, cursus eget est a, commodo
              ultrices lacus. Etiam pharetra mauris at nulla tincidunt, in
              vulputate quam venenatis. Nulla vitae dolor vitae urna hendrerit
              tempus quis fermentum est. Etiam fermentum molestie nisl vitae
              laoreet. Fusce lectus lectus, faucibus in venenatis ac, pharetra
              vel nisl. Phasellus ullamcorper nibh eget metus aliquam convallis.
              Vestibulum magna mauris, venenatis imperdiet scelerisque in,
              ultrices vitae urna.
              <br /> <br />
              Nampharetra laoreet dui. Vivamus in diam fringilla, auctor sapien
              at, tristique purus. Vestibulum a est sollicitudin, vestibulum dui
              ut, aliquam tortor. Donec vehicula sit amet eros nec condimentum.
              Ut efficitur massa eget ipsum pellentesque, non cursus odio porta.
              Phasellus quis rhoncus purus, eget hendrerit odio. Nullam bibendum
              enim eu felis sodales ultricies. Nullam libero sapien, dignissim
              et odio auctor, molestie fermentum lectus. Morbi nulla diam,
              sagittis sed dolor ut, dictum consequat erat.
            </div>
          </div>

          <Image
            src="/dummy-landing.svg"
            width={327}
            height={327}
            alt="dummy"
          />
        </div>
      </div>
    </>
  );
}
