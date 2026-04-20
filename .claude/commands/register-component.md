Analyse the component at `$ARGUMENTS` and register it in `puck.config.tsx`.

## Steps

1. **Read the component file** at the path provided.

2. **Analyse the component** to extract Puck-relevant props:
   - **CVA variants** (`class-variance-authority`): each variant key becomes a `select` field with its option keys as values. Use `defaultVariants` for `defaultProps`.
   - **Explicit TypeScript props** in the function signature (inline type annotation `& { ... }`):
     - `boolean` → `radio` field with `Yes/No` options, default `false`
     - string literal unions → `select` field
     - `string` → `text` field
   - **Skip** `children`, `...props` spread, and any native HTML props inherited via `React.ComponentProps<...>`.

3. **Read `puck.config.tsx`** to understand the current structure.

4. **Patch `puck.config.tsx`** — make all three edits as a single coordinated change:
   - **Import**: add `import { ComponentName } from "<relative-path>";` after the last existing import line.
   - **Props type**: add `ComponentName: { field1: Type; field2: Type; ... };` inside the `type Props = { ... }` block.
   - **Component entry**: add to the `components` object:
     ```tsx
     ComponentName: {
       fields: {
         fieldName: { type: "select", options: [{ label: "opt", value: "opt" }, ...] },
         // ...
       },
       defaultProps: {
         fieldName: "default",
       },
       render: (props) => <ComponentName {...props} />,
     },
     ```

5. **Verify** the file compiles by checking there are no obvious syntax issues (matching braces, correct comma placement).

6. Report what was added: component name, fields registered, and any props that were skipped and why.
