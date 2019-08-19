import React from 'react';
import { useRouter } from 'next/router';

const RepositoryPage = () => {
  const router = useRouter();
  const { query } = router;

  return <div>{JSON.stringify(query)}</div>;
};

export default RepositoryPage;
