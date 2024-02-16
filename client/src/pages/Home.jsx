import Image1 from "../assets/images/image1.png";
import Card1 from "../assets/images/card1.jpg";
import Card2 from "../assets/images/card2.jpg";
import Card3 from "../assets/images/card3.jpg";

const Home = () => {
  return (
    <>
      <section className="grid min-h-screen grid-cols-12">
        <div className="col-span-6 flex flex-col items-start justify-center gap-2 pr-12">
          <h1 className="text-5xl font-bold">
            The Electronic
            <span className="text-third"> Health Records</span>
          </h1>

          <p className="text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea cum,
            magnam totam unde, vero voluptate sed beatae nam impedit nemo,
            placeat pariatur nesciunt laboriosam omnis recusandae maxime qui
            suscipit blanditiis.
          </p>
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <img src={Image1} alt="Doctors Image" />
        </div>
      </section>
      <section className="-mt-20 flex justify-center gap-8 pb-24">
        <div className="h-64 w-full overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          <img src={Card1} alt="Image" />
        </div>
        <div className="h-64 w-full overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          <img src={Card2} alt="Image" />
        </div>
        <div className="h-64 w-full overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          <img src={Card3} alt="Image" />
        </div>
      </section>
    </>
  );
};

export default Home;
