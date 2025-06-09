import rupee from "../../assets/rupee.png";
import dayjs from "dayjs";
import userPhoto from "../../assets/user.png";
import type { ListViewProps } from "./CardType";
import { useNavigate } from "react-router-dom";

export default function ListView({ products }: ListViewProps) {
  const navigate = useNavigate();
  const onProductClick = (userId: string) => {
    navigate(`user/${userId}`);
  };
  return (
    <div className="flex flex-col w-full">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex border border-gray-300 rounded-lg p-4 mb-4 bg-white hover:shadow-lg transition-shadow duration-200"
          onClick={() => onProductClick(`${product.id}`)}
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
  );
}
