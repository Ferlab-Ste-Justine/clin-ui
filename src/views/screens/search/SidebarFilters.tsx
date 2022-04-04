import React from 'react';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

import { Aggregations } from 'store/graphql/models';
import { ExtendedMappingResults } from 'store/graphql/models';
import { generateFilters } from 'store/graphql/utils/Filters';

import style from './SidebarFilter.module.scss';

export type SidebarFilterProps = {
  queryBuilderId: string;
  aggregations: Aggregations;
  filters: ISqonGroupFilter;
  extendedMapping: ExtendedMappingResults;
};

export interface ItemProps {
  label: React.ReactElement;
  value: string;
}

const SidebarFilters = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
}: SidebarFilterProps): React.ReactElement => (
  <>
    {generateFilters({
      queryBuilderId,
      aggregations,
      extendedMapping,
      className: style.facetCollapse,
    })}
  </>
);

export default SidebarFilters;
