// noinspection HtmlUnknownTarget

import { Card } from '@components/base';
import { LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Form from './Form';
import SubmittedState from './SubmittedState';
import firestore from 'firestore';
import { doc, getDoc } from 'firebase/firestore';

type IProps = {};

const BorrowSingupForm: React.FC<IProps> = ({}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: accountData } = useAccount();

  const fetchIsApplicationExists = async () => {
    if (accountData?.address) {
      setIsLoading(true);
      const docSnap = await getDoc(
        doc(firestore, 'borrowers', accountData.address)
      );
      if (docSnap.exists()) setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIsApplicationExists();
  }, []);

  return (
    <Card sx={{ minHeight: 560 }}>
      <LoadingOverlay visible={isLoading} />
      {isSubmitted ? (
        <SubmittedState />
      ) : (
        <Form onSubmitted={() => setIsSubmitted(true)} />
      )}
    </Card>
  );
};

export default BorrowSingupForm;
