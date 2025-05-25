import styles from "../styles/DeleteModal.module.css";
import { UseDeleteProduct } from "../hooks/queries";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

function DeleteModal({ value }) {
  const { setShowDelModal, deleteProductId } = value;
  const { mutate } = UseDeleteProduct();
  const queryclient = useQueryClient();
  const delHandler = () => {
    console.log(deleteProductId);
    mutate(deleteProductId, {
      onSuccess: () => {
        toast.success("با موفقیت حذف شد");
        queryclient.invalidateQueries(["products"]);
        setShowDelModal(false);
      },
      onError: (error) => {
        error.response.data.message === "Invalid or expired token"
          ? toast.error("لطفا از حساب کاربری خود خارج شده و مجدد وارد شوید ")
          : toast.error("خطایی رخ داده است ");
      },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Image src="/images/close.png" alt="حذف" width={96} height={98}  />
        <p> آیا از حذف این محصول مطمئنید؟ </p>
        <div>
          <button type="submit" className={styles.delBtn} onClick={delHandler}>
            حذف
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setShowDelModal(false)}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
