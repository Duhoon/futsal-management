import FieldDrawer from "@/tools/Drawer";
import { createContext } from "react";

export const DrawerCtx = createContext<FieldDrawer>(new FieldDrawer());
