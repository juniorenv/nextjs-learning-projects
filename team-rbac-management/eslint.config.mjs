import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import betterTailwind from "eslint-plugin-better-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "better-tailwindcss": betterTailwind,
    },
    settings: {
      "better-tailwindcss": {
        // Tailwind v4: point to your CSS entry file
        entryPoint: "app/globals.css",
      },
    } /*  */,
    rules: {
      ...betterTailwind.configs["recommended-warn"].rules,
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
