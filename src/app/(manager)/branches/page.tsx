import BranchesModalTriggerButton from "@/components/buttons/branches-modal-trigger-button";
import { BranchDialog } from "@/components/dialogs/branch-dialog";
import { getBranches } from "@/lib/server-utils";
import BranchCard from "@/components/branch-card";

export default async function Page() {
  const branches = await getBranches();
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Filiais</h1>
        <BranchesModalTriggerButton />
      </div>
      <ul className="grid grid-cols-[repeat(4,minmax(100px,500px))] gap-4">
        {branches.map((branch, index) => (
          <BranchCard branch={branch} key={`${branch.name}-${index}`}/>

          // <li key={`${branch.name}-${index}`}>{branch.name}</li>
        ))}
      </ul>
      <BranchDialog />
    </div>
  );
}
