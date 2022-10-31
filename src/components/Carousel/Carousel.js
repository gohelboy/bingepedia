import axios from "axios";
import React from "react";
import "./Carousel.css";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ type, id }) => {
  const [credit, setcredit] = useState();

  const items = credit?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem_img"
      />
      <b className="carouselItem_name">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchcredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setcredit(data.cast);
  };

  useEffect(() => {
    fetchcredits();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      items={items}
      mouseTracking
      infinite
      disableButtonsControls
      disableDotsControls
      autoPlayInterval={1000}
    />
  );
};

export default Carousel;
