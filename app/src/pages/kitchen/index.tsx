import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Switch } from "@nextui-org/react";

const KitchenHomePage = () => {
  return (
    <div>
      <div className="p-4 py-6 pb-11 mb-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white relative">
        <h1>ระบบครัว</h1>
        <p className="text-lg font-semibold">ร้านพี่ช้าง</p>
        <div className="absolute inset-x-4 p-4 bg-white shadow-lg rounded-lg translate-y-4 text-black flex items-center justify-between">
          <h1>เปิดรับคำสั่งซื้อ</h1>
          <Switch color="warning" />
        </div>
      </div>
      <div className="p-4 grid gap-4">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h1>ยอดขายวันนี้ 📝</h1>
          <p className="text-lg font-semibold">100 คำสั่งซื้อ</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h1>ยอดเงินในระบบ 📝</h1>
          <p className="text-lg font-semibold">฿2,400</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {}
  };
};

export default KitchenHomePage;