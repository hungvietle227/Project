import React from "react";
import Slider from "react-slick";

function SliderHero() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div>
      <section className="slider-hero">
        <div className="slider-home-1">
          <Slider {...settings}>
            <div className="hero-section item custom-first-element">
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-xl-6">
                    <div className="featured-area">
                      <h2>The Perfect World to explore animals</h2>
                      <h5>
                        The animal world contains diversity and richness, from
                        small species to magnificent wild creatures
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-section custom-second-element item">
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-xl-6">
                    <div className="featured-area">
                      <h2>Lepidoptera</h2>
                      <h1>BUTTERFLY</h1>
                      <h6>
                        Lepidoptera is an order of insects that includes
                        butterflies and moths.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-section custom-third-element item">
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-xl-6">
                    <div className="featured-area">
                      <h2>Felidae</h2>
                      <h1>LION </h1>
                      <h6>
                        Lion is a large carnivorous animal that often lives in
                        prides and is known for its strength and top position in
                        their food chain.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-section custom-four-element item">
              <div className="container">
                <div className="row align-items-end">
                  <div className="col-xl-6">
                    <div className="featured-area">
                      <h2>Sciuridae</h2>
                      <h1>SQUIRREL</h1>
                      <h6>
                        Squirrel is a small animal with thick fur and a long
                        tail. It typically lives independently and enjoys
                        climbing on trees and other structures. Squirrels
                        primarily eat nuts, fruits, and plant-based foods.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default SliderHero;
