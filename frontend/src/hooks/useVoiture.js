import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../react-query/queryClient';
import { useAuthContext } from './useAuthContext';

export const useVoiture = (parcId) => {
  const URL = `http://localhost:8000/api/parc/${parcId}/voiture`;
  const { user } = useAuthContext();

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': user.accessToken,
  };
  const { data, isLoading, error, isFetching } = useQuery(['voitures'], () =>
    fetch(URL, { headers }).then((res) => res.json())
  );

  const addVoitureMutation = async (voiture) => {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(voiture),
      headers,
    });

    const data = await response.data;

    return data;
  };

  const updateVoitureMutation = async (updatedVoiture) => {
    const response = await fetch(`${URL}/${updatedVoiture.voitureId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedVoiture.values),
      headers,
    });
    const data = await response.data;
    console.log(response);
    return data;
  };

  const deleteVoitureMutation = async (voitureId) => {
    await fetch(`${URL}/${voitureId}`, {
      method: 'DELETE',
      headers,
    });
  };

  const addVoiture = useMutation(addVoitureMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['voitures']);
    },
  });
  const updateVoiture = useMutation(updateVoitureMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['voitures']);
    },
  });
  const deleteVoiture = useMutation(deleteVoitureMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['voitures']);
    },
  });

  return {
    voitures: data,
    isLoading,
    isFetching,
    error,
    addVoiture,
    updateVoiture,
    deleteVoiture,
  };
};
