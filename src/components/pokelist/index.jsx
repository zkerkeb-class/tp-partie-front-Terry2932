import { useEffect } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import PokeCard from "../pokeCard";
import "./pokelist.css";

const PokeList = () => {
    const {
        loading,
        fetchPokemons,
        getDisplayedPokemons,
        getTotalPages,
        currentPage,
        setCurrentPage,
        goToAddPokemon,
        searchTerm,
        setSearchTerm,
        customPokemons
    } = usePokemon();

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    if (loading) {
        return <p className="loading">Chargement des Pokémon...</p>;
    }

    const displayedPokemons = getDisplayedPokemons();
    const totalPages = getTotalPages();

    return (
        <div className="pokelist-container">
            <div className="pokelist-header">
                <h2>Liste des Pokémon</h2>
                <button className="btn-add-pokemon" onClick={goToAddPokemon}>
                    ➕ Ajouter un Pokémon
                </button>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher un Pokémon..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="search-input"
                />
            </div>

            {customPokemons.length > 0 && (
                <div className="custom-pokemons-section">
                    <h3>Mes Pokémon Personnalisés ({customPokemons.length})</h3>
                    <div className="pokemon-grid">
                        {customPokemons.map((pokemon) => (
                            <PokeCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>
                </div>
            )}

            <div className="pokemons-section">
                <h3>Pokémon du Pokédex</h3>
                {displayedPokemons.length === 0 ? (
                    <p>Aucun Pokémon trouvé.</p>
                ) : (
                    <div className="pokemon-grid">
                        {displayedPokemons.map((pokemon, index) => (
                            <PokeCard key={pokemon.id || index} pokemon={pokemon} />
                        ))}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="btn-pagination"
                    >
                        ◀ Précédent
                    </button>
                    <span className="pagination-info">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="btn-pagination"
                    >
                        Suivant ▶
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokeList;
