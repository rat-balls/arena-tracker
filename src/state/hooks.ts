import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// This is used for getting using the right dispatch and the right selector for store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
