import { Dialog } from "@headlessui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { MenuInterface, RestaurantWithMenuInterface } from "../../../../interface/restaurant.interface";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { OrderListInterface } from "../../../../interface/order.interface";

interface Props {
  restaurant: RestaurantWithMenuInterface,
  orderList: OrderListInterface
}

const RestaurantPage = (props: Props) => {
  const restaurant = props.restaurant;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<MenuInterface | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [orderList, setOrderList] = useState<OrderListInterface>(props.orderList);

  const onOpenMenu = useCallback(async (data: MenuInterface) => {
    setMenu(data);
    setMessage(null);
    setIsOpen(true);
  }, []);

  const onCloseMenu = useCallback(async () => {
    setMenu(null);
    setMessage(null);
    setIsOpen(false);
  }, []);

  const onAddToOrder = useCallback(async (menu: MenuInterface, text: string | null) => {
    if (orderList) {
      let data = orderList;
      data.items.push({
        id: menu.id,
        name: menu.name,
        amount: 1,
        price: menu.price,
        message: text
      })

      data.amount += 1;
      data.total_price += menu.price;

      setCookie('order', data);
      setOrderList(data);

      console.log(orderList)

      onCloseMenu();
    }
  }, [])

  return (
    <>
      <span onClick={() => router.push('/')} className="absolute bg-white w-8 h-8 top-4 left-4 z-50 grid place-items-center rounded-full shadow-lg"><IoArrowBack className="text-xl" /></span>
      <div className="pb-24">
        <div>
          <div className="aspect-w-16 aspect-h-9">
            <img src="https://rachelgouk.com/wp-content/uploads/2021/12/eldivino-thai-restaurant-shanghai-29.jpg" alt="" className="object-cover" />
          </div>
          <div className="px-4">
            <div className="bg-white shadow-lg px-4 rounded-lg relative -translate-y-12">
              <h1 className="text-lg font-semibold py-3">{restaurant.name}</h1>
              <span className="border-b border-b-neutral-200 w-full block"></span>
              <p className="py-3 text-sm"><span className="w-8 inline-block">📌</span>{restaurant.location}</p>
              {/* <span className="border-b border-b-neutral-200 w-full block"></span>
              <p className="py-3 text-sm"><span className="w-8 inline-block">🕒</span>รอโดยประมาณ 30 นาที</p> */}
            </div>
          </div>
        </div>
        <div>
          <div className="p-4 bg-white">
            <h1 className="font-semibold">รายการ</h1>
          </div>
          {
            restaurant.Menu.length > 0 && restaurant.Menu.map((menu) => {
              return (
                <div key={menu.id} className="p-4 bg-white flex gap-4 border-b last:border-none border-b-neutral-200" onClick={() => onOpenMenu(menu)}>
                  <div className="w-24">
                    <div className="aspect-w-1 aspect-h-1">
                      <img src="https://images.aws.nestle.recipes/resized/9498e22085283f601f50003531a71fa3_%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%81%E0%B8%A1%E0%B9%87%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89_944_531.jpg" alt="" className="object-cover rounded-lg" />
                    </div>
                  </div>
                  <div className="w-full">
                    <h1 className="font-semibold">{menu.name}</h1>
                    <p className="text-xs text-neutral-500 font-light">{menu.description}</p>
                    <p>{menu.price}</p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      {
        orderList.items.length > 0 &&
        <div className="p-4 pb-8 shadow-lg bg-white absolute bottom-0 inset-x-0">
          <button className="bg-orange-500 text-white w-full p-2 px-3 rounded-lg font-semibold flex justify-between" onClick={() => router.push('/order')}>
            <div>
              <span>กระดาษจด - </span>
              <span className="font-normal">{orderList.items.length} รายการ</span>
            </div>
            <span>฿{orderList.total_price}</span>
          </button>
        </div>
      }
      {
        menu &&
        <Dialog open={isOpen} onClose={onCloseMenu}>
          <Dialog.Panel>
            <div className="fixed inset-0 bg-neutral-100 flex flex-col">
              <span onClick={onCloseMenu} className="absolute bg-white w-8 h-8 top-4 left-4 z-50 grid place-items-center rounded-full shadow-lg"><IoClose className="text-xl" /></span>
              <div className="aspect-w-16 aspect-h-9">
                <img src="https://images.aws.nestle.recipes/resized/9498e22085283f601f50003531a71fa3_%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%81%E0%B8%A1%E0%B9%87%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89_944_531.jpg" alt="" className="object-cover" />
              </div>
              <div className="p-4 bg-white mb-2">
                <div className="flex justify-between gap-4">
                  <h1 className="text-lg font-semibold">{menu.name}</h1>
                  <p className="font-semibold text-end">
                    {menu.price}
                    <span className="text-sm font-light block -mt-1">บาท</span>
                  </p>
                </div>
              </div>
              <div className="p-4 bg-white mb-2">
                <h1 className="font-semibold flex items-center mb-4">ข้อความถึงครัว<span className="ml-2 text-xs font-light text-neutral-500">หากมี</span></h1>
                <div>
                  <textarea className="border rounded-lg w-full p-2 px-3 outline-none focus:ring ring-orange-500/50" placeholder="บอกความต้องการของคุณ" onChange={(e) => {
                    setMessage(e.target.value);
                    console.log(message)
                  }}></textarea>
                </div>
              </div>
              <div className="p-4 shadow-lg bg-white absolute bottom-0 inset-x-0">
                <button className="bg-orange-500 text-white w-full p-2 rounded-lg font-semibold" onClick={() => onAddToOrder(menu, message)}>เพิ่มลงกระดาษจด - {menu.price}</button>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog >
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  const { data: restaurant }: {
    data: RestaurantWithMenuInterface
  } = await axios.get(`${process.env.API_URL}/restaurant/${id}`);

  if (!restaurant || !restaurant.isOpen) {
    return {
      notFound: true
    }
  }

  const {req, res} = context;

  const orderRaw = getCookie('order', {req, res});
  let orderList: OrderListInterface | null = null;

  if (typeof orderRaw === 'string') {
    orderList = JSON.parse(orderRaw);
  } else {
    orderList = {
      restaurantId: restaurant.id,
      amount: 0,
      items: [],
      total_price: 0
    }
  }

  return {
    props: {
      restaurant,
      orderList
    }
  }
}

export default RestaurantPage;