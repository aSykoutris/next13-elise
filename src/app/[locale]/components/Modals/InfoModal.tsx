'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';


type InfoModalProps = {
  title?: string;
  description?:{
    name: string;
    address: string;
    countryCode: string;
    vatNumber: string;
  };
  onClose:any
};

export default function InfoModal({
  title,
  description,
  onClose
}: InfoModalProps) {
  return (
    <Modal
      defaultOpen={true}
      size='5xl'
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop={'blur'}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 text-center text-lg'>{title}</ModalHeader>
        <ModalBody className='flex flex-col text-center justify-center'>
          <p className='font-bold text-sm'>{description?.name}</p>
          <p className='font-bold text-sm'>{description?.address}</p>
          <p className='font-bold text-sm'>{description?.countryCode}</p>
          <p className='font-bold text-sm'>{description?.vatNumber}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
