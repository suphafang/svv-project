import { Dialog } from "@headlessui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { MenuInterface, RestaurantInterface, RestaurantWithMenuInterface } from "../../interface/restaurant.interface";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { OrderListInterface } from "../../interface/order.interface";

interface Props {
  restaurant: RestaurantWithMenuInterface,
  orderList: OrderListInterface
}

const RestaurantPage = (props: Props) => {
  const router = useRouter();

  const [restaurant, setRestaurant] = useState<RestaurantInterface>(props.restaurant);
  const [orderList, setOrderList] = useState<OrderListInterface>(props.orderList);
  const [completed, setCompleted] = useState<boolean>(false);

  const onRemoveitem = useCallback(async (index: number) => {
    const data = orderList;
    const item = data.items.at(index);

    if (!item) return;

    data.amount -= 1;
    data.total_price -= item.price;
    data.items.splice(index, 1);

    setCookie('order', data);
    setOrderList(data);

    if (orderList.amount === 0) {
      return router.push('/');
    }

    return router.reload();
  }, []);

  const onSendOrder = useCallback(async () => {
    const email = getCookie('user');

    const {data: res} = await axios.post(`${process.env.API_URL}/order`, orderList, {
      headers: {
        Authorization: `${email}`
      }
    });

    setCompleted(true);
    deleteCookie('order');
  }, []);

  if (completed) {
    return (
      <>
        <span onClick={() => router.push(`/restaurant/${restaurant.id}`)} className="absolute bg-white w-8 h-8 top-4 left-4 z-50 grid place-items-center rounded-full shadow-lg"><IoArrowBack className="text-xl" /></span>
        <div className="h-full grid place-items-center p-4">
          <div className="text-center">
            <img src="cooking.svg" alt="" className="w-64 mb-16 mx-auto" />
            <h1 className="text-xl font-semibold mb-2">ส่งคำสั่งซื้อไปยังครัวแล้ว 👨‍🍳</h1>
            <p className="font-light">ครัวกำลังเตรียมอาหารให้คุณอยู่</p>
          </div>
        </div>
        <div className="p-4 pb-8 shadow-lg fixed bottom-0 inset-x-0">
          <button className="bg-orange-500 text-white w-full p-2 px-3 rounded-lg font-semibold" onClick={() => router.push('/')}>
            กลับไปยังหน้าหลัก
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <span onClick={() => router.push(`/restaurant/${restaurant.id}`)} className="absolute bg-white w-8 h-8 top-4 left-4 z-50 grid place-items-center rounded-full shadow-lg"><IoArrowBack className="text-xl" /></span>
      <div className="pb-44">
        <div>
          <div className="p-4 bg-white">
            <h1 className="font-semibold text-center">{restaurant.name}</h1>
            <p className="text-center text-sm">{restaurant.location}</p>
          </div>
          {
            orderList.items.map((item, index) => {
              return (
                <div key={index} className="p-4 bg-white flex gap-4 border-b last:border-none border-b-neutral-200">
                  <div className="w-24">
                    <div className="aspect-w-1 aspect-h-1">
                      <img src="https://images.aws.nestle.recipes/resized/9498e22085283f601f50003531a71fa3_%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%81%E0%B8%A1%E0%B9%87%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89_944_531.jpg" alt="" className="object-cover rounded-lg" />
                    </div>
                  </div>
                  <div className="w-full">
                    <h1 className="font-semibold">{item.name}</h1>
                    <p className="text-xs text-neutral-500 font-light">{item.message}</p>
                    <p>{item.price}</p>
                    <div>
                      <button className="text-sm text-red-500" onClick={() => onRemoveitem(index)}>ลบ</button>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="p-4 pb-8 shadow-lg bg-white fixed bottom-0 inset-x-0">
        <div className="flex justify-between mb-3">
          <p>ทั้งหมด</p>
          <p className="font-semibold">฿{props.orderList.total_price}</p>
        </div>
        <button className="bg-orange-500 text-white w-full p-2 px-3 rounded-lg font-semibold" onClick={() => onSendOrder()}>
          สั่งเลย
        </button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req, res } = context;

  const orderRaw = getCookie('order', { req, res });
  let orderList: OrderListInterface | null = null;

  if (typeof orderRaw === 'string') {
    orderList = JSON.parse(orderRaw);
  }

  if (!orderList || orderList.amount === 0) return {
    notFound: true
  }

  const { data: restaurant }: {
    data: RestaurantWithMenuInterface
  } = await axios.get(`${process.env.API_URL}/restaurant/${orderList.restaurantId}`);

  return {
    props: {
      orderList,
      restaurant
    }
  }
}

export default RestaurantPage;