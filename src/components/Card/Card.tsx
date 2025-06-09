import { useState } from "react";
import { type CardProps, View } from "./CardType";
import rupee from "../../assets/rupee.png";
import dayjs from "dayjs";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import { useNavigate } from "react-router-dom";
import userPhoto from "../../assets/user.png";

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

      <div
        className={
          toggle === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"
            : "flex flex-col w-full"
        }
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex border border-gray-300 rounded-lg p-4 mb-4 bg-white hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleClick(`${product.id}`)}
          >
            <img
              src={userPhoto}
              alt="User Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md mr-4"
            />
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="m-0 mb-2 text-lg text-gray-800">
                  {product.username}
                </h2>
                <p className="m-0 mb-1 text-gray-500 text-sm">{product.email}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 font-bold text-blue-600">
                  <img src={rupee} alt="Rupee" className="h-5" />
                  <span>{product.mobileNumber.slice(-3)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Added {dayjs(product.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
}