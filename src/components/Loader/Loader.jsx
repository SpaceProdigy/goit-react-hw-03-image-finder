import React from 'react';
import { Dna } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Dna
      visible={true}
      height={80}
      width={80}
      ariaLabel="dna-loading"
      wrapperStyle={{ margin: '0 auto' }}
      wrapperClassName="dna-wrapper"
    />
  );
};
