
const Banner = () => {

  return (
    <div className="carousel w-full h-[500px]">
    <div id="slide1" className="carousel-item relative h-[500px] w-full">
      <img src="https://i.ibb.co/WpPbRQw/Bright-Yellow-and-Blue-Modern-Travel-Banner-4.png" className="w-full" />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide4" className="btn btn-circle">❮</a> 
        <a href="#slide2" className="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide2" className="carousel-item relative w-full h-[500px]">
      <img src="https://i.ibb.co/FDdKfJ1/Bright-Yellow-and-Blue-Modern-Travel-Banner-2.png" className="w-full" />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide1" className="btn btn-circle">❮</a> 
        <a href="#slide3" className="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide3" className="carousel-item relative w-full h-[500px]">
      <img src="https://i.ibb.co/8PdKwhG/Bright-Yellow-and-Blue-Modern-Travel-Banner-3.png" className="w-full" />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide2" className="btn btn-circle">❮</a> 
        <a href="#slide4" className="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide4" className="carousel-item relative w-full h-[500px]">
      <img src="https://i.ibb.co/QXPrJZW/Bright-Yellow-and-Blue-Modern-Travel-Banner-5.png" className="w-full" />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide3" className="btn btn-circle">❮</a> 
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
  );
};

export default Banner;
