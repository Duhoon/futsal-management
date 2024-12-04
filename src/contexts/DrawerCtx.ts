import FieldDrawer from "@/components/Field/FieldDrawer";
import { createContext } from "react";

export const DrawerCtx = createContext<FieldDrawer | null>(null);
