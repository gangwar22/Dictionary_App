import { useState } from "react";


function Dic() {
    const [search, setSearch] = useState("");
    const [definition, setDefinition] = useState(null);

    const handleSearch = () => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setDefinition(data[0]);
                } else {
                    setDefinition(null);
                }
            })
            .catch((error) => {
                console.error("Error fetching the definition:", error);
                setDefinition(null);
            });
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setDefinition(null);
        }
    };

    return (
        <div className="main">
            <h1>Dictionary</h1>
            <div className="input">
                <input
                    type="text"
                    value={search}
                    placeholder="Search"
                    onChange={handleChange}
                />
                <button className="btn" onClick={handleSearch}>Search</button>
            </div>
            {definition !== null && (
                <div className="data">
                    {definition ? (
                        <div className="data-content">
                            <h3>Word: {definition.word}</h3>
                            {definition.meanings.map((meaning, index) => (
                                <div key={index}>
                                    <h4>Part of Speech: {meaning.partOfSpeech}</h4>
                                    <p>Meaning: {meaning.definitions[0].definition}</p>
                                    <p>Synonyms: {meaning.definitions[0].synonyms && meaning.definitions[0].synonyms.length > 0 ? meaning.definitions[0].synonyms.join(", ") : "Synonyms not found"}</p>
                                    <p>Example: {meaning.definitions[0].example ? meaning.definitions[0].example : "Example not found"}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        search && <p>No definition found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Dic;
