
import { useSelector,useDispatch, TypedUseSelectorHook } from "react-redux";

import { RootState,RootDispatch } from "./store";

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector
export const useAppDispatch=()=>useDispatch<RootDispatch>()