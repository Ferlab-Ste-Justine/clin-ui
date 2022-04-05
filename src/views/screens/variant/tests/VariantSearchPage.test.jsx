import React from 'react';
import { render } from '@testing-library/react';
import * as actions from 'graphql/variants/actions';
import VariantSearchPage from 'views/screens/variant/VariantSearchPage';

jest.mock('@ferlab/ui/core/components/SidebarMenu', () => () => {
  return <div />;
});

jest.mock('@ferlab/ui/core/layout/ScrollView', () =>() => {
  return <div />;
});

jest.mock('@ferlab/ui/core/components/QueryBuilder/icons/CaretRightIcon', () =>() => {
  return <div />;
});

jest.mock('views/screens/variant/filters/FilterList', () => jest.fn().mockImplementation(() => (<div></div>)));

jest.mock('@ferlab/ui/core/layout/StackLayout', () => () => {
  return <div />;
});

const mockVariantPageContainerComponents = jest.mock('views/screens/variant/VariantPageContainer', () => {
  let mock = jest.fn();
  mock.mockReturnValue = () => <li></li>
  return mock
});

jest.mock('graphql/variants/actions');
const useMock = actions.useGetVariantExtendedMappings

const variantSearchPageTests = () => {
  beforeEach(() => {
    useMock.mockReturnValue({ loadingMapping: false })
  });

  it('renders correctly', () => {
    const view = render(<VariantSearchPage />)
    // expect(mockVariantPageContainerComponents).toHaveBeenLastCalledWith({ loadingMapping: false })
    expect(view).toMatchSnapshot();
  });
}

describe('Variant', () => {
  describe('views', () => {
    describe('screens', () => {
      describe('variant', () => {
          // eslint-disable-next-line jest/valid-describe-callback
          describe('VariantSearchPage', variantSearchPageTests)
      })
    })
  })
})

