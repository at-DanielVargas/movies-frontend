import { Burger, Button, Flex, Group } from "@mantine/core";
import SeachBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import classes from "./Header.module.css";

export interface HeaderProps {
  toggle: () => void;
  opened: boolean;
}

export const HeaderButtons = ({
  onButtonClicked,
}: {
  onButtonClicked: () => void;
}) => {
  const navigate = useNavigate();
  const handleButtonClicked = (to: string) => {
    navigate(to);
    onButtonClicked();
  };
  return (
    <>
      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => handleButtonClicked("/")}
      >
        Inicio
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => handleButtonClicked("/movies")}
      >
        Peliculas
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => handleButtonClicked("/tv-shows")}
      >
        Television
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => handleButtonClicked("/recently-added")}
      >
        Agregado Recientemente
      </Button>

      <Button
        variant="transparent"
        color="red"
        radius="lg"
        onClick={() => handleButtonClicked("/my-list")}
      >
        Mi lista
      </Button>
    </>
  );
};

function Header({ toggle, opened }: HeaderProps) {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Flex align="center">
          <Burger
            color="red"
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
          />
          <Logo />
        </Flex>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            <HeaderButtons onButtonClicked={toggle} />
          </Group>
          <SeachBar />
        </Group>
      </div>
    </header>
  );
}

export default Header;
