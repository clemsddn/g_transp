import React from 'react';
import { Link } from '@inertiajs/react';

function ConfirmationModal({ show, onClose, onConfirm, url  }) {
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmer la suppression</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Etes vous sur de vouloir supprimer ?</p>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <Link href={url}>                        
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
