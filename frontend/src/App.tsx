import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/atoms/Header/Header';
import ScanTable from './components/molecules/ScanTable/ScanTable';
import ScanModal from './components/molecules/ScanModal/scanModal';
import ScanTypeFilter from './components/atoms/ScanTypeFilter/ScanTypeFilter';
import Button from './components/atoms/Button/Button';
import TextFilterField from './components/atoms/TextFilterField/TextFilterField';

function App() {
  //states used to track the currently displayed scans, page and total amount of scans available with the current filters
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);//The loading state can be used to display a loading icon and lock the ui while a request is happening
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  //State and helper functions for displaing the scan focus modal
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (scan: Scan) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedScan(null);
  };

  type FiltersState = {
    scan_type: string | null;
    min_confidence: number | null;
    max_confidence: number | null;
    scan_id: string | null;
  };

  // Filter state
  const [filters, setFilters] = useState<FiltersState>({
    scan_type: null,
    min_confidence: null,
    max_confidence: null,
    scan_id: null
  });

  //Async function that fetches scans for the given page and using the current filters state. 
  const fetchScans = async (currentPage) => {
    setLoading(true);
    try {
      const requestBody = {
        page: currentPage,
        page_size: 10,
        ...filters  // Spread filter values (null/empty = no filter)
      };
      
      const response = await axios.post('http://127.0.0.1:8000/scans/search', requestBody); //Hardcoded enpoint for dev purposes
      setTotal(response.data.total);
      setScans(response.data.items || []);
      setPage(currentPage);
    } catch (error) {
      console.error('Failed to fetch scans:', error);
      setScans([]);
    }
    setLoading(false);
  };


  //Fetch the first page on initialization
  useEffect(() => {
    fetchScans(1);
  }, []);

  //Helper functions for the next and previous page buttons
  const nextPage = () =>{
    if(page < total){
      fetchScans(page+1);
    }
  }

  const previousPage = () =>{
    if(page > 1){
      fetchScans(page -1)
    }
  }


  return (
    <div>
      <div>
        <Header/>
      </div>

      <div className='contentContainer'>

        <div className='textFieldsContainer'>
          <ScanTypeFilter value={filters.scan_type} onChange={(value) => setFilters({ ...filters, scan_type: value })}/>

          <TextFilterField
            label="Min Confidence"
            type="number"
            min={0}
            max={1}
            step={0.01}
            placeholder="0.00"
            value={filters.min_confidence?.toString() || ''}
            onChange={(value) => setFilters({
              ...filters,
              min_confidence: value ? parseFloat(value) : null
            })}
          />

          <TextFilterField
            label="Max Confidence"
            type="number"
            min={0}
            max={1}
            step={0.01}
            placeholder="1.00"
            value={filters.max_confidence?.toString() || ''}
            onChange={(value) => setFilters({
              ...filters,
              max_confidence: value ? parseFloat(value) : null
            })}
          />

          <TextFilterField
            label="Scan ID"
            type="text"
            placeholder="Enter scan ID"
            value={filters.scan_id || ''}
            onChange={(value) => setFilters({
              ...filters,
              scan_id: value
            })}
          />

          <Button label='Apply' onClick={() => fetchScans(1)}/>
        </div>

        <div className='textFieldsContainer'>
          <Button label='<' onClick={previousPage}/>
          <Button label='>' onClick={nextPage}/>
        </div>

        <ScanTable 
          items={scans} 
          page={page} 
          page_size={10} 
          total={total}
          onRowClick={openModal}
        />
        <ScanModal 
          scan={selectedScan} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      </div>
    </div>
  )

}

export default App;
