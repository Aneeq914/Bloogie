import type { StylesConfig } from "react-select";

interface Option {
  label: string;
  value: string;
}

// Keeps react-select visually in line with the `.input` class instead of
// shipping its own default look — same border, radius, and focus ring.
// A plain `StylesConfig` constant would pin IsMulti to `boolean`, which
// widens every consumer's onChange value to a union — call this per
// Select/CreatableSelect instance instead so IsMulti stays inferred.
export function selectStyles<
  IsMulti extends boolean,
>(): StylesConfig<Option, IsMulti> {
  return {
    control: (base, state) => ({
      ...base,
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "var(--color-brand-500)" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 3px rgb(59 130 246 / 0.3)" : "none",
      padding: "0.125rem 0.25rem",
      "&:hover": {
        borderColor: state.isFocused ? "var(--color-brand-500)" : "#9ca3af",
      },
    }),
    placeholder: (base) => ({ ...base, color: "#9ca3af" }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--color-brand-600)"
        : state.isFocused
          ? "var(--color-brand-50)"
          : "white",
      color: state.isSelected ? "white" : "#111827",
    }),
    multiValue: (base) => ({
      ...base,
      borderRadius: "9999px",
      backgroundColor: "var(--color-brand-50)",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--color-brand-600)",
      fontWeight: 500,
    }),
  };
}
