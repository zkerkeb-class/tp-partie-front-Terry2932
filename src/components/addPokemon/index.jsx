import { useState } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import "./addpokemon.css";

const AddPokemon = () => {
    const { addPokemon, backToList, pokemons } = usePokemon();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        image: "",
        base: {
            HP: 50,
            Attack: 50,
            Defense: 50,
            SpecialAttack: 50,
            SpecialDefense: 50,
            Speed: 50
        }
    });
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setErrors({ ...errors, image: 'Veuillez sélectionner une image' });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors({ ...errors, image: 'L\'image doit faire moins de 5 MB' });
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        const formDataImg = new FormData();
        formDataImg.append('image', file);

        try {
            const response = await fetch(`${BACKEND_URL}/upload`, {
                method: 'POST',
                body: formDataImg,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'upload');
            }

            const data = await response.json();
            setFormData({
                ...formData,
                image: data.imageUrl,
            });
            setUploadProgress(100);
            setTimeout(() => setUploading(false), 500);
        } catch (error) {
            console.error('Erreur upload:', error);
            setErrors({ ...errors, image: 'Erreur lors de l\'upload: ' + error.message });
            setUploading(false);
        }
    };

    const normalizeStatName = (stat) => {
        const map = {
            HP: 'hp',
            Attack: 'attack',
            Defense: 'defense',
            SpecialAttack: 'special-attack',
            SpecialDefense: 'special-defense',
            Speed: 'speed',
        };
        return map[stat] || String(stat).toLowerCase().replace(/\s+/g, '-');
    };

    const handleStatChange = (stat, value) => {
        setFormData({
            ...formData,
            base: {
                ...formData.base,
                [stat]: parseInt(value) || 0
            }
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Le nom est requis";
        }
        if (!formData.type.trim()) {
            newErrors.type = "Le type est requis";
        }
        if (!formData.image.trim()) {
            newErrors.image = "Une image est requise";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Générer un ID unique (max ID + 1)
            const maxId = pokemons.reduce((max, p) => Math.max(max, p.id || 0), 0);
            const newId = maxId + 1;

            // Formater le type en array
            const typeArray = formData.type.split(',').map(t => t.trim()).filter(Boolean);

            const statsArray = Object.entries(formData.base).map(([stat, value]) => ({
                base_stat: parseInt(value, 10) || 0,
                stat: { name: normalizeStatName(stat) },
            }));

            const pokemonData = {
                id: newId,
                name: formData.name,
                types: typeArray.map((t, index) => ({
                    slot: index + 1,
                    type: { name: t.toLowerCase() },
                })),
                stats: statsArray,
                sprites: {
                    front_default: formData.image,
                },
                image: formData.image,
                isCustom: true
            };

            try {
                await addPokemon(pokemonData);
            } catch (error) {
                console.error("Erreur lors de l'ajout:", error);
                setErrors({ ...errors, submit: 'Erreur lors de la création du Pokémon' });
            }
        }
    };

    return (
        <div className="add-pokemon-container">
            <button className="btn-back" onClick={backToList}>
                ◀ Retour à la liste
            </button>

            <div className="add-pokemon-content">
                <h2>Créer un nouveau Pokémon</h2>

                {errors.submit && <div className="error-banner">{errors.submit}</div>}

                <form onSubmit={handleSubmit} className="add-pokemon-form">
                    <div className="form-group">
                        <label htmlFor="image">Image du Pokémon *</label>
                        <div className="image-upload-section">
                            <label htmlFor="image-input" className="file-upload-label">
                                {uploading ? (
                                    <div className="upload-progress">
                                        <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                                        <span className="progress-text">Upload en cours...</span>
                                    </div>
                                ) : formData.image ? (
                                    <div className="image-selected">
                                        <span>✓ Image sélectionnée</span>
                                        <img src={formData.image} alt="Aperçu" className="image-preview-thumb" />
                                    </div>
                                ) : (
                                    <div className="upload-placeholder">
                                        <span className="upload-icon">📸</span>
                                        <span>Cliquez ou glissez une image</span>
                                    </div>
                                )}
                                <input
                                    id="image-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                        {formData.image && (
                            <div className="image-preview-large">
                                <img 
                                    src={formData.image} 
                                    alt="Aperçu du pokémon"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200?text=Image+Error';
                                    }} 
                                />
                            </div>
                        )}
                        {errors.image && <span className="error-message">{errors.image}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nom du Pokémon *</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ex: Pikachu"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type(s) (séparés par des virgules) *</label>
                        <input
                            id="type"
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            placeholder="Ex: Electric ou Fire, Flying"
                        />
                        {errors.type && <span className="error-message">{errors.type}</span>}
                    </div>

                    <h3>Statistiques</h3>
                    <div className="stats-grid">
                        {Object.entries(formData.base).map(([stat, value]) => (
                            <div className="form-group" key={stat}>
                                <label htmlFor={stat}>{stat}:</label>
                                <div className="stat-input-wrapper">
                                    <input
                                        id={stat}
                                        type="number"
                                        min="1"
                                        max="255"
                                        value={value}
                                        onChange={(e) => handleStatChange(stat, e.target.value)}
                                    />
                                    <div className="stat-slider">
                                        <input
                                            type="range"
                                            min="1"
                                            max="255"
                                            value={value}
                                            onChange={(e) => handleStatChange(stat, e.target.value)}
                                            className="slider"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn-submit" disabled={uploading}>
                            ✓ Créer le Pokémon
                        </button>
                        <button type="button" className="btn-cancel" onClick={backToList} disabled={uploading}>
                            ✕ Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPokemon;
