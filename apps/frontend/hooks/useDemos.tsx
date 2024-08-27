import { Demo } from "@/interfaces/Demo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/demos";

// Fetch all demos
const fetchDemos = async (): Promise<Demo[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Create a new demo
const createDemo = async (newDemo: { name: string }) => {
  const { data } = await axios.post(API_URL, newDemo);
  return data;
};

// Update an existing demo
const updateDemo = async (updatedDemo: { id: string; name: string }) => {
  const { data } = await axios.put(`${API_URL}/${updatedDemo.id}`, updatedDemo);
  return data;
};

// Delete a demo
const deleteDemo = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export const useDemos = () => {
  const queryClient = useQueryClient();

  // Read (fetch)
  const demosQuery = useQuery<Demo[], Error>({
    queryKey: ["demos"],
    queryFn: fetchDemos,
  });
  2;

  // Create
  const createDemoMutation = useMutation<Demo, Error, { name: string }>({
    mutationFn: createDemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos"] });
    },
  });

  // Update
  const updateDemoMutation = useMutation<
    Demo,
    Error,
    { id: string; name: string }
  >({
    mutationFn: updateDemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos"] });
    },
  });

  // Delete
  const deleteDemoMutation = useMutation<Demo, Error, string>({
    mutationFn: deleteDemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos"] });
    },
  });

  return {
    ...demosQuery,
    createDemo: createDemoMutation.mutateAsync,
    updateDemo: updateDemoMutation.mutateAsync,
    deleteDemo: deleteDemoMutation.mutateAsync,
  };
};
