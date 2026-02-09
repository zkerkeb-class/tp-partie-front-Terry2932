import { createContext, useState, useCallback, useEffect } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
    const [customPokemons, setCustomPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'add'
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const POKEMON_PER_PAGE = 30;

    // Récupérer les pokemons depuis le backend local (par défaut backend sur le port 3000)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const fetchPokemons = useCallback(() => {
        setLoading(true);
        fetch(`${BACKEND_URL}/pokemons/all`)
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch pokemons');
                return response.json();
            })
            .then((response) => {
                // Backend returns array directly
                const pokemonList = Array.isArray(response) ? response : (response.data || []);
                console.log(`✅ Pokémons chargés: ${pokemonList.length}`);
                setPokemons(pokemonList);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erreur:', error.message);
                setPokemons([]);
                setLoading(false);
            });
    }, [BACKEND_URL]);

    // Charger les pokemons au montage
    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    // Obtenir les pokemons filtrés et paginés
    const getFilteredPokemons = () => {
        let filtered = pokemons.filter(p => {
            const nameStr = typeof p.name === 'string' 
                ? p.name 
                : (p.name?.french || p.name?.english || '');
            return nameStr.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return filtered;
    };

    const getDisplayedPokemons = () => {
        const filtered = getFilteredPokemons();
        const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
        const endIndex = startIndex + POKEMON_PER_PAGE;
        return filtered.slice(startIndex, endIndex);
    };

    const getTotalPages = () => {
        return Math.ceil(getFilteredPokemons().length / POKEMON_PER_PAGE);
    };

    // Naviguer vers la page de détails
    const viewPokemonDetails = (pokemon) => {
        setSelectedPokemon(pokemon);
        setCurrentView('details');
    };

    // Naviguer vers la page d'ajout
    const goToAddPokemon = () => {
        setSelectedPokemon(null);
        setCurrentView('add');
    };

    // Ajouter un nouveau pokemon personnalisé (persiste via backend)
    const addPokemon = async (pokemonData) => {
        try {
            const res = await fetch(`${BACKEND_URL}/pokemons`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pokemonData),
            });
            if (!res.ok) throw new Error('Failed to add pokemon');
            const created = await res.json();
            created.isCustom = true;
            // Ajouter le pokémon personnalisé à la liste locale
            setPokemons([...pokemons, created]);
            setCurrentView('list');
            setCurrentPage(1);
            return created;
        } catch (e) {
            console.error('Erreur addPokemon:', e.message);
            throw e;
        }
    };

    // Modifier un pokemon (persiste via backend si applicable)
    const updatePokemon = async (pokemon) => {
        try {
            if (pokemon.isCustom) {
                const res = await fetch(`${BACKEND_URL}/pokemons/${pokemon.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pokemon),
                });
                if (!res.ok) throw new Error('Failed to update pokemon');
                // Mettre à jour le pokémon dans la liste locale
                setPokemons(pokemons.map(p => p.id === pokemon.id ? pokemon : p));
            }
            setSelectedPokemon(pokemon);
        } catch (e) {
            console.error('Erreur updatePokemon:', e.message);
            throw e;
        }
    };

    // Supprimer un pokemon (persiste via backend si applicable)
    const deletePokemon = async (pokemon) => {
        try {
            if (pokemon.isCustom) {
                const res = await fetch(`${BACKEND_URL}/pokemons/${pokemon.id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete pokemon');
                // Supprimer le pokémon de la liste locale
                setPokemons(pokemons.filter(p => p.id !== pokemon.id));
            }
            setCurrentView('list');
            setCurrentPage(1);
        } catch (e) {
            console.error('Erreur deletePokemon:', e.message);
            throw e;
        }
    };

    // Récupérer les détails d'un pokemon depuis le backend
    const fetchPokemonDetails = async (identifier) => {
        try {
            setLoading(true);
            const res = await fetch(`${BACKEND_URL}/pokemons/${identifier}`);
            if (!res.ok) throw new Error('Failed to fetch pokemon details');
            const data = await res.json();
            setSelectedPokemon(data);
            setLoading(false);
            setCurrentView('details');
            return data;
        } catch (e) {
            console.error('Erreur fetchPokemonDetails:', e.message);
            setLoading(false);
            throw e;
        }
    };

    // Revenir à la liste
    const backToList = () => {
        setCurrentView('list');
        setCurrentPage(1);
    };

    const value = {
        pokemons,
        customPokemons,
        currentPage,
        setCurrentPage,
        currentView,
        setCurrentView,
        selectedPokemon,
        setSelectedPokemon,
        loading,
        searchTerm,
        setSearchTerm,
        fetchPokemons,
        getDisplayedPokemons,
        getTotalPages,
        viewPokemonDetails,
        goToAddPokemon,
        addPokemon,
        updatePokemon,
        deletePokemon,
        fetchPokemonDetails,
        backToList,
    };

    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    );
};
