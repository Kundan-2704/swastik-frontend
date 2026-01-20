import { Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface Props {
  quantity: number;
  setQuantity: (q: number) => void;
}

const QuantitySelector: React.FC<Props> = ({ quantity, setQuantity }) => {
  const change = (v: number) => {
    setQuantity(Math.max(1, quantity + v));
  };

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-xs font-semibold text-[#4A1F2A] tracking-[0.18em]">
        QUANTITY
      </h2>

      <div className="flex items-center gap-2 w-[160px] justify-between">
        <Button
          onClick={() => change(-1)}
          variant="outlined"
          sx={{
            minWidth: 0,
            borderRadius: "999px",
            borderColor: "#D3B58A",
            color: "#4A1F2A",
          }}
        >
          <Remove />
        </Button>

        <span className="font-semibold text-[#4A1F2A]">
          {quantity}
        </span>

        <Button
          onClick={() => change(1)}
          variant="outlined"
          sx={{
            minWidth: 0,
            borderRadius: "999px",
            borderColor: "#D3B58A",
            color: "#4A1F2A",
          }}
        >
          <Add />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
