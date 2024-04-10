import { Burger, Button, Group } from "@mantine/core";
import SeachBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";

export interface HeaderProps {
  toggle: () => void;
  opened: boolean;
}

export const HeaderButtons = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => navigate("/")}
      >
        Home
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => navigate("/movies")}
      >
        Movies
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => navigate("/tv-shows")}
      >
        TV Shows
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => navigate("/recently-added")}
      >
        Recently Added
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => navigate("/my-list")}
      >
        My List
      </Button>
    </>
  );
};

function Header({ toggle, opened }: HeaderProps) {
  return (
    <Group h="100%" w="100%" px="md">
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="sm"
        color="red"
      />
      <Logo />
      <Group justify="space-between">
        <SeachBar />
        <Group ml="xl" gap={0} visibleFrom="sm">
          <HeaderButtons />
        </Group>
      </Group>
    </Group>
  );
}

export default Header;
