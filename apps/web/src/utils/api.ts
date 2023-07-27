import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@gob-dojo/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@gob-dojo/api";
