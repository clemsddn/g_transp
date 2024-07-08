export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <div {...props} className={`invalid-feedback ${className}`}>
            {message}
        </div>
    ) : null;
}
