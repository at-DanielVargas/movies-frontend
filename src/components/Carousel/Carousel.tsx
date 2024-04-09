import {
  Carousel as MantineCarousel,
  CarouselProps as MantineCarouselProps,
} from "@mantine/carousel";
import MovieCard from "../MovieCard/MovieCard";
import { Center, Loader } from "@mantine/core";
import classes from "./CategoryCarousel.module.css";

export interface CarouselProps {
  title: string;
  slideSize: string;
  isLoading: boolean;
  align: MantineCarouselProps["align"];
  elements: any[];
}

function Carousel({
  title,
  slideSize = "20%",
  align,
  elements,
  isLoading = false,
}: CarouselProps) {
  return (
    <div>
      <h1>{title}</h1>
      <MantineCarousel
        classNames={classes}
        slideSize={slideSize}
        align={align}
        slideGap="xl"
        draggable={false}
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
                <MovieCard key={movie.id} movie={movie} />
              </MantineCarousel.Slide>
            ))}
      </MantineCarousel>
    </div>
  );
}

export default Carousel;
