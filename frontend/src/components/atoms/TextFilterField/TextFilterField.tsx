import './TextFilterField.css';

export interface TextFilterFieldProps {
  value: string | null;
  onChange: (value: string | null) => void;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number';
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

function TextFilterField({ 
  value, 
  onChange, 
  label, 
  placeholder = '',
  type = 'text',
  min,
  max,
  step,
  disabled = false
}: TextFilterFieldProps) {

  //helper function that propagates the new field value to the onChange prop
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value || null;
    onChange(newValue);
  };

  return (
    <div className="text-filter-field-container">
      <label className="text-filter-field-label">
        {label}
      </label>
      <input
        className="text-filter-field-input"
        type={type}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
    </div>
  );
}

export default TextFilterField;
