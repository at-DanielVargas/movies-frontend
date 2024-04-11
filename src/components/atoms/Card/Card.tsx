import {
  Card as MantineCard,
  Text,
  Group,
  Center,
  rem,
  useMantineTheme,
  Rating,
} from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import classes from "./Card.module.css";
import { Path, useNavigate } from "react-router-dom";
import { useInViewport } from "@mantine/hooks";

export interface CardProps {
  title: string;
  backgroundImage: string;
  metaTitle: string;
  to: string | Partial<Path>;
  stars?: number;
  votes?: number;
}

function Card({
  title,
  backgroundImage,
  metaTitle,
  to,
  stars = 0,
  votes = 0,
}: CardProps) {
  const theme = useMantineTheme();
  const { ref, inViewport } = useInViewport();
  const navigate = useNavigate();
  return (
    <MantineCard
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      onClick={() => navigate(to)}
    >
      <div
        ref={ref}
        className={classes.image}
        style={{
          backgroundImage: inViewport ? `url(${backgroundImage})` : "",
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Text size="lg" className={classes.title} fw={500}>
          {title}
        </Text>

        <Group justify="space-between" gap="xs">
          <Text size="sm" className={classes.author}>
            {metaTitle}
          </Text>

          <Text size="sm" className={classes.author}>
            <Rating value={Number(stars)} readOnly />
          </Text>

          <Group gap="lg">
            <Center>
              <IconStar
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.dark[2]}
              />
              <Text size="sm" className={classes.bodyText}>
                {votes}
              </Text>
            </Center>
          </Group>
        </Group>
      </div>
    </MantineCard>
  );
}

export default Card;
