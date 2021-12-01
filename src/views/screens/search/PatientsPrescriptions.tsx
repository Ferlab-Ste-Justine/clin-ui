import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { getQueryBuilderCache, useFilters } from '@ferlab/ui/core/data/filters/utils';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import ScrollView from '@ferlab/ui/core/layout/ScrollView';
import StackLayout, { StackOrientation } from '@ferlab/ui/core/layout/StackLayout';
import { Typography } from 'antd';

import { mappedFilters, usePatients } from 'store/graphql/patients/actions';
import { usePrescription, usePrescriptionMapping } from 'store/graphql/prescriptions/actions';

import { TableTabs } from './ContentContainer';
import ContentContainer from './ContentContainer';
import Sidebar from './Sidebar';
import ContentHeader from 'components/Layout/Content/Header';
import styles from './PatientsPrescriptions.module.scss';
import { useParams } from 'react-router';
const { Title } = Typography;

export const MAX_NUMBER_RESULTS = 1000;

const PrescriptionSearch = (): React.ReactElement => {
  useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(TableTabs.Patients);
  const { filters: sqonFilters } = useFilters();
  const allSqons = getQueryBuilderCache('prescription-repo').state;

  const newFilters = mappedFilters(sqonFilters);
  const patientQueryConfig = {
    first: MAX_NUMBER_RESULTS,
    offset: 0,
    sqon: resolveSyntheticSqon(allSqons, newFilters),
  };

  const searchResults = usePatients(patientQueryConfig);
  const patients = usePatients(patientQueryConfig);

  const arrangerQueryConfig = {
    first: MAX_NUMBER_RESULTS,
    offset: 0,
    sqon: resolveSyntheticSqon(allSqons, sqonFilters),
  };
  const prescriptions = usePrescription(arrangerQueryConfig);
  const extendedMapping = usePrescriptionMapping();

  return (
    <StackLayout orientation={StackOrientation.Vertical}>
      <ContentHeader title={intl.get('screen.patientsearch.title')} />
      <StackLayout className={styles.layout} orientation={StackOrientation.Horizontal}>
        <Sidebar
          aggregations={prescriptions.aggregations}
          extendedMapping={extendedMapping}
          filters={sqonFilters}
          results={prescriptions.data}
        />
        <ScrollView className={styles.scrollContent}>
          <div title="Studies">
            <ContentContainer
              extendedMapping={extendedMapping}
              filters={sqonFilters}
              pagination={{
                current: currentPage,
                onChange: (page, pageSize) => setCurrentPage(page),
              }}
              patients={patients}
              prescriptions={prescriptions}
              searchResults={searchResults}
              tabs={{
                currentTab,
                setCurrentTab,
              }}
            />
          </div>
        </ScrollView>
      </StackLayout>
    </StackLayout>
  );
};

export default PrescriptionSearch;
