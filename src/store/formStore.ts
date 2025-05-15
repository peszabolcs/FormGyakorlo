import { create } from "zustand";

export interface Step1Data {
  [key: string]: any;
}
export interface Step2Data {
  [key: string]: any;
}
export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
}

interface FormStore {
  formData: FormData;
  setStep1Data: (data: Step1Data) => void;
  setStep2Data: (data: Step2Data) => void;
  resetForm: () => void;
  getAllFormData: () => FormData;
}

const useFormStore = create<FormStore>((set, get) => ({
  formData: {
    step1: {},
    step2: {},
  },
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
  resetForm: () =>
    set({
      formData: {
        step1: {},
        step2: {},
      },
    }),
  getAllFormData: () => {
    return get().formData;
  },
}));

export default useFormStore;
