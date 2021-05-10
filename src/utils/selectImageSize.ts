import { Image } from "../models/Image";

const MIN_WINDOW_WIDTH = 900;

export const selectImageSize = (images: Image[] ) => {
  if (window.innerWidth > MIN_WINDOW_WIDTH) {
    const item = images.find(i => i.size === 'extralarge');

    return item ? item.text : undefined;
  }

  const item = images.find(i => i.size === 'medium');

  return item ? item.text : undefined;
}
