import {
  Carousel as MantineCarousel,
  CarouselProps as MantineCarouselProps,
} from "@mantine/carousel";
import MovieCard from "../MovieCard/MovieCard";
import { Center, Loader } from "@mantine/core";
import classes from "./CategoryCarousel.module.css";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

export interface CarouselProps {
  title: string;
  isLoading?: boolean;
  align?: MantineCarouselProps["align"];
  elements: any[];
  renderElement?: (element: any, index: number) => React.ReactNode;
}

function Carousel({
  title,
  align = "start",
  elements,
  isLoading = false,
  renderElement,
}: CarouselProps) {
  const [slideSize, setSlideSize] = useState("25%");
  const { width } = useViewportSize();

  useEffect(() => {
    if ((width === 0 || width >= 1025) && !isLoading) {
      setSlideSize("25%");
    }

    if (width < 1025 && width >= 768 && !isLoading) {
      setSlideSize("33.33%");
    }

    if (width < 768 && width >= 425 && !isLoading) {
      setSlideSize("50%");
    }

    if (width < 425 && !isLoading) {
      setSlideSize("100%");
    }

  }, [width, slideSize, isLoading]);

  return (
    <div>
      <h1>{title}</h1>
      <MantineCarousel
        classNames={classes}
        slideSize={slideSize}
        align={align}
        slideGap="xl"
        draggable={false}
        loop
      >
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <MantineCarousel.Slide key={`slide-${index}`}>
                <Center>
                  <Loader />
                </Center>
              </MantineCarousel.Slide>
            ))
          : elements?.map((movie, index) => (
              <MantineCarousel.Slide key={`slide-${index}-${movie.id}`}>
                {renderElement ? (
                  renderElement(movie, index)
                ) : (
                  <MovieCard movie={movie} />
                )}
              </MantineCarousel.Slide>
            ))}
      </MantineCarousel>
    </div>
  );
}

export default Carousel;
