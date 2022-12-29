import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../react-query/queryClient';
import { useAuthContext } from './useAuthContext';

const URL = 'http://localhost:8000/api/parc';

export const useParc = () => {
  const { user } = useAuthContext();

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': user.accessToken,
  };
  const { data, isLoading, error } = useQuery(['parcs'], () =>
    fetch(URL, { headers }).then((res) => res.json())
  );

  const addParcMutation = async (parc) => {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(parc),
      headers,
    });

    const data = await response.data;

    return data;
  };

  const updateParcMutation = async (updatedParc) => {
    const response = await fetch(`${URL}/${updatedParc.parcId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedParc.values),
      headers,
    });
    const data = await response.data;
    console.log(response);
    return data;
  };

  const deleteParcMutation = async (parcId) => {
    await fetch(`${URL}/${parcId}`, {
      method: 'DELETE',
      headers,
    });
  };

  const addParc = useMutation(addParcMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['parcs']);
    },
  });
  const updateParc = useMutation(updateParcMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['parcs']);
    },
  });
  const deleteParc = useMutation(deleteParcMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['parcs']);
    },
  });

  return { parcs: data, isLoading, error, addParc, updateParc, deleteParc };
};

export const useOneParc = (parcId) => {
  const { user } = useAuthContext();

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': user.accessToken,
  };
  const { data, isLoading, error } = useQuery(
    ['parcs', parcId],
    () => fetch(`${URL}/${parcId}`, { headers }).then((res) => res.json()),
    {
      retry: false,
    }
  );

  return { parc: data, isLoading, error };
};
