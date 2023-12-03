import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  updateShoppingCart,
  setShoppingCart,
  updateDay,
} from "../redux/slices/shoppingCart"; // Import cả action updateShoppingCart

const useShopping = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shopping);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleUpdateItemQuantity = (productId, newQuantity) => {
    // Dispatch action updateShoppingCart với productId và newQuantity
    dispatch(updateShoppingCart({ id: productId, newQuantity }));
  };

  const handleRemoveItem = () => {
    // Bạn có thể thêm logic xóa sản phẩm ở đây nếu cần
  };

  const handleEditItem = () => {
    // Bạn có thể thêm logic chỉnh sửa sản phẩm ở đây nếu cần
  };
  const countTotal = () => {
    dispatch(countTotal());
  };
  const handleSetShoppingCart = (newShoppingCart) => {
    dispatch(setShoppingCart(newShoppingCart));
  };
  const handleUpdateDay = (day) => {
    dispatch(updateDay({ day }));
    console.log("Hook: " + day);
  };

  return {
    shoppingCart,
    handleAddItem,
    handleUpdateItemQuantity,
    handleRemoveItem,
    handleEditItem,
    countTotal,
    handleSetShoppingCart,
    handleUpdateDay,
  };
};

export default useShopping;
