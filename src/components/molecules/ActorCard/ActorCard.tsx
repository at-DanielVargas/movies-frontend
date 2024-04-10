import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";

import classes from "./ActorCard.module.css";

export interface ActorCardProps {
  actorImage: string;
  actorName: string;
  actorCharacter: string;
}

function ActorCard({ actorImage, actorName, actorCharacter }: ActorCardProps) {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={actorImage} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {actorName}
          </Text>

          <Text c="dimmed" size="xs">
            {actorCharacter}
          </Text>
        </div>

        {/* <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        /> */}
      </Group>
    </UnstyledButton>
  );
}

export default ActorCard;
