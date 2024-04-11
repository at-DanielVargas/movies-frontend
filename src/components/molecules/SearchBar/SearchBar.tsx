import { Autocomplete, AutocompleteProps, Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import classes from "./SearchBar.module.css";

function SeachBar() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEnter, setIsEnter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Record<string, any>>({});
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => {
    return (
      <Stack
        style={{
          gap: 3,
        }}
      >
        <b>{searchResults[option.value].title}</b>
        <small>{searchResults[option.value].release_date}</small>
      </Stack>
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const searchUrl = `${
          import.meta.env.VITE_API_URL
        }/movies/search?query=${searchTerm}`;
        fetch(searchUrl)
          .then((response) => response.json())
          .then((data) => {
            const results = data.results.reduce(
              (acc: Record<string, any>, result: any) => {
                return { ...acc, [result.title]: result };
              },
              {}
            );
            setSearchResults(results);
          })
          .catch((error) => console.log(error));
      }
    }, 900);
    if (isEnter) {
      setIsEnter(false);
      setSearchTerm("");
      inputRef?.current?.blur();
    }
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchResults, isEnter, setIsEnter, inputRef]);

  const handleReset = (callback: () => void) => {
    setSearchTerm("");
    setIsOpen(false);
    setSearchResults({});
    callback();
  };

  const goToOption = (option: string) => {
    setIsEnter(true);
    handleReset(() => {
      navigate(`/movie/${searchResults[option].id}`);
    });
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={false}
        animate={{ width: isOpen ? "100%" : "35px" }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Autocomplete
          ref={inputRef}
          classNames={{
            input: `${classes.input} ${isOpen ? classes.isOpen : ""}`,
          }}
          onOptionSubmit={goToOption}
          value={searchTerm}
          onChange={setSearchTerm}
          renderOption={renderAutocompleteOption}
          radius="sm"
          placeholder="Buscar peliculas..."
          data={Object.keys(searchResults)}
          variant="unstyled"
          rightSection={
            <button onClick={toggleOpen} className={classes.searchButton}>
              <IconSearch size={16} color="white" />
            </button>
          }
        />
      </motion.div>
    </div>
  );
}

export default SeachBar;
