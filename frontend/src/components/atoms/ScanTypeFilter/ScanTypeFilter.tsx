import './ScanTypeFilter.css';

export interface ScanTypeFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

function ScanTypeFilter({ value, onChange }: ScanTypeFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value || null;
    onChange(newValue);
  };

  return (
    <div className="scan-type-filter-container">
      <label className="scan-type-filter-label">
        Scan Type
      </label>
      <select 
        className="scan-type-filter-select"
        value={value || ''}
        onChange={handleChange}
      >
        <option value="">All Types</option>
        <option value="CT">CT</option>
        <option value="MRI">MRI</option>
      </select>
    </div>
  );
}

export default ScanTypeFilter;
