import FieldDrawer from "@/tools/Drawer";
import { createContext } from "react";

export const fieldDrawer = new FieldDrawer();
export const DrawerCtx = createContext<FieldDrawer>(fieldDrawer);
