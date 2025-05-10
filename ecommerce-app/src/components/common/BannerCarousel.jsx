import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

const BannerCarousel = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Box sx={{ marginBottom: 1 }}>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <Box
            key={index}
            sx={{
              height: 300,
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default BannerCarousel;
