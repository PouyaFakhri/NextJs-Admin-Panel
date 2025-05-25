import { CiSearch } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import styles from "../styles/Dashboard.module.css"

function Dashboard() {
  return (
    <div  className={styles.container}>
      <div className={styles.header}>
        <CiSearch size={24} />
        <input type="search" placeholder=" جستجو کالا" />
        <div className={styles.headersprof}>
          <BsPersonCircle size={35}  />
          <div>
            <h5>pouyaf98</h5>
            <p>مدیر</p>
          </div>
        </div>
        <div className={styles.headerslog}>
          <IoIosLogOut size={25} className={styles.logout}/>
          <p>خروج</p>
        </div>
      </div>
      <div className={styles.addproduct}>
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
      <div className={styles.productManagement}>
        <table>
          <thead className={styles.thead}>
            <tr className={styles.tabelHeader}>
              <th> نام کالا</th>
              <th> موجودی </th>
              <th> قیمت</th>
              <th> شناسه کالا </th>
              <th className={styles.options}></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
