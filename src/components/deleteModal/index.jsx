import "./deletemodal.css";

const DeleteModal = ({ pokemonName, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>⚠️ Supprimer un Pokémon</h2>
                </div>
                <div className="modal-body">
                    <p>
                        Êtes-vous sûr de vouloir supprimer <strong>{pokemonName}</strong> ?
                    </p>
                    <p className="warning-text">
                        Cette action est irréversible et ne pourra pas être annulée.
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-confirm-delete" onClick={onConfirm}>
                        Oui, supprimer
                    </button>
                    <button className="btn-keep" onClick={onCancel}>
                        Non, conserver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
