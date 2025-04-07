import BranchesModalTriggerButton from "@/components/buttons/branches-modal-trigger-button";
import { BranchDialog } from "@/components/dialogs/branch-dialog";
import { branches } from "@/db/branches";

export default function Page() {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Filiais</h1>
        <BranchesModalTriggerButton />
      </div>
      <ul className="flex flex-col gap-2">
        {branches.map((branch, index) => (
          <li key={`${branch.name}-${index}`}>{branch.name}</li>
        ))}
      </ul>
      <BranchDialog />
    </div>
  );
}
