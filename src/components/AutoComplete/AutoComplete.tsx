import React, { useEffect, useRef, useState } from "react";
import './AutoComplete.styles.css';

interface ISuggestion {
  name: string;
  sprite: string;
}
const AutoComplete: React.FC = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [suggestionsOptions, setSuggestionsOptions] = useState<ISuggestion[]>([]);
  const [searchInputText, setSearchInputText] = useState<string>("");
  const wrapperRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // create an array of pokemon
    const pokemon: ISuggestion[] = [];
    //get the data from api and create an array of 150 items
    const pokemonList = new Array(150)
      .fill(0)
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));

    // wait for all promises to resolve
    Promise.all(pokemonList).then(pokemonArr => {
      return pokemonArr.map(value =>
        value
          .json()
          .then(({ name, sprites: { front_default: sprite } }) =>
            pokemon.push({ name, sprite })
        ).catch((err) => {
          throw err;
        })
      );
    });
    setSuggestionsOptions(pokemon);
  }, []);

  const handleOptionClick = (value: React.SetStateAction<string>) => {
    setSearchInputText(value);
  };
  const handleClickOutside = (event: MouseEvent) => {
    const wrapper = wrapperRef.current;
       if (wrapper && !wrapper.contains(event.target as Node)) {
      setShowOptions(false);
    }
};
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
   };
});
  return (
    <div className="container" ref={wrapperRef}>
      <input
        id="auto"
        placeholder="Search a Pokemon"
        value={searchInputText}
        onClick={() => setShowOptions(!showOptions)}
        onChange={event => setSearchInputText(event.target.value)}
      />
      {showOptions && (
        <ul className="list-container">
          {/* // filter options based on search text */}
          {suggestionsOptions
            .filter(({ name }) => name.indexOf(searchInputText.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <li
                  onClick={() => handleOptionClick(value.name)}
                  key={i}
                  tabIndex={0}
                >
                  <b>{value.name}</b>
                  <img src={value.sprite} alt="pokemon" />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
export default AutoComplete;