import { useEffect, useState } from "react";
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
} from "reactstrap";
import NavbarWh from "../Navbars/NavbarWh";

const items = [
  {
    src: "https://res.cloudinary.com/dkk0hlcyk/image/upload/v1682199183/fi0wsjpf3q2abanq7rtz.jpg",
    altText: "Hello there",
    caption: "Hello there",
    key: 1,
  },
  {
    src: "https://res.cloudinary.com/dkk0hlcyk/image/upload/v1682198907/bhojvku4r5iu12mqxgkt.jpg",
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: "https://res.cloudinary.com/dkk0hlcyk/image/upload/v1682199741/idqvqn3d2cptsk6ewh0i.png",
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
  {
    src: "https://res.cloudinary.com/dkk0hlcyk/image/upload/v1682199315/njlgsbsoiufwrnff5hjb.jpg",
    altText: "Hello ",
    caption: "Hello ",
    key: 4,
  }
];

const HomeHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} style={{width: '100rem ', height: '25rem', objectFit:'cover'}}/>
        <CarouselCaption
          captionText={item.caption}
          //captionHeader={item.caption}
          
        />
      </CarouselItem>
    );
  });

  return (
    <container>
      <Card style={{padding: '3rem', backgroundColor: '#172b4d'}}>
        <NavbarWh/>
      </Card>
      <Carousel activeIndex={activeIndex} next={next} previous={previous} >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </container>
  );
};

export default HomeHeader;
