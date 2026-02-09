import { useState } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import "./addpokemon.css";

const POKEMON_TYPES = [
    { name: 'normal',   emoji: '⚪', color: '#a8a878' },
    { name: 'fire',     emoji: '🔥', color: '#f08030' },
    { name: 'water',    emoji: '💧', color: '#6890f0' },
    { name: 'grass',    emoji: '🌿', color: '#78c850' },
    { name: 'electric', emoji: '⚡', color: '#f8d030' },
    { name: 'ice',      emoji: '❄️', color: '#98d8d8' },
    { name: 'fighting', emoji: '🥊', color: '#c03028' },
    { name: 'poison',   emoji: '☠️', color: '#a040a0' },
    { name: 'ground',   emoji: '⛰️', color: '#e0c068' },
    { name: 'flying',   emoji: '🪶', color: '#a890f0' },
    { name: 'psychic',  emoji: '🔮', color: '#f85888' },
    { name: 'bug',      emoji: '🐛', color: '#a8b820' },
    { name: 'rock',     emoji: '🪨', color: '#b8a038' },
    { name: 'ghost',    emoji: '👻', color: '#705898' },
    { name: 'dragon',   emoji: '🐉', color: '#7038f8' },
    { name: 'dark',     emoji: '🌑', color: '#705848' },
    { name: 'steel',    emoji: '⚙️', color: '#b8b8d0' },
    { name: 'fairy',    emoji: '✨', color: '#ee99ac' },
];

const STATS_CONFIG = [
    { key: 'HP',             label: '❤️ PV',        color: '#ff5555' },
    { key: 'Attack',         label: '⚔️ Attaque',   color: '#f08030' },
    { key: 'Defense',        label: '🛡️ Défense',   color: '#f8d030' },
    { key: 'SpecialAttack',  label: '🔮 Atq. Spé.', color: '#6890f0' },
    { key: 'SpecialDefense', label: '🧿 Déf. Spé.', color: '#78c850' },
    { key: 'Speed',          label: '💨 Vitesse',    color: '#f85888' },
];

const AddPokemon = () => {
    const { addPokemon, backToList, pokemons } = usePokemon();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    const [formData, setFormData] = useState({
        name: "",
        selectedTypes: [],
        image: "",
        base: { HP: 50, Attack: 50, Defense: 50, SpecialAttack: 50, SpecialDefense: 50, Speed: 50 }
    });
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    /* ── Handlers ── */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const toggleType = (typeName) => {
        setFormData(prev => {
            const cur = prev.selectedTypes;
            if (cur.includes(typeName)) return { ...prev, selectedTypes: cur.filter(t => t !== typeName) };
            if (cur.length >= 2) return prev;
            return { ...prev, selectedTypes: [...cur, typeName] };
        });
        if (errors.type) setErrors({ ...errors, type: "" });
    };

    const handleStatChange = (stat, value) => {
        const v = Math.max(1, Math.min(255, parseInt(value) || 1));
        setFormData({ ...formData, base: { ...formData.base, [stat]: v } });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { setErrors({ ...errors, image: 'Veuillez sélectionner une image' }); return; }
        if (file.size > 5 * 1024 * 1024) { setErrors({ ...errors, image: "L'image doit faire moins de 5 MB" }); return; }
        setUploading(true); setUploadProgress(0);
        const fd = new FormData(); fd.append('image', file);
        try {
            const res = await fetch(`${BACKEND_URL}/upload`, { method: 'POST', body: fd });
            if (!res.ok) throw new Error("Erreur lors de l'upload");
            const data = await res.json();
            setFormData({ ...formData, image: data.imageUrl });
            setUploadProgress(100);
            setTimeout(() => setUploading(false), 500);
        } catch (err) {
            setErrors({ ...errors, image: "Erreur lors de l'upload: " + err.message });
            setUploading(false);
        }
    };

    const normalizeStatName = (stat) => {
        const map = { HP: 'hp', Attack: 'attack', Defense: 'defense', SpecialAttack: 'special-attack', SpecialDefense: 'special-defense', Speed: 'speed' };
        return map[stat] || stat.toLowerCase();
    };

    const validateForm = () => {
        const e = {};
        if (!formData.name.trim()) e.name = "Donne un nom à ton Pokémon !";
        if (formData.selectedTypes.length === 0) e.type = "Choisis au moins un type !";
        if (!formData.image.trim()) e.image = "Ajoute une image !";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const maxId = pokemons.reduce((max, p) => Math.max(max, p.id || 0), 0);
        const pokemonData = {
            id: maxId + 1,
            name: formData.name,
            types: formData.selectedTypes.map((t, i) => ({ slot: i + 1, type: { name: t.toLowerCase() } })),
            stats: Object.entries(formData.base).map(([stat, value]) => ({ base_stat: parseInt(value, 10) || 0, stat: { name: normalizeStatName(stat) } })),
            sprites: { front_default: formData.image },
            image: formData.image,
            isCustom: true
        };
        try { await addPokemon(pokemonData); }
        catch { setErrors({ ...errors, submit: 'Erreur lors de la création' }); }
    };

    /* ── Render ── */
    return (
        <div className="add-pokemon-container">
            <button className="btn-back-fun" onClick={backToList}>⬅️ Retour</button>

            <div className="create-card">
                <h2 className="create-title">🎨 Crée ton Pokémon !</h2>
                {errors.submit && <div className="error-banner">{errors.submit}</div>}

                <form onSubmit={handleSubmit} className="create-form">

                    {/* ── Image ── */}
                    <section className="create-section">
                        <h3 className="section-label">📸 Son image</h3>
                        <label htmlFor="img-input" className="img-drop-zone">
                            {uploading ? (
                                <div className="upload-progress"><div className="progress-fill" style={{ width: `${uploadProgress}%` }} /><span>Upload en cours...</span></div>
                            ) : formData.image ? (
                                <div className="img-preview-wrap">
                                    <img src={formData.image} alt="Aperçu" className="img-preview" onError={(e) => { e.target.src = 'https://via.placeholder.com/160?text=Erreur'; }} />
                                    <span className="img-change-hint">Clique pour changer</span>
                                </div>
                            ) : (
                                <div className="img-placeholder"><span className="img-placeholder-icon">📷</span><span>Clique ici pour ajouter une image</span></div>
                            )}
                            <input id="img-input" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} hidden />
                        </label>
                        {errors.image && <span className="error-msg">{errors.image}</span>}
                    </section>

                    {/* ── Nom ── */}
                    <section className="create-section">
                        <h3 className="section-label">✏️ Son nom</h3>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Comment s'appelle-t-il ?" className="name-input" />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </section>

                    {/* ── Types ── */}
                    <section className="create-section">
                        <h3 className="section-label">🏷️ Son type <span className="hint">(choisis 1 ou 2)</span></h3>
                        <div className="types-grid">
                            {POKEMON_TYPES.map(t => {
                                const active = formData.selectedTypes.includes(t.name);
                                return (
                                    <button key={t.name} type="button"
                                        className={`type-chip ${active ? 'active' : ''}`}
                                        style={{ '--tc': t.color, background: active ? t.color : undefined }}
                                        onClick={() => toggleType(t.name)}
                                    >
                                        <span className="type-chip-emoji">{t.emoji}</span>
                                        <span className="type-chip-name">{t.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {formData.selectedTypes.length > 0 && (
                            <div className="chosen-types">
                                {formData.selectedTypes.map(n => {
                                    const t = POKEMON_TYPES.find(x => x.name === n);
                                    return (
                                        <span key={n} className="chosen-tag" style={{ background: t?.color }}>
                                            {t?.emoji} {n} <button type="button" className="tag-x" onClick={() => toggleType(n)}>✕</button>
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                        {errors.type && <span className="error-msg">{errors.type}</span>}
                    </section>

                    {/* ── Stats ── */}
                    <section className="create-section">
                        <h3 className="section-label">📊 Ses stats</h3>
                        <div className="stats-list">
                            {STATS_CONFIG.map(({ key, label, color }) => {
                                const val = formData.base[key];
                                const pct = ((val / 255) * 100).toFixed(1);
                                return (
                                    <div className="stat-row-fun" key={key}>
                                        <span className="stat-name-fun">{label}</span>
                                        <div className="gauge-track">
                                            <div className="gauge-fill" style={{ width: `${pct}%`, background: color }} />
                                            <input type="range" min="1" max="255" value={val}
                                                onChange={(e) => handleStatChange(key, e.target.value)}
                                                className="gauge-input" />
                                        </div>
                                        <span className="stat-val-fun" style={{ color }}>{val}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ── Boutons ── */}
                    <div className="create-actions">
                        <button type="submit" className="btn-create" disabled={uploading}>🚀 Créer mon Pokémon !</button>
                        <button type="button" className="btn-nope" onClick={backToList} disabled={uploading}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPokemon;
