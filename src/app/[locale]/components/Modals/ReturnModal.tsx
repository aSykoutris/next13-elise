'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

import NextLink from 'next/link';

type ReturnModalProps = {
  title?: string;
  description: string;
  buttonMessage: string;
  href?: string;
};

export default function ReturnModal({
  title,
  description,
  buttonMessage,
  href = '/selectCompany',
}: ReturnModalProps) {
  return (
    <Modal
      defaultOpen={true}
      size='5xl'
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop={'blur'}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
        <ModalBody>
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' as={NextLink} href={href}>
            {buttonMessage}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
