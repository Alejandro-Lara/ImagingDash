
import './Button.css';

export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;  // Optional disabled prop
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <button 
            className="button" 
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}

export default Button;
