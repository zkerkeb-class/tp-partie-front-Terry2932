import { useState, useEffect } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import DeleteModal from "../deleteModal";
import "./pokedetails.css";

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [playingSound, setPlayingSound] = useState(false);

    useEffect(() => {
        if (!selectedPokemon) return;
        setFullData(selectedPokemon);
        setEditedData(selectedPokemon);
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

    const handleSaveChanges = () => {
        updatePokemon(editedData);
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
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom (Français):</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={typeof editedData.name === 'string' ? editedData.name : (editedData.name?.french || '')}
                                    onChange={(e) => {
                                        const newName = typeof editedData.name === 'object' 
                                            ? { ...editedData.name, french: e.target.value }
                                            : e.target.value;
                                        setEditedData({ ...editedData, name: newName });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Type(s) (séparés par des virgules):</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={Array.isArray(editedData.type) ? editedData.type.join(', ') : (editedData.type || '')}
                                    onChange={(e) => setEditedData({ ...editedData, type: e.target.value.split(',').map(t => t.trim()) })}
                                    placeholder="Ex: Grass, Poison"
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>URL Image:</label>
                            <input
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
                                    <label>{stat}:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="255"
                                        value={editedData.base?.[stat] || 0}
                                        onChange={(e) => {
                                            const newBase = { ...(editedData.base || {}), [stat]: parseInt(e.target.value) || 0 };
                                            setEditedData({ ...editedData, base: newBase });
                                        }}
                                    />
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
