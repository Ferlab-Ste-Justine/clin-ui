import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import { patientsColumns } from './patientsColumns';
import Table, { Props } from './Table';
import { Bridge } from 'utils/bridge';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

const PatientsTable = ({ results, loading = false }: Props): React.ReactElement => {
  const [currentPageSize, setcurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const columns = patientsColumns([]);

  const iFrame = useRef<HTMLIFrameElement>(null);
  let bridge: Bridge;
  const store = useStore();
  const prescriptionModalCallback = (_: MessageEvent) => {
    console.log('**** Callback')
    loading= true
  };

  useEffect(() => {
    if (window) {
      bridge = new Bridge(store, window);
      bridge.register('closeNewPatientModal', prescriptionModalCallback);
    }

    return function cleanup() {
      if (bridge) {
        bridge.remove(prescriptionModalCallback);
      }
    };
  }, [iFrame]);

  return (
    <Table
      columns={columns}
      loading={loading}
      pagination={{
        current: currentPage,
        defaultPageSize: currentPageSize,
        onChange: (page, pageSize) => {
          if (currentPage !== page || currentPageSize !== pageSize) {
            setCurrentPage(page);
            setcurrentPageSize(pageSize || DEFAULT_PAGE_SIZE);
          }
        },
      }}
      results={results}
      total={results?.total || 0}
    />
  );
};

export default PatientsTable;
