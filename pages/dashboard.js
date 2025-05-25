import { CiSearch } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";

function Dashboard() {
  return (
    <div>
      <div>
        <CiSearch size={24} />
        <input type="search" placeholder=" جستجو کالا" />
        <div>
          <BsPersonCircle size={35} />
          <div>
            <h5>pouyaf98</h5>
            <p>مدیر</p>
          </div>
        </div>
        <div>
          <IoIosLogOut size={25} />
          <p>خروج</p>
        </div>
      </div>
      <div>
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
      <div>
        <table>
          <thead>
            <tr>
              <th> نام کالا</th>
              <th> موجودی </th>
              <th> قیمت</th>
              <th> شناسه کالا </th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
