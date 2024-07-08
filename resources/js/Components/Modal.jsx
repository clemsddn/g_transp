import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BootstrapModal } from 'react-bootstrap';

export default function Modal({ children, show = false, maxWidth = 'lg', closeable = true, onClose = () => {} }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'modal-sm',
        md: 'modal-md',
        lg: '',
        xl: 'modal-xl',
        '2xl': 'modal-xxl',
    }[maxWidth];

    return (
        <BootstrapModal show={show} onHide={close} dialogClassName={maxWidthClass} centered>
            <BootstrapModal.Header closeButton={closeable}>
                <BootstrapModal.Title>Modal Title</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {children}
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
                <button type="button" className="btn btn-secondary" onClick={close}>
                    Close
                </button>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool,
    maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
    closeable: PropTypes.bool,
    onClose: PropTypes.func
};

Modal.defaultProps = {
    show: false,
    maxWidth: 'lg',
    closeable: true,
    onClose: () => {}
};
