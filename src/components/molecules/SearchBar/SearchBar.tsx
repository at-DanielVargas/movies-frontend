import { Autocomplete, AutocompleteProps, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SeachBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => {
    return (
      <Group gap="sm">
        <div>
          <Text size="sm">{option.value}</Text>
          <Text size="xs" opacity={0.5}>
            {searchResults[option.value].title}
          </Text>
        </div>
      </Group>
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const searchUrl = `http://localhost:3000/movies/search?query=${searchTerm}`;
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

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const goToOption = (option: string) => {
    navigate(`/movie/${searchResults[option].id}`);
  };

  return (
    <Autocomplete
      onOptionSubmit={goToOption}
      value={searchTerm}
      onChange={setSearchTerm}
      renderOption={renderAutocompleteOption}
      variant="filled"
      radius="xl"
      placeholder="Search for movies"
      data={Object.keys(searchResults)}
    />
  );
}

export default SeachBar;
