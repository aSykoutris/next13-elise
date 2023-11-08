'use client';

import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';

type noCompaniesModal = {
  buttonMessage: string;
  error: string;
  title: string;
};

export default function NoCompaniesModal({
  error,
  title,
  buttonMessage,
}: noCompaniesModal) {
  return (
    <Modal
      backdrop={'blur'}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton
      defaultOpen
    >
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
          <ModalBody>
            <span>{error}</span>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onPress={() => signOut()}>
              {buttonMessage}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
