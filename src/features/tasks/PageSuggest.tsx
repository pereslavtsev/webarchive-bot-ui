import React from 'react';
import { Suggest, SuggestProps } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';
import { gql, useLazyQuery } from '@apollo/client';

interface PageSuggestProps extends Pick<SuggestProps<any>, 'onItemSelect'> {}

const PageSuggest: React.FC<PageSuggestProps> = ({ onItemSelect }) => {
  const [term, setTerm] = React.useState('');
  const [search, { loading, error, data }] = useLazyQuery(gql`
    query search($term: String!) {
      search(term: $term) {
        id
        title
      }
    }
  `);
  return (
    <Suggest
      fill
      items={data?.search || []}
      inputValueRenderer={(item: any) => item.title}
      itemRenderer={(item, { handleClick }) => (
        <MenuItem
          key={`item${item.id}`}
          onClick={handleClick}
          text={item.title}
        />
      )}
      onQueryChange={(query) => {
        setTerm(query);
        search({ variables: { term: query } });
      }}
      onItemSelect={(item) => {
        setTerm(item.title);
        onItemSelect(item);
      }}
      openOnKeyDown
      popoverProps={{ minimal: true }}
      query={term}
    />
  );
};

export default PageSuggest;
