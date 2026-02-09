import { useState, useEffect } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import DeleteModal from "../deleteModal";
import "./pokedetails.css";

const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'grass', 'electric', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TYPE_COLORS = {
    normal: '#a8a878', fire: '#f08030', water: '#6890f0', grass: '#78c850',
    electric: '#f8d030', ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0',
    ground: '#e0c068', flying: '#a890f0', psychic: '#f85888', bug: '#a8b820',
    rock: '#b8a038', ghost: '#705898', dragon: '#7038f8', dark: '#705848',
    steel: '#b8b8d0', fairy: '#ee99ac'
};

const PokeDetails = () => {
    const {
        selectedPokemon,
        backToList,
        updatePokemon,
        deletePokemon,
    } = usePokemon();

    const [fullData, setFullData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [editedTypes, setEditedTypes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [playingSound, setPlayingSound] = useState(false);

    useEffect(() => {
        if (!selectedPokemon) return;
        setFullData(selectedPokemon);
        setEditedData(selectedPokemon);
        // Init editedTypes from pokemon data
        const types = [];
        if (Array.isArray(selectedPokemon.type)) {
            types.push(...selectedPokemon.type.map(t => t.toLowerCase()));
        } else if (typeof selectedPokemon.type === 'string') {
            types.push(selectedPokemon.type.toLowerCase());
        } else if (selectedPokemon.types && Array.isArray(selectedPokemon.types)) {
            selectedPokemon.types.forEach(t => {
                const name = typeof t === 'string' ? t : (t.type?.name || t.type || '');
                if (name) types.push(name.toLowerCase());
            });
        }
        setEditedTypes(types);
    }, [selectedPokemon]);

    const playPokemonSound = () => {
        if (playingSound || !fullData.id) return;
        setPlayingSound(true);
        
        // Pokémon sound URL using PokéAPI
        const pokemonId = fullData.id.toString().padStart(3, '0');
        const soundUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${fullData.id}.ogg`;
        
        const audio = new Audio(soundUrl);
        audio.onended = () => setPlayingSound(false);
        audio.onerror = () => {
            console.log('Sound not available');
            setPlayingSound(false);
        };
        audio.play().catch(err => {
            console.log('Could not play sound:', err);
            setPlayingSound(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const toggleEditType = (type) => {
        setEditedTypes(prev => {
            if (prev.includes(type)) return prev.filter(t => t !== type);
            if (prev.length >= 2) return prev;
            return [...prev, type];
        });
    };

    const handleSaveChanges = () => {
        const updated = { ...editedData, type: editedTypes };
        updatePokemon(updated);
        setIsEditing(false);
    };

    const handleDelete = () => {
        deletePokemon(fullData);
        setShowDeleteModal(false);
    };

    // Helper functions to get display values
    const getDisplayName = () => {
        if (typeof fullData.name === 'string') return fullData.name;
        if (fullData.name && typeof fullData.name === 'object') {
            return fullData.name.french || fullData.name.english || '';
        }
        return '';
    };

    const getTypeList = () => {
        if (Array.isArray(fullData.type)) return fullData.type;
        if (typeof fullData.type === 'string') return [fullData.type];
        // Traiter les types depuis l'API PokéAPI
        if (fullData.types && Array.isArray(fullData.types)) {
            return fullData.types.map(t => 
                typeof t === 'string' ? t : (t.type?.name || t.type || '')
            ).filter(Boolean);
        }
        return [];
    };

    const getStats = () => {
        // Si on a fullData.base (format personnalisé)
        if (fullData.base && Object.keys(fullData.base).length > 0) {
            return fullData.base;
        }
        
        // Si on a fullData.stats (format PokéAPI)
        if (fullData.stats && Array.isArray(fullData.stats)) {
            const statsObj = {};
            fullData.stats.forEach(stat => {
                const name = typeof stat.stat === 'string' 
                    ? stat.stat 
                    : (stat.stat?.name || '');
                if (name) {
                    statsObj[name] = stat.base_stat || stat.value || 0;
                }
            });
            return statsObj;
        }
        
        return {};
    };

    const formatStatLabel = (key) => {
        const normalized = String(key).toLowerCase().replace(/[_\s]+/g, '-');
        const map = {
            hp: 'HP',
            attack: 'Attack',
            defense: 'Defense',
            'special-attack': 'Sp. Atk',
            'special-defense': 'Sp. Def',
            speed: 'Speed',
        };
        return map[normalized] || String(key);
    };

    const getStatPercent = (value) => {
        const max = 255;
        const num = Number(value) || 0;
        return Math.min((num / max) * 100, 100);
    };

    if (!fullData.id && !fullData.name) {
        return <p className="loading">Chargement des détails...</p>;
    }

    return (
        <div className="poke-details-container">
            <button className="btn-back" onClick={backToList}>
                ◀ Retour à la liste
            </button>

            <div className="poke-details-card">
                {!isEditing ? (
                    <>
                        {/* Image Section */}
                        <div className="poke-details-image-section">
                            <div className="poke-image-wrapper" onClick={playPokemonSound} style={{ cursor: playingSound ? 'not-allowed' : 'pointer', opacity: playingSound ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                                <img
                                    src={fullData.image}
                                    alt={getDisplayName()}
                                    className="poke-details-image"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No%20Image'}
                                />
                                {playingSound && <div className="sound-indicator">🔊 Jouant...</div>}
                                {!playingSound && <div className="sound-hint">🔊 Cliquez pour entendre</div>}
                            </div>
                            <div className="poke-id-badge">#{fullData.id}</div>
                        </div>

                        {/* Info Section */}
                        <div className="poke-details-info-section">
                            <div className="poke-header">
                                <h1 className="poke-details-name">{getDisplayName()}</h1>
                                <div className="poke-types">
                                    {getTypeList().map((type) => (
                                        <span key={type} className={`type-badge type-${type.toLowerCase()}`}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="poke-stats-section">
                                <h2>Statistiques</h2>
                                <div className="stats-container">
                                    {Object.entries(getStats()).map(([key, value]) => (
                                        <div key={key} className="stat-item">
                                            <div className="stat-header">
                                                <span className="stat-label">{formatStatLabel(key)}</span>
                                                <span className="stat-value">{value}</span>
                                            </div>
                                            <div className="stat-bar-wrapper">
                                                <div className="stat-bar" style={{ 
                                                    width: `${getStatPercent(value)}%`,
                                                    '--value': value
                                                }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Button Group */}
                            <div className="button-group">
                                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                                    ✏️ Modifier
                                </button>
                                <button className="btn-delete" onClick={() => setShowDeleteModal(true)}>
                                    🗑️ Supprimer
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="edit-form">
                        <h2>Modifier le Pokémon</h2>

                        <div className="form-group">
                            <label htmlFor="edit-name">Nom du Pokémon</label>
                            <input
                                id="edit-name"
                                type="text"
                                name="name"
                                value={typeof editedData.name === 'string' ? editedData.name : (editedData.name?.french || '')}
                                onChange={(e) => {
                                    const newName = typeof editedData.name === 'object' 
                                        ? { ...editedData.name, french: e.target.value }
                                        : e.target.value;
                                    setEditedData({ ...editedData, name: newName });
                                }}
                                placeholder="Ex: Pikachu"
                            />
                        </div>

                        <div className="form-group">
                            <label>Type(s) <span className="type-hint">(max 2)</span></label>
                            <div className="type-selector-grid">
                                {POKEMON_TYPES.map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`type-select-btn ${editedTypes.includes(type) ? 'selected' : ''}`}
                                        style={{
                                            '--type-color': TYPE_COLORS[type],
                                            background: editedTypes.includes(type) ? TYPE_COLORS[type] : 'transparent'
                                        }}
                                        onClick={() => toggleEditType(type)}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                            {editedTypes.length > 0 && (
                                <div className="selected-types-display">
                                    {editedTypes.map(t => (
                                        <span key={t} className="selected-type-tag" style={{ background: TYPE_COLORS[t] }}>
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                            <button type="button" onClick={() => toggleEditType(t)} className="remove-type">×</button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-image">URL Image</label>
                            <input
                                id="edit-image"
                                type="text"
                                name="image"
                                value={editedData.image || ""}
                                onChange={(e) => setEditedData({ ...editedData, image: e.target.value })}
                                placeholder="http://localhost:3000/assets/pokemons/1.png"
                            />
                        </div>

                        <h3>Statistiques</h3>
                        <div className="stats-edit-grid">
                            {['HP', 'Attack', 'Defense', 'SpecialAttack', 'SpecialDefense', 'Speed'].map(stat => (
                                <div className="form-group" key={stat}>
                                    <label htmlFor={`edit-${stat}`}>{stat}:</label>
                                    <div className="stat-input-wrapper">
                                        <input
                                            id={`edit-${stat}`}
                                            type="number"
                                            min="1"
                                            max="255"
                                            value={editedData.base?.[stat] || 0}
                                            onChange={(e) => {
                                                const newBase = { ...(editedData.base || {}), [stat]: parseInt(e.target.value) || 0 };
                                                setEditedData({ ...editedData, base: newBase });
                                            }}
                                        />
                                        <div className="stat-slider">
                                            <input
                                                type="range"
                                                min="1"
                                                max="255"
                                                value={editedData.base?.[stat] || 0}
                                                onChange={(e) => {
                                                    const newBase = { ...(editedData.base || {}), [stat]: parseInt(e.target.value) || 0 };
                                                    setEditedData({ ...editedData, base: newBase });
                                                }}
                                                className="slider"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="button-group">
                            <button className="btn-save" onClick={handleSaveChanges}>
                                ✓ Enregistrer
                            </button>
                            <button className="btn-cancel" onClick={() => {
                                setIsEditing(false);
                                setEditedData(fullData);
                                // Reset types too
                                const types = [];
                                if (Array.isArray(fullData.type)) types.push(...fullData.type.map(t => t.toLowerCase()));
                                else if (typeof fullData.type === 'string') types.push(fullData.type.toLowerCase());
                                else if (fullData.types && Array.isArray(fullData.types)) {
                                    fullData.types.forEach(t => {
                                        const name = typeof t === 'string' ? t : (t.type?.name || t.type || '');
                                        if (name) types.push(name.toLowerCase());
                                    });
                                }
                                setEditedTypes(types);
                            }}>
                                ✕ Annuler
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <DeleteModal
                    pokemonName={getDisplayName()}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default PokeDetails;
