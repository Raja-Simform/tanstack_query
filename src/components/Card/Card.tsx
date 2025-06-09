import { useState } from "react";
import { type CardProps, View } from "./CardType";
import GridView from "./Grid";
import ListView from "./List";
import { useNavigate } from "react-router-dom";

export default function Card({ products }: CardProps) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<View>(View.Grid);

  const handleClick = (userId: string) => {
    navigate(`user/${userId}`);
  };

  return (
    <div className="ml-64 mt-16 flex flex-col items-center p-4 w-full box-border">
      <div className="flex gap-2 m-3">
        <button
          className={`mt-1 z-10 border px-4 py-2 rounded ${
            toggle === "grid" ? "bg-amber-300" : "bg-amber-50"
          }`}
          onClick={() => setToggle(View.Grid)}
        >
          Grid
        </button>
        <button
          className={`mt-1 z-10 border px-4 py-2 rounded ${
            toggle === "list" ? "bg-amber-300" : "bg-amber-50"
          }`}
          onClick={() => setToggle(View.List)}
        >
          List
        </button>
      </div>

      {toggle === View.Grid ? (
        <GridView products={products} onProductClick={handleClick} />
      ) : (
        <ListView products={products} onProductClick={handleClick} />
      )}
    </div>
  );
}
