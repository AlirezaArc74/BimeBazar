import ClientsInfo from "@/components/submission-page/inputs-section/clientInfo"
import Head from "next/head"

const Submission = () => {


  return (
    <>
    <Head>
      <title>صفحه تکمیل اطلاعات</title>
    </Head>
      <div className="bg-[#FFF] shadow-[0_3px_15px_-3px_rgba(34,34,34,0.10)] text-right  " >
        <h1 className="p-[14px]">
          تکمیل اطلاعات
        </h1>
      </div>

      <div className="text-right m-5 mb-0 mt-8 border-b-[1px] border-[#E0E0E0] pb-2  ">
        <h1>:لطفا اطلاعات شخصی مالک خودرو را وارد کنید</h1>
      </div>

      <ClientsInfo />
    </>
  )
}

export default Submission