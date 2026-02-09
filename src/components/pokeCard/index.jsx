import { useEffect, useState } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import "./pokecard.css";

const PokeCard = ({ pokemon }) => {
    const [pokeState, setPokeState] = useState({});
    const [flipped, setFlipped] = useState(false);
    const [isShiny, setIsShiny] = useState(false);
    const { viewPokemonDetails } = usePokemon();

    useEffect(() => {
        if (!pokemon) return;
        setPokeState(pokemon);
        // Determine if shiny (evolution Pokémon)
        const evolutionIds = [3, 6, 9, 12, 15, 18, 20, 22, 24, 26, 28, 31, 34, 36, 38, 40, 42, 45, 47, 49, 51, 53, 55, 57, 59, 61, 65, 67, 69, 71, 73, 75, 78, 80, 82, 85, 87, 89, 91, 94, 97, 99, 101, 103, 105, 107, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 131, 133, 135, 136, 137, 139, 141, 142, 144, 145, 146, 149, 150, 151];
        setIsShiny(evolutionIds.includes(pokemon.id));
    }, [pokemon]);

    const handleCardClick = () => {
        viewPokemonDetails(pokeState || pokemon);
    };

    const getDisplayName = () => {
        if (!pokeState) return '';
        if (typeof pokeState.name === 'string') return pokeState.name;
        if (pokeState.name && typeof pokeState.name === 'object') {
            return pokeState.name.french || pokeState.name.english || pokeState.name.japanese;
        }
        return pokeState.name || pokeState.id || '';
    };

    const getImageSrc = () => {
        if (pokeState.sprites?.front_default) return pokeState.sprites.front_default;
        if (pokeState.image) return pokeState.image;
        return null;
    };

    const getTypes = () => {
        if (!pokeState) return [];
        if (Array.isArray(pokeState.types) && pokeState.types.length > 0) {
            return pokeState.types.map(t => (t.type ? t.type.name : (typeof t === 'string' ? t : ''))).filter(Boolean);
        }
        if (Array.isArray(pokeState.type)) return pokeState.type.map(t => String(t).toLowerCase());
        if (pokeState.type && typeof pokeState.type === 'string') return [pokeState.type.toLowerCase()];
        return [];
    };

    const getStats = () => {
        if (!pokeState) return {};
        if (pokeState.base) return pokeState.base;
        if (Array.isArray(pokeState.stats)) {
            const statsObj = {};
            pokeState.stats.forEach(s => {
                const statName = s.stat?.name || s.name || 'unknown';
                statsObj[statName] = s.base_stat || 0;
            });
            return statsObj;
        }
        return {};
    };

    const isEvolution = () => {
        const evolutionIds = [3, 6, 9, 12, 15, 18, 20, 22, 24, 26, 28, 31, 34, 36, 38, 40, 42, 45, 47, 49, 51, 53, 55, 57, 59, 61, 65, 67, 69, 71, 73, 75, 78, 80, 82, 85, 87, 89, 91, 94, 97, 99, 101, 103, 105, 107, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 131, 133, 135, 136, 137, 139, 141, 142, 144, 145, 146, 149, 150, 151];
        return evolutionIds.includes(pokeState.id);
    };

    const getWeaknesses = () => {
        // Mapping types to their weaknesses (Pokémon type chart)
        const weaknessMap = {
            'normal': ['fighting'],
            'fire': ['water', 'ground', 'rock'],
            'water': ['electric', 'grass'],
            'grass': ['fire', 'ice', 'poison', 'flying', 'bug'],
            'electric': ['ground'],
            'ice': ['fire', 'fighting', 'rock', 'steel'],
            'fighting': ['flying', 'psychic', 'fairy'],
            'poison': ['ground', 'psychic'],
            'ground': ['water', 'grass', 'ice'],
            'flying': ['electric', 'ice', 'rock'],
            'psychic': ['bug', 'ghost', 'dark'],
            'bug': ['fire', 'flying', 'rock'],
            'rock': ['water', 'grass', 'fighting', 'ground', 'steel'],
            'ghost': ['ghost', 'dark'],
            'dragon': ['ice', 'dragon', 'fairy'],
            'dark': ['fighting', 'bug', 'fairy'],
            'steel': ['fire', 'water', 'ground'],
            'fairy': ['poison', 'steel']
        };
        
        const types = getTypes();
        const weaknesses = new Set();
        types.forEach(type => {
            if (weaknessMap[type.toLowerCase()]) {
                weaknessMap[type.toLowerCase()].forEach(w => weaknesses.add(w));
            }
        });
        return Array.from(weaknesses).slice(0, 3);
    };

    const displayName = getDisplayName();
    const img = getImageSrc();
    const types = getTypes();
    const stats = getStats();
    const primaryType = types[0] || '';
    const hp = stats.HP || stats.hp || 0;
    const attack = stats.Attack || stats.attack || 0;
    const defense = stats.Defense || stats.defense || 0;
    const weaknesses = getWeaknesses();

    return (
        <div className={`poke-card-wrapper type-${primaryType} ${isShiny && primaryType !== 'bug' ? 'shiny' : ''}`} onClick={handleCardClick}>
            <div className="poke-card-modern">
                <div className="card-glow"></div>

                <div className="card-header-modern">
                    <div className="evolution-badge">
                        {isEvolution() ? '⭐ Evolution' : 'Base'}
                    </div>
                    <h2 className="pokemon-name-modern">{displayName}</h2>
                    <div className="hp-display">
                        <span className="hp-label">HP</span>
                        <span className="hp-value">{hp}</span>
                    </div>
                </div>

                <div className="pokedex-number">#{pokeState.id?.toString().padStart(3, '0') || '?'}</div>

                <div className="image-section-modern">
                    {img && <img src={img} alt={displayName} className="pokemon-image-modern" />}
                    {!img && <div className="image-placeholder">No Image</div>}
                </div>

                <div className="stats-section-modern">
                    <div className="stat-mini">
                        <span className="stat-mini-label">ATK</span>
                        <div className="stat-mini-bar">
                            <div style={{ width: Math.min((attack / 150) * 100, 100) + '%' }}></div>
                        </div>
                        <span className="stat-mini-value">{attack}</span>
                    </div>
                    <div className="stat-mini">
                        <span className="stat-mini-label">DEF</span>
                        <div className="stat-mini-bar">
                            <div style={{ width: Math.min((defense / 150) * 100, 100) + '%' }}></div>
                        </div>
                        <span className="stat-mini-value">{defense}</span>
                    </div>
                </div>

                <div className="types-container-modern">
                    {types.map((t) => (
                        <span key={t} className={`type-badge-modern type-${t}`}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </span>
                    ))}
                </div>

                <div className="weaknesses-container">
                    <span className="weakness-label">Failles:</span>
                    {weaknesses.map((w) => (
                        <span key={w} className={`weakness-badge type-${w}`}>
                            {w.charAt(0).toUpperCase() + w.slice(1)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokeCard;