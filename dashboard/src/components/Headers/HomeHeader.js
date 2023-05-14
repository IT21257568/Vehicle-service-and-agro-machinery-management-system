import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Button,
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import NavbarWh from "../Navbars/NavbarWh";

import slide1 from "../../assets/img/theme/slide1.jpg";
import slide2 from "../../assets/img/theme/slide2.jpg";
import slide3 from "../../assets/img/theme/slide3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../Headers/HomeHeader.css";

// import required modules
import { Autoplay, Navigation } from "swiper";

const HomeHeader = () => {
  return (
    <>
      <container fluid>
        <Swiper
          navigation={true}
          modules={[Autoplay, Navigation]}
          loop={true}
          className="mySwiper"
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img alt="" src={slide1}></img>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img alt="" src={slide2}></img>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img alt="" src={slide3}></img>
          </SwiperSlide>
        </Swiper>
      </container>
    </>
  );
};

export default HomeHeader;
