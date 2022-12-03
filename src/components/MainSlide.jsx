import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";

const MainSlide = () => {
  const setting = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="carousel">
      <Slider {...setting}>
        <div className="main_slide_img">
          <img src="/imgs/main_slide01.jpg" alt="메인슬라이드 이미지" />
        </div>
        <div className="main_slide_img">
          <img src="/imgs/main_slide02.jpg" alt="메인슬라이드 이미지" />
        </div>
        <div className="main_slide_img">
          <img src="/imgs/main_slide03.jpg" alt="메인슬라이드 이미지" />
        </div>
      </Slider>
    </div>
  );
};

export default MainSlide;
