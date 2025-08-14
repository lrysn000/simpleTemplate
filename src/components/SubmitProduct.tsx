import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SubmitProduct() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center px-4 py-8" onKeyDown={handleKeyDown}>
      <div className="space-y-4 max-w-md w-full">
        <h2 className="text-xl font-semibold text-center">
          Submit New Product for Rating (Under development)
        </h2>
        <Input placeholder="Product Name" required disabled />
        <Input placeholder="Manufacturer" required disabled />
        <Input placeholder="Warranty Duration (years)" required disabled />
        <Input placeholder="Repair Manual Availability (Yes/No)" required disabled />
        <Input placeholder="Modularity / Upgrade Info" required disabled />
        <Input placeholder="Take-back / Buy-back Program Details" required disabled />
        <div>
          <Label>Upload Product Image</Label>
          <Input type="file" accept="image/*" disabled />
        </div>
        <div>
          <Label>Upload Technical Spec Sheet</Label>
          <Input type="file" accept="application/pdf" disabled />
        </div>
        <Button disabled className="w-full">Submit for Review</Button>
      </div>
    </div>
  );
}
