import { CiSearch } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import { UseGetProducts } from "../hooks/queries";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import CreateProduct from "../components/CreateProduct";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const { isLoading, data, isError, error } = UseGetProducts({
    name: searchKey,
    page: page,
  });
  const totalPages = data?.totalPages;
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
              setIsAuthenticated(false);
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
        <button type="submit">افزودن محصول </button>
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
                return <CreateProduct key={item.id} value={item} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
