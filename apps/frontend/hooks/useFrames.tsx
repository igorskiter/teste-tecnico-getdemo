import { Frame } from "@/interfaces/Frame";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/frames";

// Fetch all demos
const fetchFrames = async (fetchFrame: {
  demoId: string;
}): Promise<Frame[]> => {
  const { data } = await axios.get(`${API_URL}/${fetchFrame.demoId}`);
  return data;
};

// Create a new demo
const createFrame = async (newFrame: { html: string }) => {
  const { data } = await axios.post(API_URL, newFrame);
  return data;
};

// Update an existing demo
const updateFrame = async (updatedFrame: Frame) => {
  const { data } = await axios.put(
    `${API_URL}/${updatedFrame.id}`,
    updatedFrame
  );
  return data;
};

// Delete a demo
const deleteFrame = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export const useFrames = ({ demoId }: { demoId: string }) => {
  const queryClient = useQueryClient();

  // Read (fetch)
  const demosQuery = useQuery<Frame[], Error, Frame[]>({
    queryKey: ["demos", demoId],
    queryFn: () => fetchFrames({ demoId }),
  });
  2;

  // Create
  const createFrameMutation = useMutation<Frame, Error, { html: string }>({
    mutationFn: createFrame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos"] });
    },
  });

  // Update
  const updateFrameMutation = useMutation<Frame, Error, Frame>({
    mutationFn: updateFrame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos"] });
    },
  });

  // Delete
  const deleteFrameMutation = useMutation<Frame, Error, string>({
    mutationFn: deleteFrame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demos"] });
    },
  });

  return {
    ...demosQuery,
    createFrame: createFrameMutation.mutateAsync,
    updateFrame: updateFrameMutation.mutateAsync,
    deleteFrame: deleteFrameMutation.mutateAsync,
  };
};
