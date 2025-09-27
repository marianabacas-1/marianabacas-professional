import React, { Component } from "react";
import Slider from "react-slick";

export default function SimpleSlider({ children }) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        accessibility: true,
        arrows: false,
        responsive: [
             {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: true

                }
            }
        ]
    };

        return (
            <div className="">
                <Slider {...settings}>
                    {children}
                </Slider>
            </div>
        );
}