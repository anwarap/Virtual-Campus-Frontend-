import React from "react";
import Header from "../../components/user/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/backgrund.svg')" }}
    >

      <section className="min-h-screen flex items-center">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-9">
    <div className="flex flex-col justify-center p-5">
      <h1 className="text-[32px] leading-[20px] font-['Roboto'] text-[--primary-color] whitespace-nowrap">
        Welcome to Virtual Campus
      </h1>
      <br />
      <p className="text-[16px] leading-[24px] max-w-md font-[Poppins] text-[--secondary-color]">
       
        At Virtual Campus, we offer a diverse range of high-quality courses designed to help you achieve your personal and professional goals from the comfort of your home. Our platform combines expert-led instruction with hands-on projects, making learning both accessible and engaging. Whether you're looking to learn new skills, enhance your career, or explore your creativity, Virtual Campus provides a flexible, interactive environment tailored to your learning needs. Join us today and start your journey to success!"
      </p>
    </div>
    
    <div className="flex justify-center">
      <img
        src="/homeimg.jpg"
        alt="Virtual Campus"
        className="w-full h-80 object-cover"
      />
    </div>
  </div>
</section>





<section>

      <div className="min-h-screen  flex items-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-9">
        <div className=" flex justify-center ">
              <img
                src="\home second iamge.jpg"
                alt=""
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-5">
              <h1 className="text-[32px] leading-[20px] font-['Roboto'] text-[--primary-color] whitespace-nowrap">We Provide Our Best</h1>
              <br />
              <p className="text-[16px] leading-[24px] max-w-md font-[Poppins] text-[--secondary-color]">
              At our Virtual Campus, excellence is our standard. We meticulously curate each course, ensuring it embodies the pinnacle of educational content. With our unwavering commitment to quality, you can trust that every lesson, resource.
              </p>
            </div>
        </div>

      </div>
</section>

</div>
    </>
  );
};

export default Home;
