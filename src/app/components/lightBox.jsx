import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function LightBox({ openLightbox, slidesArray, setOpen }) {

  return (
    <>
      <Lightbox
        open={openLightbox}
        close={() => setOpen(false)}
        slides={slidesArray}
      />
    </>
  );
}