import { useState, useCallback } from 'react';
import { Modal } from 'react-bootstrap';

export const useAddModal = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const showAdd = useCallback(() => setIsOpenAdd(true), []);
  const hideAdd = useCallback(() => setIsOpenAdd(false), []);

  return {
    isOpenAdd,
    showAdd,
    hideAdd,
    Modal,
  };
};
export const useUpdateModal = () => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const showUpdate = useCallback(() => setIsOpenUpdate(true), []);
  const hideUpdate = useCallback(() => setIsOpenUpdate(false), []);

  return {
    isOpenUpdate,
    showUpdate,
    hideUpdate,
    Modal,
  };
};

export const useReadModal = () => {
  const [isOpenRead, setIsOpenRead] = useState(false);

  const showRead = useCallback(() => setIsOpenRead(true), []);
  const hideRead = useCallback(() => setIsOpenRead(false), []);

  return {
    isOpenRead,
    showRead,
    hideRead,
    Modal,
  };
};
