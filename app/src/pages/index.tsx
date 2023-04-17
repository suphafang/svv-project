import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

const HomePage = () => {
  return (
    <>
      <div>
        <div className="p-4 text-white pb-10 py-6 relative mb-8 bg-gradient-to-r from-orange-600 to-orange-500">
          <h1 className="-mb-1">สวัสดี 👋</h1>
          <p className="text-lg font-semibold">ศุภชัย ชื่นสุขศรี</p>
          <div className="absolute inset-x-0 px-4 translate-y-5">
            <IoSearch className="text-black absolute translate-x-3 top-1/2 -translate-y-1/2" />
            <input type="text" className="w-full rounded-lg p-2 px-3 pl-10 shadow-lg outline-none text-black" placeholder="สั่งร้านไหนดี?" />
          </div>
        </div>
        <div>
          <div className="p-4">
            <h1 className="text-lg font-semibold">ครัวที่กำลังเปิดอยู่ 🍴</h1>
          </div>
          <div>
            <Link href={'/restaurant/123'}>
              <div className="p-4 bg-white flex gap-4 border-b border-b-neutral-200">
                <div className="w-24">
                  <div className="aspect-w-1 aspect-h-1">
                    <img src="https://rachelgouk.com/wp-content/uploads/2021/12/eldivino-thai-restaurant-shanghai-29.jpg" alt="" className="object-cover rounded-lg" />
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold">ร้านพี่ช้าง</h1>
                  <p className="text-xs text-neutral-500">โรงอาหารคณะไอที</p>
                </div>
              </div>
            </Link>
            <Link href={'/restaurant/123'}>
              <div className="p-4 bg-white flex gap-4">
                <div className="w-24">
                  <div className="aspect-w-1 aspect-h-1">
                    <img src="https://rachelgouk.com/wp-content/uploads/2021/12/eldivino-thai-restaurant-shanghai-29.jpg" alt="" className="object-cover rounded-lg" />
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold">ร้านพี่ช้าง</h1>
                  <p className="text-xs text-neutral-500">โรงอาหารคณะไอที</p>
                </div>
              </div>
            </Link>
            <div className="p-4">
              <p className="text-center text-neutral-500">เลื่อนลงมาสุดแล้ว</p>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {}
  }
}

export default HomePage;