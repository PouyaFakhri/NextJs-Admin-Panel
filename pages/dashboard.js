import { CiSearch } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import { UseGetProducts } from "../hooks/queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import CreateProduct from "../components/CreateProduct";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Modal from "../components/Modal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

function Dashboard() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState();
  const [editProductId, setEditProductId] = useState();
  const [isEditModal, setIsEditModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { isLoading, data, isError, error } = UseGetProducts({
    name: searchKey,
    page: page,
  });
  const totalPages = data?.totalPages || 0;
  useEffect(() => {
    if (isError) {
      toast.error("خطایی رخ داد مجدد تلاش کنید");
    }
  }, [isError, error]);
  return (
    <div className="container">
      <div className="header">
        <CiSearch size={24} />
        <input
          type="search"
          placeholder=" جستجو کالا"
          onChange={(e) => setSearchKey(e.target.value)}
          value={searchKey}
        />
        <div className="headersprof">
          <BsPersonCircle size={35} />
          <div>
            <h5>pouyaf98</h5>
            <p>مدیر</p>
          </div>
        </div>
        <div className="headerslog">
          <IoIosLogOut
            size={25}
            className="logout"
            onClick={() => {
              Cookies.remove("token");
              router.replace("/");
            }}
          />
          <p>خروج</p>
        </div>
      </div>
      <div className="addproduct">
        <div>
          <Image
            src="/images/setting-3.png"
            alt="مدیریت کالا"
            width={30}
            height={30}
          />
          <p>مدیریت کالا</p>
        </div>{" "}
        <button type="submit" onClick={() => setShowModal(true)}>
          افزودن محصول{" "}
        </button>
        {showModal && (
          <Modal
            OnClose={() => setShowModal(false)}
            modal={{ isEditModal, setIsEditModal, setShowModal, editProductId }}
          />
        )}
      </div>
      <div className="productManagement">
        {isLoading ? (
          <Loader />
        ) : (
          <table>
            <thead className="thead">
              <tr className="tabelHeader">
                <th> نام کالا</th>
                <th> موجودی </th>
                <th> قیمت</th>
                <th> شناسه کالا </th>
                <th className="options"></th>
              </tr>
            </thead>
            <tbody className="tbody">
              {data?.data?.map((item) => {
                return (
                  <CreateProduct
                    key={item.id}
                    value={item}
                    delOpt={{ setShowDelModal }}
                    setId={{ setDeleteProductId, setEditProductId }}
                    modal={{ setIsEditModal, setShowModal }}
                  />
                );
              })}
            </tbody>
          </table>
        )}
        {showDelModal && (
          <DeleteModal value={{ setShowDelModal, deleteProductId }} />
        )}
      </div>
       <Pagination value={{page , setPage, totalPages }} />
    </div>
  );
}

export default Dashboard;
