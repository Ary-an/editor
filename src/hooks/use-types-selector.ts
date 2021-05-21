import { useSelector, TypedUseSelectorHook } from "react-redux";
import { IRootState } from "../state";

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
