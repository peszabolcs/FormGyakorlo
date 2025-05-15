import { create } from "zustand";

const useFormStore = create((set) => ({
  // Form data
  formData: {
    step1: {},
    step2: {},
  },

  // Actions
  setStep1Data: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        step1: data,
      },
    })),

  setStep2Data: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        step2: data,
      },
    })),

  // Reset form data
  resetForm: () =>
    set({
      formData: {
        step1: {},
        step2: {},
      },
    }),

  // Get all form data
  getAllFormData: () => {
    const state = useFormStore.getState();
    return state.formData;
  },
}));

export default useFormStore;
