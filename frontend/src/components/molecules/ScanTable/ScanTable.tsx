import { useState } from 'react';
import './ScanTable.css';

export interface ScanTableProps {
  items: Scan[];
  total: number;
  page: number;
  page_size: number;
  onRowClick?: (scan: Scan) => void;
}

function ScanTable({ items, total, page, page_size, onRowClick }: ScanTableProps) {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  const handleRowClick = (scan: Scan) => {
    if (onRowClick) {
      onRowClick(scan);
    }
  };

  return (
    <div className="scan-table-container">
      <div className="scan-table-wrapper">
        <table className="scan-table">
          <thead>
            <tr className="scan-table-head-row">
              <th className="scan-table-header-cell">Scan ID</th>
              <th className="scan-table-header-cell">Age</th>
              <th className="scan-table-header-cell">Scan Type</th>
              <th className="scan-table-header-cell">Region</th>
              <th className="scan-table-header-cell">Confidence</th>
              <th className="scan-table-header-cell">Condition</th>
              <th className="scan-table-header-cell">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((scan) => (
              <tr
                key={scan.id}
                className={
                  'scan-table-row' +
                  (hoveredRowId === scan.id ? ' hovered' : '')
                }
                onMouseEnter={() => setHoveredRowId(scan.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                onClick={() => handleRowClick(scan)}
              >
                <td className="scan-table-cell">{scan.scan_id}</td>
                <td className="scan-table-cell">{scan.patient_age}</td>
                <td className="scan-table-cell">{scan.scan_type}</td>
                <td className="scan-table-cell">{scan.region}</td>
                <td className="scan-table-cell">
                  {scan.confidence_score.toFixed(2)}
                </td>
                <td className="scan-table-cell">{scan.predicted_condition}</td>
                <td className="scan-table-cell last">
                  {new Date(scan.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="scan-table-no-data">
                  No scans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="scan-table-footer">
        Showing {items.length} of {total} scans (Page {page})
      </div>
    </div>
  );
}

export default ScanTable;
