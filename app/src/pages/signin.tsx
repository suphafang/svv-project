import { useRouter } from "next/router";
import { useCallback } from "react";

const SignInPage = () => {
  const router = useRouter();

  const onSingin = useCallback(async () => {
    router.push('/');
  }, []);

  return (
    <div className="h-full bg-orange-500 relative">
      <div className="p-4 py-48">
        <h1 className="text-4xl text-white font-semibold text-center">FastFood</h1>
        <p className="text-white text-center font-light">Fast-to-get your food</p>
      </div>
      <div className="absolute inset-x-0 bottom-8 p-4">
        <button className="bg-white p-3 px-6 rounded-full w-full flex items-center" onClick={onSingin}>
          <img src="google.svg" alt="" className="h-5" />
          <span className="text-center w-full">ดำเนินการต่อด้วย Google</span>
        </button>
      </div>
    </div>
  );
}

export default SignInPage;