import { Paper, Text, Title, Button } from "@mantine/core";
import classes from "./RelatedCard.module.css";
import { useNavigate } from "react-router-dom";

export interface RelatedCardProps {
  id: number;
  image: string;
  genre?: string;
  title: string;
}

function RelatedCard({ id, image, genre, title }: RelatedCardProps) {
  const navigate = useNavigate();
  const view = () => {
    navigate(`/movie/${id}`);
  };
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div>
        <Text className={classes.category} size="xs">
          {genre}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button onClick={view} variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

export default RelatedCard;
