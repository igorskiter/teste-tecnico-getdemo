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
  const { id, ...frame } = updatedFrame;
  const { data } = await axios.put(`${API_URL}/${id}`, frame);
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
  const updateFrameMutation = (
    selectedElement: HTMLElement | null,
    setIsSaving: React.Dispatch<React.SetStateAction<boolean>>,
    setIsSaved: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedElement: React.Dispatch<
      React.SetStateAction<HTMLElement | null>
    >,
    setInputPosition: React.Dispatch<
      React.SetStateAction<{ top: number; left: number } | null>
    >
  ) => {
    const mutation = useMutation<Frame, Error, Frame>({
      mutationFn: updateFrame,
      onMutate: () => {
        setIsSaving(true);
        setIsSaved(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["demos"] });
        // queryClient.setQueryData(["elementText", data.elementId], data.text);
        setIsSaving(false);
        setIsSaved(true);
        setTimeout(() => {
          if (selectedElement) selectedElement.style.outline = "none";

          setTimeout(() => {
            setSelectedElement(null);
          }, 200);

          setIsSaved(false);
          setInputPosition(null);
        }, 500);
      },
    });
    return mutation;
  };

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
    updateFrame: updateFrameMutation,
    deleteFrame: deleteFrameMutation.mutateAsync,
  };
};
