import Slider from './Slider';
import CardRoundedShadow from '../cardRoundedShadow';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

export default function Carrousel () {

  return (
    <>
      <div className="hidden md:block shadow-secondarySh rounded-2xl">
        <Slider autoplaySpeed={5000} slidesToShow={1} infinite autoplay pauseOnHover dots>
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/1.png" />
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/6.png" />
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/5.png" />
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/4.png" />
        </Slider>
      </div>
      <div className="block md:hidden shadow-secondarySh rounded-2xl">
        <Slider autoplaySpeed={5000} slidesToShow={1} infinite autoplay pauseOnHover dots>
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/1.png" />
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/6.png" />
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/5.png" />
          <CardRoundedShadow src="https://micelu-space.sfo3.cdn.digitaloceanspaces.com/home/4.png" />
        </Slider>
      </div>
    </>
  );
};
