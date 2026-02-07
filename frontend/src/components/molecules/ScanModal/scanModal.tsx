import './ScanModal.css';

export interface ScanModalProps {
  scan: Scan | null;
  isOpen: boolean;
  onClose: () => void;
}

function ScanModal({ scan, isOpen, onClose }: ScanModalProps) {
  if (!isOpen || !scan) return null;

  return (
    <div className="scan-modal-overlay" onClick={(e) => e.stopPropagation()}>
      <div 
        className="scan-modal-content"
      >
        <div className="scan-modal-header">
          <h2 className="scan-modal-title">Scan Details</h2>
          <button 
            className="scan-modal-close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div className="scan-modal-details">
          <div className="scan-modal-detail-row">
            <span className="scan-modal-detail-label">Scan ID:</span>
            <span className="scan-modal-detail-value">{scan.scan_id}</span>
          </div>
          <div className="scan-modal-detail-row">
            <span className="scan-modal-detail-label">Patient Age:</span>
            <span className="scan-modal-detail-value">{scan.patient_age}</span>
          </div>
          <div className="scan-modal-detail-row">
            <span className="scan-modal-detail-label">Scan Type:</span>
            <span className="scan-modal-detail-value">{scan.scan_type}</span>
          </div>
          <div className="scan-modal-detail-row">
            <span className="scan-modal-detail-label">Region:</span>
            <span className="scan-modal-detail-value">{scan.region}</span>
          </div>
          <div className="scan-modal-detail-row">
            <span className="scan-modal-detail-label">Confidence:</span>
            <span className="scan-modal-detail-value">{scan.confidence_score.toFixed(2)}</span>
          </div>
          <div className="scan-modal-detail-row">
            <span className="scan-modal-detail-label">Predicted Condition:</span>
            <span className="scan-modal-detail-value">{scan.predicted_condition}</span>
          </div>
          <div className="scan-modal-detail-row">
            <span className="scan-modal-detail-label">Created:</span>
            <span className="scan-modal-detail-value">
              {new Date(scan.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanModal;
