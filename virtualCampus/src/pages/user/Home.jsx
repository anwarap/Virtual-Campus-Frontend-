import React from "react";
import Header from "../../components/Header";

const Home = () => {
  return (
    <>
      <Header />

      <section>
        <div className="flex flex-col px-9 pt-9 ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-center p-5  w-2/3">
              <h1 className="font-bold text-3xl">Welcome to Virtual Campus</h1>
              <br />
              <h1 className=" text-xl" style={{ width: "450px" }}>
                Your go-to platform for online learning! Explore a diverse range
                of educational courses designed to enhance your knowledge and
                skills—all from the convenience of your home.
              </h1>
            </div>

            <div className=" flex justify-center w-3/4 b">
              <img
                src="\public\homeimg.jpg"
                alt=""
                className="w-3/4 h-80 object-fill"
              />
            </div>
          </div>
        </div>
      </section>


<section>

      <div className="flex flex-col  ">
        <div className="flex flex-row justify-between">
        <div className=" flex justify-center w-2/3">
              <img
                src="\public\home second iamge.jpg"
                alt=""
                className="w-3/4 h-80 object-fill"
              />
            </div>
            <div className="flex flex-col justify-center p-5  w-2/3">
              <h1 className="font-bold text-3xl">We Provide Our Best</h1>
              <br />
              <h1 className=" text-xl" style={{ width: "450px" }}>
              At our Virtual Campus, excellence is our standard. We meticulously curate each course, ensuring it embodies the pinnacle of educational content. With our unwavering commitment to quality, you can trust that every lesson, resource.
              </h1>
            </div>
        </div>

      </div>
</section>


    </>
  );
};

export default Home;
