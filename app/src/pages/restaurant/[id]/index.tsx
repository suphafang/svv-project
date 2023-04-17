import { Dialog } from "@headlessui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const RestaurantPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="pb-24">
        <div>
          <div className="aspect-w-16 aspect-h-9">
            <img src="https://rachelgouk.com/wp-content/uploads/2021/12/eldivino-thai-restaurant-shanghai-29.jpg" alt="" className="object-cover" />
          </div>
          <div className="px-4">
            <div className="bg-white shadow-lg px-4 rounded-lg relative -translate-y-12">
              <h1 className="text-lg font-semibold py-3">ร้านพี่ช้าง</h1>
              <span className="border-b border-b-neutral-200 w-full block"></span>
              <p className="py-3 text-sm"><span className="w-8 inline-block">📌</span>โรงอาหารคณะไอที</p>
              <span className="border-b border-b-neutral-200 w-full block"></span>
              <p className="py-3 text-sm"><span className="w-8 inline-block">🕒</span>รอโดยประมาณ 30 นาที</p>
            </div>
          </div>
        </div>
        <div>
          <div className="p-4 bg-white">
            <h1 className="font-semibold">อาหารจานเดี่ยว</h1>
          </div>
          <div className="p-4 bg-white flex gap-4 border-b last:border-none border-b-neutral-200" onClick={() => setIsOpen(true)}>
            <div className="w-24">
              <div className="aspect-w-1 aspect-h-1">
                <img src="https://images.aws.nestle.recipes/resized/9498e22085283f601f50003531a71fa3_%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%81%E0%B8%A1%E0%B9%87%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89_944_531.jpg" alt="" className="object-cover rounded-lg" />
              </div>
            </div>
            <div>
              <h1 className="font-semibold">ข้าวกระเพราหมูสับไข่ดาว</h1>
              <p className="text-xs text-neutral-500 font-light">กระเพราะหมูสับ ไข่ดาว ราดบนข้าวสวย</p>
              <p>45</p>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <div className="fixed inset-0 bg-neutral-100 flex flex-col">
            <span onClick={() => setIsOpen(false)} className="absolute bg-white w-8 h-8 top-4 left-4 z-50 grid place-items-center rounded-full shadow-lg"><IoClose className="text-xl" /></span>
            <div className="aspect-w-16 aspect-h-9">
              <img src="https://images.aws.nestle.recipes/resized/9498e22085283f601f50003531a71fa3_%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%81%E0%B8%A1%E0%B9%87%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89_944_531.jpg" alt="" className="object-cover" />
            </div>
            <div className="p-4 bg-white mb-2">
              <div className="flex justify-between gap-4">
                <h1 className="text-lg font-semibold">ข้าวกระเพราหมูสับไข่ดาว พิเศษ ไม่พริก ใส่ผงชูรา</h1>
                <p className="font-semibold text-end">
                  45
                  <span className="text-sm font-light block -mt-1">บาท</span>
                </p>
              </div>
            </div>
            <div className="p-4 bg-white mb-2">
              <h1 className="font-semibold flex items-center mb-4">ข้อความถึงครัว<span className="ml-2 text-xs font-light text-neutral-500">หากมี</span></h1>
              <div>
                <textarea className="border rounded-lg w-full p-2 px-3" placeholder="บอกความต้องการของคุณ"></textarea>
              </div>
            </div>
            <div className="p-4 shadow-lg bg-white absolute bottom-0 inset-x-0">
              <button className="bg-orange-500 text-white w-full p-2 rounded-lg font-semibold">เพิ่มลงกระดาษจด - 45</button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {}
  };
}

export default RestaurantPage;