import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import classes from "./HomeLayout.module.css";
import Header, { HeaderButtons } from "../../components/Header/Header";

function HomeLayout() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className={classes.header}>
        <Header toggle={toggle} opened={opened} />
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <HeaderButtons />
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default HomeLayout;
