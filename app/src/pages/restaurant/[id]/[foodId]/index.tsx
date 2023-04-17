import { GetServerSideProps, GetServerSidePropsContext } from "next";

const FoodPage = () => {
  return (
    <div className="h-full">
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {}
  };
};

export default FoodPage;