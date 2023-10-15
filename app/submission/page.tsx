
import ClientsInfo from "@/components/submission-page/inputs-section/clientInfo"
import Head from "next/head"
import { useRouter } from "next/navigation"

const Submission = () => {
  return (
    <>
    <Head>
      <title>صفحه تکمیل اطلاعات</title>
    </Head>
     

      <div className="text-right m-5 mb-0 mt-8 border-b-[1px] border-[#E0E0E0] pb-2  ">
        <h1>:لطفا اطلاعات شخصی مالک خودرو را وارد کنید</h1>
      </div>

      <ClientsInfo />
    </>
  )
}

export default Submission