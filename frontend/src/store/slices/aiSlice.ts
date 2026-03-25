import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { generateDescription, suggestPrice } from '@api/gemini';
import { ItemUpdateIn } from '@types';

export const fetchAiDescription = createAsyncThunk(
  'ai/description',
  async (data: ItemUpdateIn) => {
    return await generateDescription(data);
  },
);

export const fetchAiPrice = createAsyncThunk(
  'ai/price',
  async (data: ItemUpdateIn) => {
    return await suggestPrice(data);
  },
);

const initialState = {
  description: { value: '', isLoading: false, isError: false },
  price: {
    value: null as number | null,
    display: '',
    isLoading: false,
    isError: false,
  },
};

const aiSlice = createSlice({
  name: 'ai',
  initialState: initialState,
  reducers: {
    clearAiData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiDescription.pending, (state) => {
        state.description.isLoading = true;
      })
      .addCase(fetchAiDescription.rejected, (state) => {
        state.price.isError = true;
      })
      .addCase(fetchAiDescription.fulfilled, (state, action) => {
        state.description.isLoading = false;
        state.description.value = action.payload.value || '';
      })
      .addCase(fetchAiPrice.pending, (state) => {
        state.price.isLoading = true;
      })
      .addCase(fetchAiPrice.rejected, (state) => {
        state.price.isError = true;
      })
      .addCase(fetchAiPrice.fulfilled, (state, action) => {
        state.price.isLoading = false;
        state.price.value = action.payload.value;
        state.price.display = action.payload.display || '';
      });
  },
});
export const { clearAiData } = aiSlice.actions;
export default aiSlice.reducer;
